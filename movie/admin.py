from django.contrib import admin

# Register your models here.
from .models import Movie, Keyword, Genre, Tag, Cast

admin.site.register(Movie)
admin.site.register(Keyword)
admin.site.register(Genre)
admin.site.register(Cast)
admin.site.register(Tag)