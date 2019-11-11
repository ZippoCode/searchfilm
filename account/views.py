from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.views import generic
from django.contrib.auth.decorators import login_required

from account.models import Account
from account.forms import AccountLoginForm, AccountForm, EditAccountForm


class AccountDetailView(generic.ListView):
    model = Account
    template_name = 'account/account_detail.html'


@login_required
def editAccount(request):
    if request.method == 'POST':
        form = EditAccountForm(request.POST, instance=request.user)
        if form.is_valid():
            name = (form.cleaned_data['first_name']).upper()
            surname = (form.cleaned_data['last_name']).upper()
            user = Account.objects.get(pk=request.user.pk)
            user.first_name = name
            user.last_name = surname
            user.save()
            return redirect('account:view-detail-account', pk=user.pk)
    else:
        form = EditAccountForm(request.POST, instance=request.user)
        return render(request, 'account/account_register.html', {'form': form, 'edit': True})


def registerAccount(request):
    if request.method == 'GET':
        form = AccountForm()
        return render(request, 'account/account_register.html', {'form': form})
    else:
        form = AccountForm(request.POST)
        if form.is_valid():
            name = (form.cleaned_data['first_name']).upper()
            surname = (form.cleaned_data['last_name']).upper()
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = Account.objects.create_user(username=name, first_name=name, last_name=surname, email=email,
                                               password=password)
            user.save()
            return HttpResponseRedirect('/')


def loginAccount(request):
    if request.method == 'GET':
        form = AccountLoginForm()
        return render(request, 'account/account_login.html', {'form': form})
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
                form = AccountLoginForm(request.POST)
                return redirect('account:login-account', {'form': form, 'invalid': True})
        else:
            form = AccountLoginForm()
            return render(request, 'account/account_login.html', {'form': form})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/')
