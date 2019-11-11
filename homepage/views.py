from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import HomePageForm, HomePageContacts
from film.models import Film, Genre


def home(request):
    if request.method == 'GET':
        form = HomePageForm()
        return render(request, 'homepage/homepage_index.html', {'form': form})
    else:
        form = HomePageForm(request.POST)
        if form.is_valid():
            if request.POST.get('ricerca-genre'):
                return HttpResponseRedirect('/film/show/genre/' + request.POST.get('genres'))
            else:
                text = form.cleaned_data['text']
                try:
                    film = Film.objects.get(title=text)
                    return HttpResponseRedirect('film/' + str(film.id_film))
                except:
                    return HttpResponseRedirect('/')


def contacts(request):
    if request.method == 'GET':
        form = HomePageContacts
        return render(request, 'homepage/homepage_contacts.html', {'form': form})
    elif request.method == 'POST':
        return HttpResponseRedirect('/')
