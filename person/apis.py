from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import Http404

from .models import Person
from .serializers import PersonSerializers


class GetPerson(APIView):
    def get(self, request, person_id, format=None):
        try:
            person = Person.objects.get(id_person=person_id)
        except Person.DoesNotExist:
            raise Http404
        serializer = PersonSerializers(person)
        return Response(serializer.data)
