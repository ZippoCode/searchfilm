from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.decorators import login_required
from django.views import generic

import datetime

from .models import Film
from account.models import VoteFilm, FavoriteFilm


class IndexView(generic.ListView):
    model = Film
    template_name = 'film/film_index.html'

    def get_queryset(self):
        return Film.objects.all()


class ListRankingFilmView(generic.ListView):
    model = Film
    template_name = 'film/film_index.html'

    def get_queryset(self):
        return Film.objects.order_by('-vote_average')[:15]


class DetailView(View):
    model = Film
    template_name = 'film/film_detail.html'

    def get(self, request, *args, **kwargs):
        film = Film.objects.get(id_film=kwargs['pk'])
        value = dict()
        if request.user.is_active:
            value['is_preferred'] = request.user.favorites.filter(id_film=kwargs['pk']).count() > 0
            try:
                vf = VoteFilm.objects.get(person=request.user, film=film)
                value['vote'] = vf.vote
            except:
                pass
        else:
            value['is_preferred'] = False
        return render(request, self.template_name, {'object': film, 'value': value})

    def post(self, request, *args, **kwargs):
        if request.POST.get('remove_to_preferite'):
            return redirect('film:remove-film-preferite', id_film=kwargs['pk'])
        else:
            return redirect('film:add-film-preferite', id_film=kwargs['pk'])


class ShowFilmWithTag(generic.ListView):
    model = Film
    template_name = 'film/film_index.html'

    def get_queryset(self):
        tag = self.kwargs['genre']
        context = Film.objects.filter(genres__name__iexact=tag)
        return context


@login_required
def vote(request, id_film):
    account = request.user
    film = Film.objects.get(id_film=id_film)
    value = request.POST.get('vote')

    if VoteFilm.objects.filter(person=account, film=film):
        vf = VoteFilm.objects.get(person=account, film=film)

    else:
        vf = VoteFilm(person=account, film=film)
    vf.date_vote = datetime.date.today()
    vf.vote = value
    vf.save()

    film.vote_counter += 1
    film.vote_average = (film.vote_average + int(value)) / film.vote_counter
    film.save()
    return redirect('/film/{}'.format(id_film))


@login_required
def add_to_preferite(request, id_film):
    account = request.user
    film = Film.objects.get(pk=id_film)
    favorite = FavoriteFilm()
    favorite.person = account
    favorite.film = film
    favorite.date_add = datetime.date.today()
    favorite.save()
    return redirect('film:detail-film', pk=id_film)


@login_required
def remove_to_preferite(request, id_film):
    account = request.user
    account.favorites.remove(Film.objects.get(id_film=id_film))
    return redirect('film:detail-film', pk=id_film)
