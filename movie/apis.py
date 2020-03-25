# Python importing
import random
# Django importing
from django.http import Http404

# Rest Framework importing
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

# Internal importing
from .serializers import MovieSerializer, MovieSimpleSerializer, GenreSerializers
from .models import Movie, Genre, Keyword, Tag


# Return the list of film's genre
class GenreListAPI(generics.ListAPIView):
    serializer_class = GenreSerializers
    queryset = Genre.objects.all()


# Search movie APIs
class SearchFilmAPI(generics.ListCreateAPIView):
    #search_fields = ['title', 'original_title', 'keywords__text']
    search_fields = ['title', 'original_title']
    filter_backends = (filters.SearchFilter,)
    queryset = Movie.objects.all()
    serializer_class = MovieSimpleSerializer


class GetMovieWithID(views.APIView):
    def get(self, request, film_id, format=None):
        try:
            film = Movie.objects.get(id=film_id)
        except Movie.DoesNotExist:
            raise Http404
        serializer = MovieSerializer(film)
        return Response(serializer.data)


class RecommendMovie(views.APIView):
    def post(self, request, *args, **kwargs):
        mood = self.request.data.get('mood')
        genre = self.request.data.get('genre')
        premiated = self.request.data.get('premiated')
        watched = self.request.data.get('watched')
        try:
            films = Movie.objects.filter(genres__name__iexact=genre)
            if len(films) == 0:
                films = Movie.objects.all()
            index = random.randint(0, len(films))
            film = films[index]
        except Movie.DoesNotExist:
            return Response({'Error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MovieSerializer(film)
        return Response(serializer.data)


# Return, put and delete the keywords associate to Movie
class KeywordsMovie(views.APIView):
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return super().get_permissions()

    def get(self, request, id, *args, **kwargs):
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(movie)
        except Movie.DoesNotExist:
            return Response({'Error': 'Movie not found'}, status.HTTP_404_NOT_FOUND)
        return Response(serializer.data.get('keywords'), status.HTTP_200_OK)

    def put(self, request, id, *args, **kwargs):
        try:
            movie = Movie.objects.get(id=id)
            id = int(request.data.get('id'))
            text = request.data.get('text')
            if id < 0 or text == '':
                return Response({'Error': 'Bad Request'}, status.HTTP_400_BAD_REQUEST)
            keyword, _ = Keyword.objects.get_or_create(id=id, text=text)
            tag, created = movie.tag_set.get_or_create(keyword=keyword)
            if not created:
                tag.count += 1
                tag.save()
            serializer = MovieSerializer(movie)
        except Movie.DoesNotExist:
            return Response({'Error': 'Movie not found'}, status.HTTP_404_NOT_FOUND)
        except:
            return Response({'Error': 'Bad Request'}, status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data.get('keywords'), status.HTTP_202_ACCEPTED)

    def delete(self, request, id, *args, **kwargs):
        try:
            movie = Movie.objects.get(id=id)
            id = int(request.data.get('id'))
            text = request.data.get('text')
            if id < 0 or text == '':
                return Response({'Error': 'Bad Request'}, status.HTTP_400_BAD_REQUEST)
            keyword, _ = Keyword.objects.get_or_create(id=id, text=text)
            tag = movie.tag_set.get(keyword=keyword)
            tag.count -= 1
            tag.save()
            if tag.count <= 0:
                tag.delete()
            serializer = MovieSerializer(movie)
        except Movie.DoesNotExist:
            return Response({'Error': 'Movie not found'}, status.HTTP_404_NOT_FOUND)
        except:
            return Response({'Error': 'Bad Request'}, status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data.get('keywords'), status.HTTP_202_ACCEPTED)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class GetPopularMovies(generics.ListCreateAPIView):
    serializer_class = MovieSimpleSerializer
    queryset = Movie.objects.all().order_by('-vote_counter')
    pagination_class = StandardResultsSetPagination


class GetTopRatedMovies(generics.ListCreateAPIView):
    serializer_class = MovieSimpleSerializer
    queryset = Movie.objects.all().order_by('-vote_average')
    pagination_class = StandardResultsSetPagination


class GetLastMovies(generics.ListCreateAPIView):
    serializer_class = MovieSimpleSerializer
    queryset = Movie.objects.all().order_by('-release_date')
    pagination_class = StandardResultsSetPagination


# Return movies based of genre
class GenreMovieAPI(views.APIView):

    def get(self, request, genre, *args, **kwargs):
        try:
            movies = Movie.objects.filter(genres__name__iexact=genre).order_by('-vote_counter')
            serializers = MovieSimpleSerializer(movies, many=True)
        except Movie.DoesNotExist:
            return Response({'Error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializers.data, status=status.HTTP_200_OK)
