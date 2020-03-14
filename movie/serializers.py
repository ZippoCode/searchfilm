from rest_framework import serializers

from .models import Movie, Cast, Genre

from person.serializers import PersonSerializers


class GenreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class CastSerializers(serializers.ModelSerializer):
    id = serializers.CharField(source='person.id_person', read_only=True)
    name = serializers.CharField(source='person.full_name', read_only=True)
    profile_img = serializers.CharField(source='person.profile_img', read_only=True)

    class Meta:
        model = Cast
        fields = ['id', 'name', 'name_character', 'profile_img']


# Movie Serializer with Actors and Directors
class MovieSerializer(serializers.ModelSerializer):
    actors = CastSerializers(source='cast_set', many=True)
    directors = PersonSerializers(many=True)
    genres = GenreSerializers(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'actors', 'directors', 'poster_path', 'genres']


# Movie Serializer with Id and Title
class MovieSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'poster_path', 'genres', 'vote_counter', 'vote_average']
