from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import HomePageForm, HomePageContacts
from movie.models import Movie, Genre


def home(request):
    if request.method == 'GET':
        form = HomePageForm()
        return render(request, 'homepage/homepage_index.html', {'form': form})
    else:
        form = HomePageForm(request.POST)
        if form.is_valid():
            if request.POST.get('ricerca-genre'):
                return HttpResponseRedirect('/movie/show/genre/' + request.POST.get('genres'))
            else:
                text = form.cleaned_data['text']
                try:
                    film = Movie.objects.get(title=text)
                    return HttpResponseRedirect('movie/' + str(film.id_film))
                except:
                    return HttpResponseRedirect('/')


def contacts(request):
    if request.method == 'GET':
        form = HomePageContacts
        return render(request, 'homepage/homepage_contacts.html', {'form': form})
    elif request.method == 'POST':
        return HttpResponseRedirect('/')
