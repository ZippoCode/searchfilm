from django.urls import path, include
from django.contrib.auth.views import logout_then_login

from . import views

app_name = 'account'

urlpatterns = [
    # EX 'account'
    path('<int:pk>/', views.AccountDetailView.as_view(), name='viewDetailsAccount'),
    # EX: 'account/login'
    path('login/', views.loginAccount, name='loginAccount'),
    # EX 'account/register
    path('register/', views.registerAccount, name='registerAccount'),
    # EX: 'account/logout'
    path('logout/', views.logout, name='logoutAccount'),
]
