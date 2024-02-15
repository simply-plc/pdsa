from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

from .models import *
from api.serializers import TeamMembershipSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # Hides it from getting read
    team_memberships = TeamMembershipSerializer(many=True, read_only=True) # serialilzes the team_memberships field so that we can see the actual values of team_memberships

    def create(self, data):
        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
        )

        return user

    class Meta: 
        model = get_user_model() 
        fields = ('id', 'email', 'password', 'team_memberships') 


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token payload
        token['user'] = user.pk
        token['email'] = user.email
        # Add other user information as needed

        return token