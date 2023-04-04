import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class a_consumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("WebSocket connection established.")

    async def disconnect(self, close_code):
        print("WebSocket connection closed.",close_code)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        receiver = data['receiver']
        print(f"Message received: {message} for {receiver}")
        
        # Send the message through the channel layer to the receiver
        await self.channel_layer.group_send(
            receiver,  # Group name is the receiver's name
            {
                'type': 'chat_message',
                'message': message,
               #  'sender': self.scope['user'].username  
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        print(f"Message sent: {message} from {sender}")
        response = {
            'type': 'websocket.send',
            'text': message
        }
        await self.send(json.dumps(response))
