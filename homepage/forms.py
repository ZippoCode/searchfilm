from django import forms

from movie.models import Genre


class HomePageForm(forms.Form):
    text = forms.CharField(max_length=100, required=False)
    genres = forms.ChoiceField(choices=[])

    def __init__(self, *args, **kwargs):
        super(HomePageForm, self).__init__(*args, **kwargs)
        GENRES = [(genre.name, genre.name) for genre in Genre.objects.all()]
        self.fields['genres'].choices = GENRES


class HomePageContacts(forms.Form):
    username = forms.CharField(max_length=100, required=True)
    email = forms.CharField(max_length=100, required=True)
    text = forms.CharField(widget=forms.Textarea, required=True)
