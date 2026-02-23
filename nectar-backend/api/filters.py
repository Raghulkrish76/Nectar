import django_filters
from .models import Plant

class PlantFilter(django_filters.FilterSet):
    region = django_filters.CharFilter(field_name='region', lookup_expr='iexact')
    plant_type = django_filters.CharFilter(field_name='plant_type', lookup_expr='iexact')
    health_benifits = django_filters.CharFilter(method='filter_health_benifits')

    def filter_health_benifits(self, queryset, name, value):
        benefits_list = [b.strip() for b in value.split(",")]
        return queryset.filter(health_benifits__name__in=benefits_list).distinct()

    class Meta:
        model = Plant
        fields = ['region', 'plant_type', 'health_benifits']