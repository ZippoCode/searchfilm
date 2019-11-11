from django.db import models


class HomePage(models.Model):
    text = models.CharField(max_length=300)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.text
