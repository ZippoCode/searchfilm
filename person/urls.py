from django.urls import path
from . import views

app_name = 'person'

urlpatterns = [
    # EX: /person/5
    path('<int:pk>/', views.PersonDetailView.as_view(), name='detail-person'),
    # EX /person/directos
    path('directors', views.DirectorIndexView.as_view(), name='index-director'),
    # EX /person/actors
    path('actors', views.ActorIndexView.as_view(), name='index-actor'),

]
