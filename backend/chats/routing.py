












from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/<str:sender_username>/<str:receiver_username>/', consumers.ChatConsumer.as_asgi()),
]


# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ),
# })