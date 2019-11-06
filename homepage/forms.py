from django import forms

from .models import HomePage
from film.models import Genre


class HomePageForm(forms.Form):
    text = forms.CharField(max_length=100, required=False)
    GENERS = [(genre.name, genre.name) for genre in Genre.objects.all()]
    genres = forms.ChoiceField(choices=GENERS)
