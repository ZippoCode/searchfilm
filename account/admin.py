from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from rest_framework.authtoken.admin import TokenAdmin

from .models import Account, VoteMovie, FavoriteMovie

admin.site.register(Account, UserAdmin)
admin.site.register(VoteMovie)
admin.site.register(FavoriteMovie)

TokenAdmin.raw_id_fields = ['user']
