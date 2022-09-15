from django.urls import path,include
from . import views
from allmias.api import viewsets
from rest_framework import routers

router = routers.SimpleRouter()
router.register('mamography',viewsets.MamographyViewSet)
urlpatterns = [
    path('api/',include(router.urls)),

]