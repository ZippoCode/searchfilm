from django import forms
from django.contrib.auth import authenticate

from .models import Account


class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ('first_name', 'last_name', 'email', 'password')

class EditAccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ('first_name', 'last_name')

class AccountLoginForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ('first_name', 'password')
