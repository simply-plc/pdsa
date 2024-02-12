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
        team_serializer = self.get_serializer(data=request.data) # serialize the JSON data
        team_serializer.is_valid(raise_exception=True) # Validate if the data is valid data
        team = team_serializer.save() # Save it to the team model and assign object to team

        users_data = request.data.get('members', []) # Get the members data as described above
        # Create the data for the TeamMembership for all users on new team
        memberships_data = [{'team': team.id, 'user': user[0], 'is_admin': user[1]} for user in users_data] 
        membership_serializer = TeamMembershipSerializer(data=memberships_data, many=True) # Serialize all the data 
        membership_serializer.is_valid(raise_exception=True) # Check if the data is valid
        membership_serializer.save() # Save all of the new TeamMembership data

        return Response(team_serializer.data) # Return the data

class TeamView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer