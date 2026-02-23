from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer,PlantSerializer,HealthBenefitSerializer,BookmarkSerializer,NectarTokenSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import User,Plant,HealthBenefit,Bookmark
from rest_framework.generics import RetrieveAPIView
from .permissions import IsAdmin
from rest_framework.generics import CreateAPIView,UpdateAPIView,DestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets,filters
from django_filters.rest_framework import DjangoFilterBackend
from .filters import PlantFilter


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PlantListView(generics.ListAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = PlantFilter
    search_fields = ['name', 'health_benifits__name']

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


class BookmarkView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self,request):
        bookmarks = Bookmark.objects.filter(user=request.user)
        serializer = BookmarkSerializer(bookmarks,many=True)
        return Response(serializer.data)

    def post(self,request):
        plant_id = request.data.get('plant_id')
        plant = get_object_or_404(Plant,id=plant_id)
        
        bookmark,created = Bookmark.objects.get_or_create(
            user=request.user,
            plant=plant
        )
        if not created:
            return Response({'message': 'Already bookmarked'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Bookmarked successfully'}, status=status.HTTP_201_CREATED)

