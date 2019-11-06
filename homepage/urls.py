from django.urls import path

from . import views

app_name = 'homepage'

urlpatterns = [
    path('', views.home, name='home'),
    path('search/<str:name>', views.search, name = 'search_film')
]
