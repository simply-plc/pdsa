from django.urls import re_path
from .views import FrontendAppView

urlpatterns = [
    # Other URL patterns...
    re_path(r'^.*$', FrontendAppView.as_view()),
]