# Python importing
import datetime
# Django importing
from django.db import models
from django.contrib.auth.models import AbstractUser
# External importing
from movie.models import Movie


class Account(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # Custom Fields
    favorites = models.ManyToManyField(Movie, related_name='FavoriteMovie', through='FavoriteMovie')
    votes = models.ManyToManyField(Movie, related_name='VoteMovie', through='VoteMovie')

    def __str__(self):
        return str(self.email)


class FavoriteMovie(models.Model):
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_add = models.DateField()

    def save(self, *args, **kwargs):
        self.date_add = datetime.date.today()
        super().save(*args, **kwargs)

    def __str__(self):
        return "" + self.person.email + " - " + str(self.movie.id);


class VoteMovie(models.Model):
    """
        Store the account's vote
    """
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_vote = models.DateField()
    value_vote = models.IntegerField()
