from rest_framework import serializers

from .models import *

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'