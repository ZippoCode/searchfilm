from rest_framework import serializers

from .models import Film


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = '__all__'

    def create(self, validated_data):
        """
            Create and return a new 'Film' instance, given the validated data

        :param validated_data:
        :return:
        """
        return Film.objects.create(**validated_data)