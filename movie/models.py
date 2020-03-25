# Django importing
from django.db import models

from person.models import Person


class Keyword(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=80, unique=True)

    def __str__(self):
        return "{}: {}".format(self.id, self.text)


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=80)
    original_title = models.CharField(max_length=80, null=True)
    imdb_id = models.CharField(max_length=10, unique=True, null=True)
    description = models.TextField(blank=True)
    poster_path = models.CharField(max_length=50, blank=True)
    runtime = models.IntegerField(blank=True, null=True)
    original_language = models.CharField(max_length=25)

    release_date = models.DateField(null=True)
    vote_average = models.FloatField(default=0.0)
    vote_counter = models.IntegerField(default=0)

    # Relationship other models
    directors = models.ManyToManyField(Person, related_name='Directors')
    writers = models.ManyToManyField(Person, related_name='Writers')
    actors = models.ManyToManyField(Person, related_name='Cast', through='Cast')
    keywords = models.ManyToManyField(Keyword, related_name='Keywords', through='Tag')
    genres = models.ManyToManyField(Genre, related_name='Genres')

    def __str__(self):
        """
            Return the movie's name and release date
        :return:
        """
        return str(self.title) + " : " + (str(self.release_date.year) if self.release_date else '')

    class Meta:
        ordering = ["title"]


class Cast(models.Model):
    """
        Represent the link between a movie and an actor and memorized it.
            - Movie
            - Actor
            - Character's name
    """
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    name_character = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name_character


class Tag(models.Model):
    """
        Represent the link between a movie and a keyword.
        Count how many times the Keyword has been associated with Movies
    """
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.movie.title + " - " + self.keyword.text + ': ' + str(self.count)
