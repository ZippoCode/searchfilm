from django.test import TestCase
from rest_framework.test import APIClient
import json
from .models import Account, FavoriteMovie, VotedMovie
from movie.models import Movie


# Create your tests here.
class AccountTestCase(TestCase):
    def setUp(self):
        Account.objects.create_user(username='prova@prova.com', email='prova@prova.com', password='1234prova')
        Account.objects.create_user(username='prova2@prova.com', email='prova2@prova.com', password='1234prova')
        Movie.objects.create(title='Titolo di prova')

    def test_add_favorite(self):
        account = Account.objects.get(email='prova@prova.com')
        movie = Movie.objects.get(title='Titolo di prova')
        account.favorites.add(movie)
        self.assertTrue(account.favorites.exists())

    def test_vote_average(self):
        account1 = Account.objects.get(email='prova@prova.com')
        account2 = Account.objects.get(email='prova2@prova.com')
        movie = Movie.objects.get(title='Titolo di prova')
        VotedMovie.objects.create(person=account1, movie=movie, value_vote=3)
        VotedMovie.objects.create(person=account2, movie=movie, value_vote=7)
        self.assertEqual(movie.vote_average, 5)
        self.assertEqual(movie.vote_counter, 2)


class TestAPIs(TestCase):
    def setUp(self):
        account = Account.objects.create_user(email='prova@prova.com', username='prova@prova.com', password='1234')
        movie = Movie.objects.create(id='1', title='Titolo')

    def test_token(self):
        response = self.client.post('/api/token/', json.dumps({'username': 'prova@prova.com', 'password': '1234'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('token' in response.data)

    def test_vote_preferite(self):
        client = APIClient()
        response = client.post('/api/token/', json.dumps({'username': 'prova@prova.com', 'password': '1234'}),
                               content_type='application/json')
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + response.data['token'])
        r = client.put('/account/api/favorite', json.dumps({'id': '1'}),
                       content_type='application/json')
        self.assertEqual(r.status_code, 202)
