from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account, VoteFilm

admin.site.register(Account, UserAdmin)
admin.site.register(VoteFilm)
