from rest_framework import serializers

# Models from Movie
from .models import Movie, Cast, Genre, Tag

# Serializers from Person Model
from person.serializers import PersonSerializers


# Genre Serializers
class GenreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


# Keywords Serializers
class KeywordsSerializers(serializers.ModelSerializer):
    id = serializers.CharField(source='keyword.id', read_only=True)
    text = serializers.CharField(source='keyword.text', read_only=True)

    class Meta:
        model = Tag
        fields = ['id', 'text', 'count']


# Cast Serializers
class CastSerializers(serializers.ModelSerializer):
    id = serializers.IntegerField(source='person.id_person', read_only=True)
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
    keywords = KeywordsSerializers(source='tag_set', many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'actors', 'directors', 'poster_path', 'genres', 'keywords', 'original_language',
                  'runtime']


# Movie Serializer with Id and Title
class MovieSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'poster_path', 'genres', 'vote_counter', 'vote_average']
