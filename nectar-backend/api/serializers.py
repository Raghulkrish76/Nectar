from rest_framework import serializers
from .models import User,Plant,HealthBenefit

class UserSerializer(serializers.ModelSerializer):
    admin_token = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id','username','password','role','admin_token']
        extra_kwargs = {'password':{'write_only':True}, 'role':{'read_only':True}}

    def create(self, validated_data):
        admin_token = validated_data.pop('admin_token',None)
        ADMIN_SECRECT_TOKEN = 'admin@nectar05'
        if admin_token and ADMIN_SECRECT_TOKEN == admin_token:
           role = 'admin'
        else:
            role = 'user'
        user = User.objects.create_user(
            username=validated_data['username'],
            password = validated_data['password'],
            role = role
        )
        return user
    
class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

class HealthBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthBenefit
        fields = '__all__'