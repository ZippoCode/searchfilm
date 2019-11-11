from django.urls import path

from . import views

app_name = 'homepage'

urlpatterns = [
    # £X: 'searchfilm'
    path('', views.home, name='home'),
    # EX: 'searchfilm'
    path('contacts/', views.contacts, name = 'homepage-contacts')
]
