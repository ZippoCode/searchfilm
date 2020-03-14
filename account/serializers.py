# Rest importing
from rest_framework import serializers

# Internal importing
from .models import Account, FavoriteMovie, VotedMovie


# class favorite movies serializer
class FavoriteMoviesSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source='movie.title')

    class Meta:
        model = FavoriteMovie
        fields = ['movie', 'title', 'date_add']


# Class voted movie serializer
class VotedMovieSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source='movie.title')

    class Meta:
        model = VotedMovie
        fields = ['movie', 'title', 'date_vote', 'value_vote']


# class favorite movies serializer
class AccountFMSerializer(serializers.ModelSerializer):
    favorites = FavoriteMoviesSerializer(source='favoritemovie_set', many=True)

    class Meta:
        model = Account
        fields = ['favorites']
        read_only_fields = ['id']


# Class for voted movies serializer
class AccountVMSerializer(serializers.ModelSerializer):
    voted = VotedMovieSerializer(source='votedmovie_set', many=True)

    class Meta:
        model = Account
        fields = ['voted']
        read_only_fields = ['id']


# Account Serializer
class AccountSerializer(serializers.ModelSerializer):
    favorites = FavoriteMoviesSerializer(source='favoritemovie_set', many=True)
    voted = VotedMovieSerializer(source='votedmovie_set', many=True)

    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'date_joined', 'favorites', 'voted']
        read_only_fields = ['id']


# Change Password Serializer
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    model = Account


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
