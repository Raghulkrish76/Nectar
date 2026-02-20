from rest_framework import generics
from .serializers import UserSerializer,PlantSerializer,HealthBenefitSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import User,Plant,HealthBenefit
from rest_framework.generics import RetrieveAPIView
from .permissions import IsAdmin
from rest_framework.generics import CreateAPIView,UpdateAPIView,DestroyAPIView
from .serializers import NectarTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PlantListView(generics.ListAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]

class HealthBenefitView(generics.ListAPIView):
    queryset = HealthBenefit.objects.all()
    serializer_class = HealthBenefitSerializer
    permission_classes = [IsAuthenticated]

class PlantDetailView(RetrieveAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]

class PlantCreateView(CreateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAdmin]

class PlantUpdateView(UpdateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAdmin]

class PlantDeleteView(DestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAdmin]

class NectarTokenView(TokenObtainPairView):
    serializer_class = NectarTokenSerializer
