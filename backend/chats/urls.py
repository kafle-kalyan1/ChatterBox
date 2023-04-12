from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.MessageCreateAPIView.as_view(), name='message-create'),
    path('list/', views.MessageListAPIView.as_view(), name='message-list'),
]
