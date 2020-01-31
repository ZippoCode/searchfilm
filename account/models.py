# Django importing
from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# External importing
from movie.models import Movie

class Account(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=(('man', 'Man'), ('woman', 'Woman')))

    # Custom Fields
    favorites = models.ManyToManyField(Movie, related_name='FavoriteMovie', through='FavoriteMovie')
    votes = models.ManyToManyField(Movie, related_name='VotedMovie', through='VotedMovie')

    def __str__(self):
        return str(self.email)


class FavoriteMovie(models.Model):
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_add = models.DateField(default=timezone.now)

    def __str__(self):
        return "" + self.person.email + " - " + str(self.movie.id)


class VotedMovie(models.Model):
    person = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_vote = models.DateField(default=timezone.now)
    value_vote = models.PositiveIntegerField(default=0,
                                             validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self):
        return "{} has voted {} : {} - {}".format(self.person, self.movie, self.value_vote, self.date_vote)


@receiver(pre_save, sender=VotedMovie)
def pre_voteMovie(sender, instance, **kwargs):
    """
        Delete a relationship VotedMovie when the user has already voted
        the current movie
    """
    movie = instance.movie
    account = instance.person
    if VotedMovie.objects.filter(movie=movie, person=account).exists():
        movie = Movie.objects.get(title=movie)
        account.votes.remove(movie)


@receiver(post_save, sender=VotedMovie)
def post_voteMovie(sender, instance, **kwargs):
    """
        Update the movie's counter and rating after the user has voted
    """
    movie = instance.movie
    movie.vote_counter = VotedMovie.objects.filter(movie=movie).count()
    value = VotedMovie.objects.filter(movie=movie).aggregate(vote_average=models.Avg('value_vote'))
    movie.vote_average = value['vote_average']
    movie.save()
