from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from . import views
from . import apis

app_name = 'movie'

# Custom Api's URL
urlpatterns = [
    path('api/get/<int:film_id>/', apis.GetMovieWithID.as_view()),
    path('api/recommend/', apis.RecommendMovie.as_view()),
    path('api/title/', apis.SearchFilmAPI.as_view()),
    path('api/topPopular/', apis.GetPopularMovies.as_view()),
    path('api/topRanking/', apis.GetTopRatedMovies.as_view()),
    path('api/topPopular/<str:genre>/', apis.GenreMovieAPI.as_view()),
    path('api/last/', apis.GetLastMovies.as_view()),
    path('api/genres/', apis.GenreListAPI.as_view()),
    path('api/keywords/<int:id>', apis.KeywordsMovie.as_view()),
]
