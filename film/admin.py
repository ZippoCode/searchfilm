from django.contrib import admin

# Register your models here.
from .models import Film, Keyword, Genre

admin.site.register(Film)
admin.site.register(Keyword)
admin.site.register(Genre)