from rest_framework import serializers

from .models import Movie, Cast, Genre

from person.serializers import PersonSerializers


class GenreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class CastSerializers(serializers.ModelSerializer):
    person = serializers.CharField(source='person.full_name', read_only=True)
    person_id = serializers.CharField(source='person.id_person', read_only=True)

    class Meta:
        model = Cast
        fields = ['person', 'person_id', 'name_character']


# Movie Serializer with Actors and Directors
class MovieSerializer(serializers.ModelSerializer):
    actors = CastSerializers(source='cast_set', many=True)
    directors = PersonSerializers(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'actors', 'directors', 'tmdb_file_path_poster']


# Movie Serializer with Id and Title
class MovieSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'tmdb_file_path_poster']


# Movie serializer with ID, Title, Vote Average and Vote Counter
class MovieSimpleVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'vote_counter', 'vote_average']
