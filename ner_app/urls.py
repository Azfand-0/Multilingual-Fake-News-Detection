# ner_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import home, analyze_view, QueryHistoryViewSet

# Register DRF router for history API
router = DefaultRouter()
router.register(r'history', QueryHistoryViewSet)

urlpatterns = [
    path("", home),                # Home
    path("analyze/", analyze_view), # Analyze API
    path("", include(router.urls)), # History API (via router)
]

