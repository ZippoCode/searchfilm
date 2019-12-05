import sys, os, random, re, datetime

sys.path.append('/home/zippo/PycharmProjects/searchfilm')
os.environ['DJANGO_SETTINGS_MODULE'] = 'searchfilm.settings'
import django, time

django.setup()

from movie.models import Movie, Keyword, Genre, Cast
from person.models import Person
import requests

APIKEY_TMDB = "dd8353ae5ad8d568675bf7703a9a84c5"

PATH_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key={}&query={}"
PATH_SIMILAR_MOVIES = 'https://api.themoviedb.org/3/movie/{}/similar?api_key={}'
PATH_MOVIES = "https://api.themoviedb.org/3/movie/{}?api_key={}"
PATH_KEYWORDS = 'https://api.themoviedb.org/3/movie/{}/keywords?api_key={}'
PATH_CREDITS = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}"
PATH_PERSON = 'https://api.themoviedb.org/3/person/{}?api_key={}'


def save_keywords(id_film, film):
    keywords_data = (requests.get(PATH_KEYWORDS.format(id_film, APIKEY_TMDB))).json()
    if 'keywords' not in keywords_data:
        return
    keywords = keywords_data['keywords']
    for keyword in keywords:
        k = Keyword(id=keyword['id'], text=keyword['name'])
        k.save()
        film.keywords.add(k)
    return


def details_person(details, type):
    full_name = details['name'].split(maxsplit=1)
    name = full_name[0]
    surname = full_name[1] if len(full_name) > 1 else ""
    if not Person.objects.filter(first_name=name, second_name=surname, type=type):
        person = Person(first_name=name, second_name=surname, type=type)
    else:
        person = Person.objects.get(first_name=name, second_name=surname, type=type)

    db = (details['birthday'] is not None)
    person.birth_date = datetime.datetime.strptime(details['birthday'], '%Y-%m-%d') if db else None
    dd = (details['deathday'] is not None)
    person.death_date = datetime.datetime.strptime(details['deathday'], '%Y-%m-%d') if dd else None

    person.gender = 'Man' if details['gender'] == 2 else 'Woman'
    person.place_of_birth = details['place_of_birth'] if details['place_of_birth'] is not None else None
    person.nationality = (re.split(", |-", person.place_of_birth))[-1] if person.place_of_birth is not None else None
    person.imdb_id = details['imdb_id'] if details['imdb_id'] is not None else None
    person.biography = details['biography'] if details['biography'] is not None else None

    person.save()
    return person


def save_cast(id_film, film):
    data_credits = (requests.get(PATH_CREDITS.format(id_film, APIKEY_TMDB))).json()
    if not 'cast' in data_credits:
        print('Nessun attore trovato.')
        return
    print('Salvo gli attori ...')
    count = 15
    for actor_data in data_credits['cast']:
        detail_actor_data = (requests.get(PATH_PERSON.format(actor_data['id'], APIKEY_TMDB))).json()
        actor = details_person(detail_actor_data, Person.TYPE_ACTOR)
        cast = Cast(movie=film, person=actor)
        if actor_data['character'] is not None:
            cast.name_character = actor_data['character']
        cast.save()

        count = count - 1
        if count == 0:
            break

    print('Salvo i direttori e scrittori ...')
    for crew_data in data_credits['crew']:
        if crew_data['job'] == 'Writer' or crew_data['job'] == 'Screenplay':
            writing_data = (requests.get(PATH_PERSON.format(crew_data['id'], APIKEY_TMDB))).json()
            writer = details_person(writing_data, Person.TYPE_WRITER)
            film.writers.add(writer)

        if crew_data['job'] == 'Director':
            director_data = (requests.get(PATH_PERSON.format(crew_data['id'], APIKEY_TMDB))).json()
            director = details_person(director_data, Person.TYPE_DIRECTOR)
            film.directors.add(director)
    return


def save_film(id_film):
    film_data = (requests.get(PATH_MOVIES.format(id_film, APIKEY_TMDB))).json()
    imdb_id = film_data['imdb_id'] if film_data['imdb_id'] is not None else None
    original_title = film_data['original_title'] if film_data['original_title'] is not None else None
    print('Elaborazione ... ' + original_title)
    try:
        film = Movie.objects.get(title=film_data['title'], original_title=original_title, imdb_id=imdb_id)
    except:
        film = Movie(title=film_data['title'], original_title=original_title, imdb_id=imdb_id)
    if film_data['release_date'] != '':
        film.release_date = datetime.datetime.strptime(film_data['release_date'], '%Y-%m-%d')
    film.save()
    # Save Genres
    time.sleep(3)
    print('Save to genres ...')
    if 'genres' in film_data:
        for genre in film_data['genres']:
            name = genre['name']
            try:
                g = Genre.objects.get(name=name)
            except:
                g = Genre(name=name)
                g.save()
            film.genres.add(g)
    save_cast(film_data['id'], film)
    save_keywords(imdb_id, film)
    return film


if __name__ == '__main__':
    while True:
        title_film = input('Inserisci il titolo di un movie: ')
        if title_film == '0':
            print('Exit ... ')
            break
        request_json = (requests.get(PATH_SEARCH.format(APIKEY_TMDB, title_film))).json()
        for film in request_json['results']:
            f = save_film(film['id'])
            # Similar Movies
            print('Elaborazione movie simili ... ')
            request_json = (requests.get(PATH_SIMILAR_MOVIES.format(film['id'], APIKEY_TMDB))).json()
            for film in request_json['results']:
                f = save_film(film['id'])
                save_keywords(film['id'], f)
