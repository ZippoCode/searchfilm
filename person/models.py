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
    gender = models.CharField(max_length=10, choices=(('man', 'Man'), ('woman', 'Woman')))
    birth_date = models.DateField(null=True)
    death_date = models.DateField(null=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    @property
    def full_name(self):
        return '%s %s' % (self.second_name, self.first_name)

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = ['second_name', 'first_name']
