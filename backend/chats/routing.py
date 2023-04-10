













from django.urls import path


from . import consumers

websocket_urlpatterns = [
    path('ws/ac/', consumers.ChatConsumer.as_asgi()),
]

# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ),
# })