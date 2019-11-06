from django.db import models
from django.contrib.auth.models import AbstractUser

from film.models import Film


class Account(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    favorite_films = models.ManyToManyField(Film)

    def __str__(self):
        return str(self.email)
