from django.urls import path
from . import views

app_name = 'diagrams'

urlpatterns = [
    path('upload_new_file/', views.upload_new_file, name='upload_new_file'),
    path('view_created_diagram/', views.view_created_diagram, name='view_created_diagram'),
    path('view_all/', views.view_all, name='view_all'),
]
