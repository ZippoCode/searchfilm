from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.views import generic

from account.forms import *


class AccountDetailView(generic.ListView):
    model = Account
    template_name = 'account/account_detail.html'


def registerAccount(request):
    if request.method == 'GET':
        form = AccountForm()
        return render(request, 'account/register.html', {'form': form})
    else:
        form = AccountForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['first_name']
            surname = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = Account.objects.create_user(username=name, first_name=name, last_name=surname, email=email,
                                               password=password)
            user.save()
            return HttpResponseRedirect('/')


def loginAccount(request):
    if request.method == 'POST':
        form = AccountLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['first_name']
            password = form.cleaned_data['password']
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect('/')
            else:
                form = AccountLoginForm()
                return HttpResponseRedirect('/account/login', {'form': form})
    else:
        form = AccountLoginForm()
        return render(request, 'account/login.html', {'form': form})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')
