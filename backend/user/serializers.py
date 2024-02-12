from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *
from api.serializers import TeamMembershipSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    team_memberships = TeamMembershipSerializer(many=True, read_only=True)

    def create(self, data):
        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
        )

        return user

    class Meta: 
        model = User 
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