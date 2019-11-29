from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from django.http import Http404
from django.contrib.postgres.search import TrigramSimilarity

from .serializers import FilmSerializer
from .models import Film


class FilmListApi(APIView):
    pass


class SearchFilmAPI(APIView):

    def get(self, request, query, format=None):
        try:
            ts = TrigramSimilarity('original_title', query)
            films = Film.objects.annotate(similarity=ts).filter(
                similarity__gt=0.3).order_by('-similarity')
        except:
            raise Http404

        serializers = FilmSerializer(films, many=True)
        return Response(serializers.data)


class GetFilm(APIView):
    def get(self, request, film_id, format=None):
        try:
            film = Film.objects.get(id_film=film_id)
        except Film.DoesNotExist:
            raise Http404
        serializer = FilmSerializer(film)
        return Response(serializer.data)


class GetPopularMovies(generics.ListCreateAPIView):
    serializer_class = FilmSerializer
    queryset = Film.objects.all().order_by('-vote_counter')[:10]
