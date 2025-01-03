from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from .views import *



urlpatterns = [
    path('create/', UserCreateAPIView.as_view(), name='create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='pk'),
    path('logout/', LogoutView.as_view(), name='logoutView'),
    path('token/', 
        CustomTokenObtainPairView.as_view(), 
        name ='token_obtain_pair'),
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),
]




