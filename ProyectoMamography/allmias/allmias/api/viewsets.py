from rest_framework import viewsets,permissions,mixins
from rest_framework.decorators import permission_classes
from allmias.models import *
from .serializers import *

class MamographyViewSet(viewsets.ModelViewSet):
    queryset = Mamography.objects.all()
    serializer_class = MamographySerializer