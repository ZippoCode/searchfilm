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


class MovieSerializer(serializers.ModelSerializer):
    actors = CastSerializers(source='cast_set', many=True)
    directors = PersonSerializers(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'imdb_id', 'description', 'release_date', 'vote_average',
                  'vote_counter', 'actors', 'directors']

    def create(self, validated_data):
        """
            Create and return a new 'Film' instance, given the validated data

        :param validated_data:
        :return:
        """
        return Movie.objects.create(**validated_data)
