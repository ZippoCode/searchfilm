from django.urls import path

from . import views
from . import apis

app_name = 'account'

urlpatterns = [
    # EX 'account'
    path('<int:pk>/', views.AccountDetailView.as_view(), name='view-detail-account'),
    # EX: 'account/login'
    path('login/', views.loginAccount, name='login-account'),
    # EX 'account/register
    path('register/', views.registerAccount, name='register-account'),
    # EX: 'account/logout'
    path('logout/', views.logout, name='logout-account'),
    # EX 'account/edit
    path('edit/', views.editAccount, name='edit-account')
]

# URL's API
urlpatterns += [
    path('api/auth/user', apis.AccountAPI.as_view()),
    path('api/auth/login', apis.LoginAccountAPI.as_view()),
    path('api/auth/register', apis.RegisterAccountAPI.as_view()),
    path('api/movies', apis.AccountMoviesApi.as_view())
]
