from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings

from .models import *
from api.serializers import UserTeamSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # Hides it from getting read
    # team_memberships = TeamMembershipSerializer(many=True, read_only=True) # serialilzes the team_memberships field so that we can see the actual values of team_memberships
    teams = UserTeamSerializer(many=True, read_only=True)

    def create(self, data):
        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
            # is_active=False,
        )

        # uid = urlsafe_base64_encode(force_bytes(user.pk))
        # token = default_token_generator.make_token(user)

        # # Construct verification link
        # # verification_url = f"http://example.com/verify-email/{uid}/{token}/"
        # verification_url = f"http://localhost:3000/login"

        # # Send verification email
        # send_mail(
        #     'Verify Your Email',
        #     f'Click the link to verify your email: {verification_url}',
        #     settings.EMAIL_HOST_USER,
        #     [user.email],
        #     fail_silently=False,
        # )

        return user

    class Meta: 
        model = get_user_model() 
        fields = ('id', 'email', 'password', 'teams') 


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token payload
        token['user'] = user.pk
        token['email'] = user.email
        # Add other user information as needed

        return token