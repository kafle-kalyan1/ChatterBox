from django.urls import path

from . import consumers

websocket_urlpatterns = [
   path('ws/sc',consumers.s_consumer.as_asgi()),
   path('ws/ac',consumers.a_consumer.as_asgi()),
]
