from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from rest_framework.authtoken.admin import TokenAdmin

from .models import Account, VoteFilm

admin.site.register(Account, UserAdmin)
admin.site.register(VoteFilm)

TokenAdmin.raw_id_fields = ['user']
