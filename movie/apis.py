from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from django.http import Http404
from django.contrib.postgres.search import TrigramSimilarity

from .serializers import MovieSerializer, GenreSerializers
from .models import Movie, Genre


class GenreListAPI(generics.ListAPIView):
    serializer_class = GenreSerializers
    queryset = Genre.objects.all()


class SearchFilmAPI(APIView):

    def get(self, request, query, format=None):
        try:
            ts = TrigramSimilarity('original_title', query)
            films = Movie.objects.annotate(similarity=ts).filter(
                similarity__gt=0.3).order_by('-similarity')
        except:
            raise Http404

        serializers = MovieSerializer(films, many=True)
        return Response(serializers.data)


class GetFilm(APIView):
    def get(self, request, film_id, format=None):
        try:
            film = Movie.objects.get(id=film_id)
        except Movie.DoesNotExist:
            raise Http404
        serializer = MovieSerializer(film)
        return Response(serializer.data)


class GetPopularMovies(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all().order_by('-vote_counter')[:10]
