from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
class TeamCreateAPIView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class AimCreateAPIView(generics.CreateAPIView):
    queryset = Aim.objects.all()
    serializer_class = AimSerializer

class AimRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Aim.objects.all()
    serializer_class = AimSerializer

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

class PDSACreateAPIView(generics.CreateAPIView):
    queryset = PDSA.objects.all()
    serializer_class = PDSASerializer

class PDSARetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PDSA.objects.all()
    serializer_class = PDSASerializer