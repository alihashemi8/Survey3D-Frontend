# config/urls.py
from survey.views import index
from django.contrib import admin
from django.urls import path, include ,re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('survey.urls')), 
    path('', include('accounts.urls')),
    path('api/auth/', include('accounts.urls')),
    re_path(r'^.*$', index),  # همه مسیرهای غیر API به React
]

