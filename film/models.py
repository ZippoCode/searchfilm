from django.db import models
from person.models import Person


class Keyword(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.CharField(max_length=80)

    def __str__(self):
        return self.text


class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Create your models here.
class Film(models.Model):
    id_film = models.AutoField(primary_key=True)
    title = models.CharField(max_length=80)
    original_title = models.CharField(max_length=80)
    vote_average = models.FloatField(default=0.0)
    vote_counter = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    imdb_id = models.CharField(max_length=10, unique=True)
    release_date = models.DateField(blank=True)

    # Relantion
    directors = models.ManyToManyField(Person, related_name='Directors')
    writers = models.ManyToManyField(Person, related_name='Writers')
    cast = models.ManyToManyField(Person, related_name='Cast')
    keywords = models.ManyToManyField(Keyword, related_name='Keywords')
    genres = models.ManyToManyField(Genre, related_name='Genres')

    def __str__(self):
        return self.original_title

    class Meta:
        ordering = ["title"]
