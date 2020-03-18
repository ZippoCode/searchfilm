from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from . import views
from . import apis

app_name = 'movie'

urlpatterns = [
    # Ex: /movie/
    path('show/', views.IndexView.as_view(), name='index-movie'),
    # EX: /movie/show/ranking
    path('show/ranking/', views.ListRankingMoviesView.as_view(), name='show-movie-ranking'),
    # EX /movie/show/western
    path('show/genre/<str:genre>/', views.ShowFilmWithTag.as_view(), name='show-movie-with-tag'),
    # Ex: /movie/15
    path('<int:pk>/', views.DetailView.as_view(), name='detail-movie'),
    # EX /movie/15/add_to_preferite
    path('<int:id_film>/add_to_preferite', views.add_to_preferite, name='add-movie-preferite'),
    # EX /movie/15/remove_to_preferite
    path('<int:id_film>/remove_to_preferite', views.remove_to_preferite, name='remove-movie-preferite'),
    # EX /movie/vote
    path('vote/<int:id_film>', views.vote, name='vote-movie'),
]

# Custom Api's URL
urlpatterns += [
    path('api/get/<int:film_id>/', apis.GetFilm.as_view()),
    path('api/recommend/', apis.RecommendMovie.as_view()),
    path('api/title/', apis.SearchFilmAPI.as_view()),
    path('api/topPopular/', apis.GetPopularMovies.as_view()),
    path('api/topRanking/', apis.GetTopRatedMovies.as_view()),
    path('api/topPopular/<str:genre>/', apis.GenreMovieAPI.as_view()),
    path('api/last/', apis.GetLastMovies.as_view()),
    path('api/genres/', apis.GenreListAPI.as_view()),
    path('api/keywords/<int:id>', apis.KeywordsMovie.as_view()),
]
