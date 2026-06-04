from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PortfolioViewSet, SkillViewSet, ProjectViewSet,
    ExperienceViewSet, EducationViewSet, MessageViewSet
)

router = DefaultRouter()
router.register(r'portfolio', PortfolioViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'education', EducationViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
