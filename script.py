import sys, os, random

sys.path.append('/home/zippo/PycharmProjects/searchfilm')
os.environ['DJANGO_SETTINGS_MODULE'] = 'searchfilm.settings'
import django, time

django.setup()

from film.models import Film, Keyword, Genre
from person.models import Person
import requests
from datetime import date

APIKEY_OMDB = 'e1bce054'
APIKEY_TMDB = "dd8353ae5ad8d568675bf7703a9a84c5"

PATH_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key={}&query={}"
PATH_SIMILAR_MOVIES = 'https://api.themoviedb.org/3/movie/{}/similar?api_key={}'
PATH_MOVIES = "https://api.themoviedb.org/3/movie/{}?api_key={}"
PATH_KEYWORDS = 'https://api.themoviedb.org/3/movie/{}/keywords?api_key={}'
PATH_CREDITS = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}"
PATH_PERSON = 'https://api.themoviedb.org/3/person/{}?api_key={}'


def save_keywords(id_film, film):
    keywords = (requests.get(PATH_KEYWORDS.format(id_film, APIKEY_TMDB))).json()['keywords']
    for keyword in keywords:
        k = Keyword(id=keyword['id'], text=keyword['name'])
        k.save()
        film.keywords.add(k)
    return


def save_film(id_film):
    film_data = (requests.get(PATH_MOVIES.format(id_film, APIKEY_TMDB))).json()
    imdb_id = film_data['imdb_id'] if film_data['imdb_id'] is not None else 'None' + str(random.randint(1, 100000))
    original_title = film_data['original_title'] if film_data['original_title'] is not None else 'None'
    print('Elaborazione ... ' + original_title + " con ID IMDB: " + imdb_id)
    if Film.objects.filter(imdb_id=imdb_id):
        film = Film.objects.get(imdb_id=imdb_id)
    else:
        film = Film(title=film_data['title'],
                    original_title=original_title,
                    imdb_id=imdb_id)
    if film_data['release_date'] != '':
        year, month, day = (film_data['release_date']).split('-')
        film.release_date = date(int(year), int(month), int(day))
    film.save()
    # Save Genres
    time.sleep(3)
    print('Save to genres ...')
    if 'genres' in film_data:
        for genre in film_data['genres']:
            name = genre['name']
            if Genre.objects.filter(name=name):
                g = Genre.objects.get(name=name)
            else:
                g = Genre(name=name)
                g.save()
            film.genres.add(g)
    save_actors(film_data['id'], film)
    save_keywords(imdb_id, film)
    return film


def save_director(json, film):
    if not 'Director' in json:
        return
    print('Salvo i registri ...')
    full_name = json['Director'].split(maxsplit=1)
    name = full_name[0]
    surname = full_name[1] if len(full_name) > 1 else ""
    if not Person.objects.filter(first_name=name, second_name=surname, type=Person.TYPE_DIRECTOR):
        d = Person(first_name=name, second_name=surname, type=Person.TYPE_DIRECTOR, birth_date=date.today())
        d.save()
    else:
        d = Person.objects.get(first_name=name, second_name=surname, type=Person.TYPE_DIRECTOR)
    film.directors.add(d)
    return


def save_actors(id_film, film):
    actors_data = (requests.get(PATH_CREDITS.format(id_film, APIKEY_TMDB))).json()
    if not 'cast' in actors_data:
        print('Nessun attore trovato.')
        return
    print('Salvo  gli attori ...')
    count = 15
    for actor in actors_data['cast']:
        detail_actor_data = (requests.get(PATH_PERSON.format(actor['id'], APIKEY_TMDB))).json()
        full_name = detail_actor_data['name'].split(maxsplit=1)
        name = full_name[0]
        surname = full_name[1] if len(full_name) > 1 else ""
        if not Person.objects.filter(first_name=name, second_name=surname, type=Person.TYPE_ACTOR):
            actor = Person(
                first_name=name, second_name=surname, type=Person.TYPE_ACTOR)
        else:
            actor = Person.objects.get(first_name=name, second_name=surname, type=Person.TYPE_ACTOR)
        if detail_actor_data['birthday'] is not None:
            year, month, day = (detail_actor_data['birthday']).split('-')
            actor.birth_date = date(int(year), int(month), int(day))
        if detail_actor_data['deathday'] is not None:
            year, month, day = (detail_actor_data['deathday']).split('-')
            actor.death_date = date(int(year), int(month), int(day))
        actor.gender = 'Man' if detail_actor_data['gender'] == '2' else 'Woman'
        actor.save()
        film.cast.add(actor)

        # Per non aggiungerli tutti che sono troppi
        count = count - 1
        if count == 0:
            break
    return


if __name__ == '__main__':
    while True:
        try:
            title_film = input('Inserisci il titolo di un film: ')
            if title_film == '0':
                print('Exit ... ')
                break
            request_json = (requests.get(PATH_SEARCH.format(APIKEY_TMDB, title_film))).json()
            for film in request_json['results']:
                f = save_film(film['id'])
                if f is not None:
                    json = (requests.get("http://www.omdbapi.com/?i=" + f.imdb_id + "&apikey=" + APIKEY_OMDB)).json()
                    if 'Plot' in json:
                        f.description = json['Plot']
                        f.save()
                    save_director(json, f)
                    save_actors(json, f)

                # Similar Movies
                print('Elaborazione film simili ... ')
                request_json = (requests.get(PATH_SIMILAR_MOVIES.format(film['id'], APIKEY_TMDB))).json()
                for film in request_json['results']:
                    f = save_film(film['id'])
                    save_keywords(film['id'], f)
                    if f is not None:
                        json = (
                            requests.get("http://www.omdbapi.com/?i=" + f.imdb_id + "&apikey=" + APIKEY_OMDB)).json()
                        if 'Plot' in json:
                            f.description = json['Plot']
                            f.save()
                        save_director(json, f)
        except:
            pass