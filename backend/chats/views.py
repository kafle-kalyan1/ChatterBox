from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer
from . import models
from django.db.models import Q

class MessageCreateAPIView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        sender = self.request.user
        serializer.save(sender=sender)

class MessageListAPIView(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Message.objects.filter(Q(sender=user) | Q(receiver=user)).order_by('-timestamp')
        else:
            return Message.objects.none()
