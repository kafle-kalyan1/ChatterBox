import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get the user ID from the route parameters
        self.user_id = self.scope['url_route']['kwargs']['user_id']

        # Add the user to their unique channel group
        await self.channel_layer.group_add(
            self.user_id,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # Remove the user from their unique channel group
        await self.channel_layer.group_discard(
            self.user_id,
            self.channel_name
        )

    async def receive(self, text_data):
        # Parse the received JSON data
        data = json.loads(text_data)

        # Get the recipient's user ID from the data
        recipient_id = data['recipient_id']

        # Send the message to the recipient's channel group
        await self.channel_layer.group_send(
            recipient_id,
            {
                'type': 'chat.message',
                'message': data['message'],
                'sender_id': self.user_id,
            }
        )

    async def chat_message(self, event):
        # Send the message to the WebSocket client
        await self.send(json.dumps(event))













# import json
# from channels.generic.websocket import AsyncWebsocketConsumer


# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         # Accept the WebSocket connection
#         await self.accept()

#         # Add the client to the "chat" group
#         await self.channel_layer.group_add("chat", self.channel_name)

#     async def disconnect(self, close_code):
#         # Remove the client from the "chat" group
#         await self.channel_layer.group_discard("chat", self.channel_name)

#     async def receive(self, text_data):
#         # Get the text message from the WebSocket message
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']

#         # Send the message to all clients in the "chat" group
#         await self.channel_layer.group_send(
#             "chat",
#             {
#                 'type': 'chat.message',
#                 'message': message
#             }
#         )

#     async def chat_message(self, event):
#         # Send the message to the WebSocket client
#         message = event['message']
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))
