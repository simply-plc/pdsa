from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, data):
        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
        )

        return user

    class Meta: 
        model = User 
        fields = ('id', 'email', 'password') 


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token payload
        # token['is_teacher'] = user.is_teacher
        # token['is_student'] = user.is_student
        # Add other user information as needed

        return token