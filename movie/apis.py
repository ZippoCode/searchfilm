# Django importing
from django.http import Http404
from django.contrib.postgres.search import TrigramSimilarity
# Rest Framework importing
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import generics

# Internal importing
from .serializers import MovieSerializer, MovieSimpleSerializer, MovieSimpleVoteSerializer, GenreSerializers
from .models import Movie, Genre


# Return the list of film's genre
class GenreListAPI(generics.ListAPIView):
    serializer_class = GenreSerializers
    queryset = Genre.objects.all()


# Search movie APIs
class SearchFilmAPI(views.APIView):

    def get(self, request, query, format=None):
        try:
            '''
            ts = TrigramSimilarity('original_title', query)
            films = Movie.objects.annotate(similarity=ts).filter(
                similarity__gt=0.3).order_by('-similarity')
            '''
            film = Movie.objects.get(title=query)
        except:
            raise Http404

        # serializers = MovieSerializer(films, many=True)
        # return Response(serializers.data)
        serializer = MovieSerializer(film)
        return Response(serializer.data)


class GetFilm(views.APIView):
    def get(self, request, film_id, format=None):
        try:
            film = Movie.objects.get(id=film_id)
        except Movie.DoesNotExist:
            raise Http404
        serializer = MovieSerializer(film)
        return Response(serializer.data)


# Return movies based of genre
class GenreMovieAPI(views.APIView):

    def get(self, request, genre, *args, **kwargs):
        try:
            movies = Movie.objects.filter(genres__name=genre).order_by('-vote_counter')
            serializers = MovieSimpleSerializer(movies, many=True)
        except Movie.DoesNotExist:
            return Response({'Error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializers.data, status=status.HTTP_200_OK)


class GetPopularMovies(generics.ListCreateAPIView):
    serializer_class = MovieSimpleSerializer
    queryset = Movie.objects.all().order_by('-vote_counter')[:10]


class GetTopRatedMovies(generics.ListCreateAPIView):
    serializer_class = MovieSimpleVoteSerializer
    queryset = Movie.objects.all().order_by('-vote_average')[:10]
