# Python importing
import datetime

# Rest importing
from rest_framework import serializers

from .models import Account, FavoriteMovie


# Account Serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


# class favorite movies serializer
class FavoriteMoviesSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source='movie.title')

    class Meta:
        model = FavoriteMovie
        fields = ['movie', 'title', 'date_add']

# class favorite movies serializer
class AccountWithMoviesSerializer(serializers.ModelSerializer):
    favorites = FavoriteMoviesSerializer(source='favoritemovie_set', many=True)

    class Meta:
        model = Account
        fields = ['id', 'username', 'favorites']
        read_only_fields = ['id']

# Register Account Serializer
class RegisterAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.save()
        return user
