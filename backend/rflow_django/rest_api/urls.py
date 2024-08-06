from django.urls import path, include
from rest_framework import routers
from .views import BPMNDiagramView, get_csrf_token


router = routers.DefaultRouter()
router.register(r'diagrams', BPMNDiagramView, 'diagram')

urlpatterns = [
    path('', include(router.urls)),
    path('get-csrf-token/', get_csrf_token),
]
