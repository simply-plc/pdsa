from django.urls import path, include

from .views import *

urlpatterns = [
    path('team/create/', TeamCreateAPIView.as_view(), name='team_create'),
    path('team/<int:pk>/', TeamRetrieveUpdateDestroyAPIView.as_view(), name='team_pk'),
    path('user-team/<int:pk>/', UserTeamRetrieveUpdateDestroyAPIView.as_view(), name='user_team_pk'),
    path('aim/create/', AimCreateAPIView.as_view(), name='aim_create'),
    path('aim/<int:pk>/', AimRetrieveUpdateDestroyAPIView.as_view(), name='aim_pk'),
    path('driver/create/', DriverCreateAPIView.as_view(), name='Driver_create'),
    path('driver/<int:pk>/', DriverRetrieveUpdateDestroyAPIView.as_view(), name='Driver_pk'),
    path('change-idea/create/', ChangeIdeaCreateAPIView.as_view(), name='change_idea_create'),
    path('change-idea/<int:pk>/', ChangeIdeaRetrieveUpdateDestroyAPIView.as_view(), name='change_idea_pk'),
    path('pdsa/create/', PDSACreateAPIView.as_view(), name='pdsa_create'),
    path('pdsa/<int:pk>/', PDSARetrieveUpdateDestroyAPIView.as_view(), name='pdsa_pk'),
]
