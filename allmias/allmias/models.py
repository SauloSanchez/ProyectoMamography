from django.db import models
from django_resized import ResizedImageField
import pickle
import numpy as np
import cv2

model = pickle.load(open('allmias/adaboost_model.sav', 'rb'))

# Create your models here.
class Mamography(models.Model):
    id = models.AutoField(primary_key=True)
    image = ResizedImageField(null=True,blank=True,upload_to='mammography/',size=(224,224),quality=100,force_format='PNG')
    etiqueta = models.CharField(max_length=1,blank=True,null=True)
    presicion = models.FloatField(blank=True,null=True)


    def save(self,*args, **kwargs):
        super(Mamography,self).save(*args, **kwargs)
        self.presicion = 0.6144578313253012
        image = cv2.imread('.'+self.image.url)
        image = np.array(image).reshape(1,-1)
        if image.shape[1] < 150528:
            image = np.append(image,np.zeros((1,150528-image.shape[1])))
        et = model.predict(image.reshape(1,-1))[0]
        self.etiqueta = et if et else 'N'
        return 