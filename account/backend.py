from django.contrib.auth import get_user_model


class CustomBackend:

    def get_user(self, user_id):
        try:
            user = get_user_model().objects.get(pk=user_id)
            return user
        except get_user_model().DoesNotExist:
            return None

    def authenticate(self, request, username=None, password=None):
        if '@' in username:
            kwargs = {'email': username}
        else:
            kwargs = {'username': username.upper()}
        try:
            user = get_user_model().objects.get(**kwargs)
            if user.check_password(password):
                return user
        except:
            return None
