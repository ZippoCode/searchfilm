from rest_framework import serializers

from .models import Person

class PersonSerializers(serializers.ModelSerializer):
    id = serializers.CharField(source='id_person', read_only=True)
    name = serializers.CharField(source='full_name', read_only=True)

    class Meta:
        model = Person
        fields = '__all__'
