from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.decorators import login_required
from django.views import generic

import datetime

from .models import Movie
from account.models import VoteMovie, FavoriteMovie


class IndexView(generic.ListView):
    model = Movie
    template_name = 'movie/movie_index.html'

    def get_queryset(self):
        return Movie.objects.all()


class ListRankingMoviesView(generic.ListView):
    model = Movie
    template_name = 'movie/movie_index.html'

    def get_queryset(self):
        return Movie.objects.order_by('-vote_average')[:15]


class DetailView(View):
    model = Movie
    template_name = 'movie/movie_detail.html'

    def get(self, request, *args, **kwargs):
        film = Movie.objects.get(id=kwargs['pk'])
        value = dict()
        if request.user.is_active:
            value['is_preferred'] = request.user.favorites.filter(id=kwargs['pk']).count() > 0
            try:
                vf = VoteMovie.objects.get(person=request.user, film=film)
                value['vote'] = vf.vote
            except:
                pass
        else:
            value['is_preferred'] = False
        return render(request, self.template_name, {'object': film, 'value': value})

    def post(self, request, *args, **kwargs):
        if request.POST.get('remove_to_preferite'):
            return redirect('movie:remove-movie-preferite', id_film=kwargs['pk'])
        else:
            return redirect('movie:add-movie-preferite', id_film=kwargs['pk'])


class ShowFilmWithTag(generic.ListView):
    model = Movie
    template_name = 'movie/movie_index.html'

    def get_queryset(self):
        tag = self.kwargs['genre']
        context = Movie.objects.filter(genres__name__iexact=tag)
        return context


@login_required
def vote(request, id_film):
    account = request.user
    film = Movie.objects.get(id_film=id_film)
    value = request.POST.get('vote')

    if VoteMovie.objects.filter(person=account, film=film):
        vf = VoteMovie.objects.get(person=account, film=film)

    else:
        vf = VoteMovie(person=account, film=film)
    vf.date_vote = datetime.date.today()
    vf.vote = value
    vf.save()

    film.vote_counter += 1
    film.vote_average = (film.vote_average + int(value)) / film.vote_counter
    film.save()
    return redirect('/movie/{}'.format(id_film))


@login_required
def add_to_preferite(request, id_film):
    account = request.user
    movie = Movie.objects.get(id=id_film)
    favorite = FavoriteMovie(person=account, movie=movie)
    favorite.save()
    return redirect('movie:detail-movie', pk=id_film)


@login_required
def remove_to_preferite(request, id_film):
    account = request.user
    account.favorites.remove(Movie.objects.get(id=id_film))
    return redirect('movie:detail-movie', pk=id_film)
