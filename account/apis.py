from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import (AccountSerializer, RegisterAccountSerializer)

from .models import Account


# Get User API
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user


# Login Account API
class LoginAccountAPI(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        account = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=account)
        return Response({
            'token': token.key,
            'user_id': account.pk,
            'email': account.email
        })


# Register APIs
class RegisterAccountAPI(generics.GenericAPIView):
    serializer_class = RegisterAccountSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.save()
        token, _ = Token.objects.get_or_create(user=account)
        return Response({
            'token': token.key,
            'user_id': account.pk,
            'email': account.email
        })
