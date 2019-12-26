# Django importing
from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

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
    date_add = models.DateField(default=timezone.now)

    def __str__(self):
        return "" + self.person.email + " - " + str(self.movie.id)


class VotedMovie(models.Model):
    """
        Store the account's vote
    """
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_vote = models.DateField(default=timezone.now)
    value_vote = models.PositiveIntegerField(default=0,
                                             validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self):
        return "{} has voted {} : {} - {}".format(self.person, self.movie, self.value_vote, self.date_vote)



@receiver(post_save, sender=VotedMovie)
def update_votes(sender, instance, **kwargs):
    """
        Update counter and average of votes from Movie's instance
    """
    movie = instance.movie
    account = instance.person
    # if VotedMovie.objects.filter(movie=movie, person=account).exists():
    # The user's vote is already present
    #    return
    # movie.vote_counter = VotedMovie.objects.filter(movie=movie).count()
    movie.vote_counter += 1
    movie.vote_average = (movie.vote_average + int(instance.value_vote)) / movie.vote_counter
    movie.save()

