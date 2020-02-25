from django.db import models


# Create your models here.
class Person(models.Model):
    TYPE_ACTOR = 'actor'
    TYPE_DIRECTOR = 'director'
    TYPE_WRITER = 'writer'
    TYPE_CHOICES = (
        (TYPE_ACTOR, 'Actor'),
        (TYPE_DIRECTOR, 'Director'),
        (TYPE_WRITER, 'Writer'),
    )

    id_person = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30, null=False)
    second_name = models.CharField(max_length=30, null=False)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    gender = models.CharField(max_length=10, choices=(('man', 'Man'), ('woman', 'Woman')))
    birth_date = models.DateField(null=True)
    death_date = models.DateField(null=True)
    nationality = models.CharField(max_length=255, null=True)
    place_of_birth = models.CharField(max_length=255, null=True)
    imdb_id = models.CharField(max_length=10, null=True)
    biography = models.TextField(null=True, blank=True)
    profile_img = models.TextField(max_length=255, null=True, blank=True)

    @property
    def full_name(self):
        return '%s %s' % (self.first_name, self.second_name)

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = ['second_name', 'first_name']
