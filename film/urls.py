from django.urls import path
from . import views

app_name = 'film'

urlpatterns = [
    # Ex: /film/
    path('show/', views.IndexView.as_view(), name='index-film'),
    # EX: /film/show/ranking
    path('show/ranking/', views.ListRankingFilmView.as_view(), name='show-film-ranking'),
    # EX /film/show/western
    path('show/genre/<str:genre>/', views.ShowFilmWithTag.as_view(), name='show-film-with-tag'),
    # Ex: /film/15
    path('<int:pk>/', views.DetailView.as_view(), name='detail-film'),
    # EX /film/15/add_to_preferite
    path('<int:id_film>/add_to_preferite', views.add_to_preferite, name='add-film-preferite'),
    # EX /film/15/remove_to_preferite
    path('<int:id_film>/remove_to_preferite', views.remove_to_preferite, name='remove-film-preferite'),
    # EX /film/vote
    path('vote/<int:id_film>', views.vote, name='vote-film'),
]
