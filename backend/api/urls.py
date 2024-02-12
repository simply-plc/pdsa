from django.urls import path, include

from .views import *

urlpatterns = [
    path('team/create/', TeamCreateAPIView.as_view(), name='team_create')
]
