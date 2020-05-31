from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import *

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('places', PlaceViewSet)
router.register('comments', CommentViewSet)
router.register('place_types', PlaceTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]