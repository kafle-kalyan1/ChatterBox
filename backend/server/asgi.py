import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
application = get_asgi_application()

# application = ProtocolTypeRouter({
#     'http': get_asgi_application(),
# }
#     ),

