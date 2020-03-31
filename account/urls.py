from django.urls import path

from . import views
from . import apis

app_name = 'account'

# URL's API
urlpatterns = [
    path('api/auth/login', apis.LoginAccountAPI.as_view()),
    path('api/auth/logout', apis.LogoutAccountAPI.as_view()),
    path('api/auth/change_password', apis.ChangePasswordAPI.as_view()),
    path('api/auth/register', apis.RegisterAccountAPI.as_view()),
    path('api/get/', apis.AccountAPI.as_view()),
    # API for relation with movies
    path('api/favorite', apis.AccountFavoriteMoviesAPI.as_view()),
    path('api/voted', apis.AccountVotedMoviesAPI.as_view()),
]
