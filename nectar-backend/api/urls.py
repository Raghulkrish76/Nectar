from django.urls import path
from .views import PlantListView,HealthBenefitView,PlantDetailView
from .views import PlantCreateView,PlantUpdateView,PlantDeleteView
from .views import BookmarkView
from .views import AdminStatsView,AdminUserListView
from .views import PlantofTheDay


urlpatterns = [
    path('plants/',PlantListView.as_view(),name = 'plant-list'),
    path('healthbenefits/',HealthBenefitView.as_view(),name = 'health-benefit-list'),
    path('plants/create/',PlantCreateView.as_view(),name = "Plant-create"),
    path('plants/<int:pk>/',PlantDetailView.as_view(),name = "Plant-detail"),
    path('plants/<int:pk>/update/',PlantUpdateView.as_view(),name = "Plant-update"),
    path('plants/<int:pk>/delete/',PlantDeleteView.as_view(),name = "plant-delete"), 

    path('bookmarks/',BookmarkView.as_view(),name = "bookmark"),
    path('adminstats/',AdminStatsView.as_view(),name = "admin-stats"),
    path('adminusers/',AdminUserListView.as_view(),name = "admin-users"),
    path('plantoftheday/',PlantofTheDay.as_view(),name = "plant-of-the-day")
    
]