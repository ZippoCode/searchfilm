from django.test import TestCase
from .models import Person

import datetime


# Create your tests here.
class PersonTestCast(TestCase):
    def setUp(self):
        Person.objects.create(
            first_name='Salvatore',
            second_name='Prochilo',
            type='Actor',
            gender='Man',
            birth_date=datetime.date.today(),
            nationality='Italy',
        )
        Person.objects.create(
            first_name='Simone',
            second_name='Prochilo',
            type='Actor',
            gender='Man',
            birth_date=datetime.date.today(),
            nationality='Italy',
        )

    def test_people(self):
        salvatore = Person.objects.get(first_name='Salvatore')
        simone = Person.objects.get(first_name='Simone')
        self.assertNotEqual(salvatore, simone)
