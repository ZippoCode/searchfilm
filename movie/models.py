from django.db import models
from person.models import Person


class Keyword(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.CharField(max_length=80)

    def __str__(self):
        return self.text


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

    release_date = models.DateField(null=True)
    vote_average = models.FloatField(default=0.0)
    vote_counter = models.IntegerField(default=0)

    # Relantion
    directors = models.ManyToManyField(Person, related_name='Directors')
    writers = models.ManyToManyField(Person, related_name='Writers')
    actors = models.ManyToManyField(Person, related_name='Cast', through='Cast')
    keywords = models.ManyToManyField(Keyword, related_name='Keywords')
    genres = models.ManyToManyField(Genre, related_name='Genres')

    def __str__(self):
        return self.original_title

    class Meta:
        ordering = ["title"]


class Cast(models.Model):
    """
        Rappresenta il legame tra un movie e un attore e memorizza
            - Il Film
            - L'attore
            - Il nome del personaggio interpretato

    """
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    name_character = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name_character