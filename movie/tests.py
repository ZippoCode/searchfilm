from django.test import TestCase
from rest_framework.test import APIClient

import json

from .models import Movie, Keyword, Genre
from account.models import Account

# Create your tests here.
class MovieTest(TestCase):
    def setUp(self):
        Movie.objects.create(title='Titolo Uno')
        Movie.objects.create(title='Titolo Due')
        Keyword.objects.create(id=1, text='Prova')
        Keyword.objects.create(id=2, text='Prova2')

    def test_movie_different(self):
        movie1 = Movie.objects.get(title='Titolo Uno')
        movie2 = Movie.objects.get(title='Titolo Due')
        self.assertNotEqual(movie1, movie2)

    def test_keywords(self):
        movie = Movie.objects.get(title='Titolo Uno')
        kOne = Keyword.objects.get(id=1)
        kTwo = Keyword.objects.get(id=2)
        movie.keywords.add(kOne)
        movie.keywords.add(kTwo)
        self.assertEqual(movie.keywords.count(), 2)


class APIMovieTest(TestCase):
    def setUp(self):
        Account.objects.create_user(username='prova@prova.com', email='prova@prova.com', password='1234prova')
        kOne = Keyword.objects.create(id=1, text='Prova')
        kTwo = Keyword.objects.create(id=2, text='Prova2')
        movie = Movie.objects.create(id=1, title='Titolo')
        movie.keywords.add(kOne)
        movie.keywords.add(kTwo)

    def test_get_movie(self):
        response = self.client.get('/movie/api/get/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'Titolo')

    def test_get_apis(self):
        responseOne = self.client.get('/movie/api/genres/')
        responseTwo = self.client.get('/movie/api/topPopular/')
        responseThree = self.client.get('/movie/api/topPopular/war/')
        responseFour = self.client.get('/movie/api/topRanking/')
        self.assertEqual(responseOne.status_code, 200)
        self.assertEqual(responseTwo.status_code, 200)
        self.assertEqual(responseThree.status_code, 200)
        self.assertEqual(responseFour.status_code, 200)

    def test_keywords(self):
        response = self.client.get('/movie/api/keywords/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        # Put New Keyword
        client = APIClient()
        r_token = self.client.post('/api/token/', json.dumps({'username': 'prova@prova.com', 'password': '1234prova'}),
                                    content_type='application/json')
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + r_token.data['token'])
        r_put = client.put('/movie/api/keywords/1', json.dumps({'id': '5', 'text': 'New'}),
                                content_type='application/json')
        self.assertEqual(r_put.status_code, 202)
        self.assertEqual(len(r_put.data), 3)

        # Check error
        r_error = client.put('/movie/api/keywords/1', {'id': -5, 'text': 'Error'})
        self.assertEqual(r_error.status_code, 400)
