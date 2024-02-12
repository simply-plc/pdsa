from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
class TeamCreateAPIView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def create(self, request, *args, **kwargs):
        """
        data = {
            name: "",
            members: [[user_id, user_is_admin]],
        }
        """
        team_serializer = self.get_serializer(data=request.data)
        team_serializer.is_valid(raise_exception=True)
        team = team_serializer.save()

        users_data = request.data.get('members', [])
        memberships_data = [{'team': team.id, 'user': user[0], 'is_admin': user[1]} for user in users_data]
        membership_serializer = TeamMembershipSerializer(data=memberships_data, many=True)
        membership_serializer.is_valid(raise_exception=True)
        membership_serializer.save()

        return Response(team_serializer.data)

class TeamView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer