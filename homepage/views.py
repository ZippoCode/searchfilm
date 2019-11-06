from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import HomePageForm

from .models import HomePage
from film.models import Film
import requests

API_KEY = 'e1bce054'
API_KEY_2 = "dd8353ae5ad8d568675bf7703a9a84c5"


# Create your views here.
def home(request):
    if request.method == 'GET':
        form = HomePageForm()
        return render(request, 'homepage/homepage_index.html', {'form': form})
    else:
        form = HomePageForm(request.POST)
        if form.is_valid():
            if request.POST.get('ricerca-genre'):
                return HttpResponseRedirect('/film/show/' + request.POST.get('genres'))
            else:
                text = form.cleaned_data['text']
                type = form.cleaned_data['type']
                # Save the search
                if not HomePage.objects.filter(text=text):
                    homepage = HomePage(text=text, type=type)
                else:
                    homepage = HomePage.objects.get(text=text)
                    homepage.count += 1
                homepage.save()

                if type == 'ricerca_completa':
                    # Show list film
                    return HttpResponseRedirect('/search/' + str(text))
                else:
                    if Film.objects.filter(title=text):
                        film = Film.objects.get(title=text)
                        return HttpResponseRedirect('film/' + str(film.id_film))
                    else:
                        return HttpResponseRedirect('/')


def search(request, name):
    r = requests.get("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY_2 + "&query=" + name)
    result = r.json()
    films = list()
    for res in result['results']:
        dic = {
            'Title': res['title'],
            'Release_Date': res['release_date'],
            'id': res['id']
        }
        films.append(dic)
    return render(request, 'homepage/homepage_list.html', {'films': films})
