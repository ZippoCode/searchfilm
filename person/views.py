from django.shortcuts import render
from django.views.generic import DetailView, ListView

from .models import Person


# Create your views here.
class PersonDetailView(DetailView):
    model = Person
    template_name = 'person/person_detail.html'


class DirectorIndexView(ListView):
    model = Person
    template_name = 'person/person_index.html'

    def get_queryset(self):
        return Person.objects.filter(type__exact=Person.TYPE_DIRECTOR)


class ActorIndexView(ListView):
    model = Person
    template_name = 'person/person_index.html'

    def get_queryset(self):
        return Person.objects.filter(type__exact=Person.TYPE_ACTOR)
