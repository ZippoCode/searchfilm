from django.forms import ModelForm

from .models import Account


class AccountForm(ModelForm):
    class Meta:
        model = Account
        fields = ('first_name', 'last_name', 'email', 'password')


class AccountLoginForm(ModelForm):
    class Meta:
        model = Account
        fields = ('first_name', 'password')
