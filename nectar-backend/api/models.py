from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    role = models.CharField(max_length=5,default='user')
    
    def __str__(self):
        return self.username
    
    

