from django.urls import path
from .views import PlantListView,HealthBenefitView,PlantDetailView
from .views import PlantCreateView,PlantUpdateView,PlantDeleteView

urlpatterns = [
    path('plants/',PlantListView.as_view(),name = 'plant-list'),
    path('healthbenefits/',HealthBenefitView.as_view(),name = 'health-benefit-list'),
    path('plants/create/',PlantCreateView.as_view(),name = "Plant-create"),
    path('plants/<int:pk>/',PlantDetailView.as_view(),name = "Plant-detail"),
    path('plants/<int:pk>/update/',PlantUpdateView.as_view(),name = "Plant-update"),
    path('plants/<int:pk>/delete/',PlantDeleteView.as_view(),name = "plant-delete")
    

]
