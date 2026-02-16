from api.views import CreateUserView
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/',CreateUserView.as_view(),name = "register"),
    path('api/auth/login/',TokenObtainPairView.as_view(),name = "login"),
    path('api/auth/refresh/',TokenRefreshView.as_view(),name="token-refresh"),
    path('api-auth/',include('rest_framework.urls'))
]
