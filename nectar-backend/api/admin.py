from django.contrib import admin
from .models import User,Plant,HealthBenefit,Bookmark
# Register your models here.
admin.site.register(User)
admin.site.register(HealthBenefit)
admin.site.register(Plant)
admin.site.register(Bookmark)
