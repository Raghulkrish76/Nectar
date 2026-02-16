from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator


class User(AbstractUser):
    role = models.CharField(max_length=5,default='user')
    
    def __str__(self):
        return self.username
    

class HealthBenefit(models.Model):
    name = models.CharField(
        max_length=100,
        unique = True,
        help_text = "Name of the health benifit"
    )
    class Meta:
        ordering = ['name']
        verbose_name = "Health Benifit"
        verbose_name_plural = "Health Benifits"


    def __str__(self):
        return self.name


class Plant(models.Model):


    class PlantType(models.TextChoices):
        HERB = 'herb','Herb'
        SHRUB = 'shrub','Shrub'
        TREE = 'tree','Tree'
        CLIMBER = 'climber', 'Climber'
        AQUATIC = 'aquatic','Aquatic'
        SUCCULENT = 'succulent','succulent '

    class Region(models.TextChoices):
        TROPICAL = 'tropical', 'Tropical'
        SUBTROPICAL = 'subtropical', 'Subtropical'
        TEMPERATE = 'temperate', 'Temperate'
        ALPINE = 'alpine', 'Alpine/Himalayan'
        ARID = 'arid', 'Arid/Desert'


    name = models.CharField(max_length=20,unique=True,db_index=True,validators=[MinLengthValidator(2)])
    description = models.TextField(validators=[MinLengthValidator(10)])
    plant_type = models.CharField(max_length=20,choices=PlantType.choices)
    region = models.CharField(max_length=20,choices=Region.choices,db_index=True)
    health_benifits = models.ManyToManyField(HealthBenefit,related_name='plants',blank=True,help_text="Select all health benefits this plant provides")
    image = models.ImageField(upload_to = 'plants/',blank=True,null=True,help_text="Plant image (botanical photograph preferred)")
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['plant_type', 'region']),
        ]
        
    def __str__(self):
        return self.name


class Bookmark(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name = "bookmarks")
    plant = models.ForeignKey(Plant,on_delete=models.CASCADE,related_name="bookmarks")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Bookmark'
        verbose_name_plural = 'Bookmarks'
        unique_together = ['user', 'plant']
        indexes = [
            models.Index(fields=['user', 'created_at'])
        ]


    def __str__(self):
        return f"{self.user.username} - {self.plant.name}"
