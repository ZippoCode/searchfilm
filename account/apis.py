# Python importing
import datetime

# Django importing
from django.http import Http404

# Rest Framework importing
from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import (AccountSerializer, RegisterAccountSerializer, AccountWithMoviesSerializer)
from .models import Account, FavoriteMovie

# External importing
from movie.models import Movie


# Get User API
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user


# Get User API with movie. Allow to view favorite movies list and put a movie
class AccountMoviesApi(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountWithMoviesSerializer

    def get(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            serializer = AccountWithMoviesSerializer(account)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            movie = Movie.objects.get(id=self.request.data.get('id'))
            favoriteMovie = FavoriteMovie(person=account, movie=movie)
            favoriteMovie.save()
            serializer = AccountWithMoviesSerializer(account)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            movie = Movie.objects.get(id=self.request.data.get('id'))
            account.favorites.remove(movie)
            serializer = AccountWithMoviesSerializer(account)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


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
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.save()
        token, _ = Token.objects.get_or_create(user=account)
        return Response({
            'token': token.key,
            'user_id': account.pk,
            'email': account.email
        })
