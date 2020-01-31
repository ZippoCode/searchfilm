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

from .serializers import (AccountSerializer, RegisterAccountSerializer, AccountFMSerializer, AccountVMSerializer,
                          ChangePasswordSerializer)
from .models import Account, VotedMovie

# External importing
from movie.models import Movie


# Get User API
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user


# Get User with favorite movies API with movie. Allow to view favorite movies list and put a movie
class AccountFavoriteMoviesAPI(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountFMSerializer

    def get(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            serializer = AccountFMSerializer(account)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=request.user)
            movie = Movie.objects.get(id=request.data.get('id'))
            favoriteMovie, _ = account.favoritemovie_set.get_or_create(movie=movie)
            favoriteMovie.save()
            serializer = AccountFMSerializer(account)
            token, _ = Token.objects.get_or_create(user=account)
            response = {'token': token.key}
            response.update(serializer.data)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        except Movie.DoesNotExist:
            return Response('Movie not found', status=status.HTTP_404_NOT_FOUND)
        return Response(response, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=request.user)
            movie = Movie.objects.get(id=request.data.get('id'))
            account.favorites.remove(movie)
            serializer = AccountFMSerializer(account)
            token, _ = Token.objects.get_or_create(user=account)
            response = {'token': token.key}
            response.update(serializer.data)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(response, status=status.HTTP_202_ACCEPTED)


# Get User API with voted movie. Allow to view voted movies list and put a vote in a movie
class AccountVotedMoviesAPI(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = AccountVMSerializer

    def get(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=request.user)
            serializer = AccountVMSerializer(account)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            movie = Movie.objects.get(id=request.data.get('id'))
            value = int(request.data.get('value_vote'))
            if value < 0 or value > 10:
                return Response({'Error': 'Value vote outside range'}, status=status.HTTP_400_BAD_REQUEST)
            '''
            votedMovie, _ = account.votedmovie_set.get_or_create(movie=movie)
            votedMovie.value_vote = value
            votedMovie.save()
            '''
            if VotedMovie.objects.filter(person=account, movie=movie):
                votedMovie = VotedMovie.objects.get(person=account, movie=movie)
            else:
                votedMovie = VotedMovie(person=account, movie=movie)
            votedMovie.value_vote = value
            votedMovie.save()
            serializer = AccountVMSerializer(account)
            token, _ = Token.objects.get_or_create(user=account)
            response = {'token': token.key}
            response.update(serializer.data)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        except Movie.DoesNotExist:
            return Response('Movie not found', status=status.HTTP_404_NOT_FOUND)
        return Response(response, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, *args, **kwargs):
        try:
            account = Account.objects.get(username=self.request.user)
            movie = Movie.objects.get(id=self.request.data.get('id'))
            account.votes.remove(movie)
            serializer = AccountVMSerializer(account)
            token, _ = Token.objects.get_or_create(user=account)
            response = {'token': token.key}
            response.update(serializer.data)
        except Account.DoesNotExist:
            return Response('Account not found', status=status.HTTP_404_NOT_FOUND)
        return Response(response, status=status.HTTP_202_ACCEPTED)


# Login Account API
class LoginAccountAPI(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        account = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=account)
        data = (AccountSerializer(account)).data
        data['token'] = token.key
        return Response(data, status=status.HTTP_202_ACCEPTED)


# Logout Account API
class LogoutAccountAPI(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({'Response': 'Successful Logout.'}, status=status.HTTP_200_OK)


class ChangePasswordAPI(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = ChangePasswordSerializer

    def put(self, request, *args, **kwargs):
        account = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not account.check_password(serializer.data.get('old_password')):
                return Response({'Error old password': 'Old password is wrong'}, status=status.HTTP_400_BAD_REQUEST)
            account.set_password(serializer.data.get('new_password'))
            account.save()
            return Response({
                'Message': 'Password update successful',
            }, status=status.HTTP_200_OK, )

        return Response({'Error. Bad request': ' Bad Request'}, status=status.HTTP_400_BAD_REQUEST)


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
