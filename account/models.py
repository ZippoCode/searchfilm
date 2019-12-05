from django.db import models
from django.contrib.auth.models import AbstractUser

from movie.models import Movie


class Account(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # Custom Fields
    favorites = models.ManyToManyField(Movie, related_name='FavoriteFilm', through='FavoriteFilm')
    votes = models.ManyToManyField(Movie, related_name='VoteFilm', through='VoteFilm')

    def __str__(self):
        return str(self.email)


class FavoriteFilm(models.Model):
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    film = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_add = models.DateField()


class VoteFilm(models.Model):
    """
        Questa classe memorizza i voti degli utenti
    """
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    film = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_vote = models.DateField()
    vote = models.IntegerField()
