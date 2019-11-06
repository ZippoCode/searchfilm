from django.db import models

from film.models import Genre


# Create your models here.
class HomePage(models.Model):
    TYPE = [
        ('ricerca_suggerita', 'Ricerca singola'),
        ('ricerca_completa', 'Ricerca completa'),
    ]

    text = models.CharField(max_length=300)
    count = models.IntegerField(default=0)
    type = models.CharField(max_length=50, choices=TYPE)

    def __str__(self):
        return self.text
