from django.urls import path
from .views import PlantListView,HealthBenefitView

urlpatterns = [
    path('plants/',PlantListView.as_view(),name = 'plant-list'),
    path('healthbenefits/',HealthBenefitView.as_view(),name = 'health-benefit-list'),
]
