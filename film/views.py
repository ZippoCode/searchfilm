from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.decorators import login_required
from django.views import generic

from .models import Film

APIKEY_OMDB = 'e1bce054'
APIKEY_TMDB = "dd8353ae5ad8d568675bf7703a9a84c5"


# Create your views here.
class IndexView(generic.ListView):
    model = Film
    template_name = 'film/film_index.html'

    def get_queryset(self):
        return Film.objects.all()


class DetailView(View):
    model = Film
    template_name = 'film/film_detail.html'

    def get(self, request, *args, **kwargs):
        film = Film.objects.get(id_film=kwargs['pk'])
        if request.user.is_active:
            is_preferred = request.user.favorite_films.filter(id_film=kwargs['pk']).count() > 0
        else:
            is_preferred = False
        return render(request, self.template_name, {'object': film, 'is_preferite': is_preferred})

    def post(self, request, *args, **kwargs):
        if request.POST.get('remove_to_preferite'):
            return redirect('/film/{}/remove_to_preferite'.format(kwargs['pk']))
        else:
            return redirect('/film/{}/add_to_preferite'.format(kwargs['pk']))


class ShowFilmWithTag(generic.ListView):
    model = Film
    template_name = 'film/film_index.html'

    def get_queryset(self):
        tag = self.kwargs['genre']
        context = Film.objects.filter(genres__name__iexact=tag)
        return context


@login_required
def add_to_preferite(request, id_film):
    account = request.user
    film = Film.objects.get(pk=id_film)
    account.favorite_films.add(film)
    account.save()
    return redirect('/film/{}'.format(id_film))


def remove_to_preferite(request, id_film):
    account = request.user
    film = Film.objects.get(pk=id_film)
    account.favorite_films.remove(film)
    account.save()
    return redirect('/film/{}'.format(id_film))
