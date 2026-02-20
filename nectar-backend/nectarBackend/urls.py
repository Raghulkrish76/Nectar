from api.views import CreateUserView
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import NectarTokenView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/',CreateUserView.as_view(),name = "register"),
    path('api/auth/login/', NectarTokenView.as_view(), name="login"),
    path('api/auth/refresh/',TokenRefreshView.as_view(),name="token-refresh"),
    path('api-auth/',include('rest_framework.urls')),
    path('api/',include('api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
