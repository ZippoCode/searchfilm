# Python importing
import datetime
# Django importing
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
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
    votes = models.ManyToManyField(Movie, related_name='VotedMovie', through='VotedMovie')

    def __str__(self):
        return str(self.email)

    def full_name(self):
        return ''


class FavoriteMovie(models.Model):
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_add = models.DateField()

    def save(self, *args, **kwargs):
        self.date_add = datetime.date.today()
        super().save(*args, **kwargs)

    def __str__(self):
        return "" + self.person.email + " - " + str(self.movie.id)


class VotedMovie(models.Model):
    """
        Store the account's vote
    """
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_vote = models.DateField()
    value_vote = models.IntegerField()

    def save(self, *args, **kwargs):
        self.date_vote = datetime.date.today()
        super().save(*args, **kwargs)

    def __str__(self):
        return '' + self.person.email + ': ' + str(self.value_vote)


@receiver(post_save, sender=VotedMovie)
def update_votes(sender, instance, **kwargs):
    """
        Update vote_counter and vote_instance from Movie's instance
    """
    movie = instance.movie
    movie.vote_counter += 1
    movie.vote_average = (movie.vote_average + int(instance.value_vote)) / movie.vote_counter
    movie.save()
