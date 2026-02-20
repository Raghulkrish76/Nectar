from django.urls import path
from .views import PlantListView,HealthBenefitView,PlantDetailView

urlpatterns = [
    path('plants/',PlantListView.as_view(),name = 'plant-list'),
    path('healthbenefits/',HealthBenefitView.as_view(),name = 'health-benefit-list'),
    path('plants/<int:pk>/',PlantDetailView.as_view(),name = "Plant-detail")
]
