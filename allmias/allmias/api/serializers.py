from django.urls import reverse_lazy
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from allmias.models import *


class MamographySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Mamography
        fields = ('__all__')
