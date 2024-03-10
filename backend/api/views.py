from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from .models import *
from .serializers import *
from .permissions import *

# Create your views here.
class TeamCreateAPIView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAdmin]

class UserTeamRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = UserTeamSerializer
    permission_classes = [IsTeamMember]

class DriverCreateAPIView(generics.CreateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class DriverRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class ChangeIdeaCreateAPIView(generics.CreateAPIView):
    queryset = ChangeIdea.objects.all()
    serializer_class = ChangeIdeaSerializer

class ChangeIdeaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChangeIdea.objects.all()
    serializer_class = ChangeIdeaSerializer
    permission_classes = [IsAdmin | IsOwnerReadyOnly]

class PDSACreateAPIView(generics.CreateAPIView):
    queryset = PDSA.objects.all()
    serializer_class = PDSASerializer
    permission_classes = [IsOwnerReadyOnly]

class PDSARetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PDSA.objects.all()
    serializer_class = PDSASerializer
    permission_classes = [IsOwnerReadyOnly]





