
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
#         print(type(message))
#         await self.send({
#             'type': 'websocket.send',
#             'text': message
#         })








import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        await self.accept()

        # Add the client to the "chat" group
        await self.channel_layer.group_add("chat", self.channel_name)

    async def disconnect(self, close_code):
        # Remove the client from the "chat" group
        await self.channel_layer.group_discard("chat", self.channel_name)

    async def receive(self, text_data):
        # Get the text message from the WebSocket message
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send the message to all clients in the "chat" group
        await self.channel_layer.group_send(
            "chat",
            {
                'type': 'chat.message',
                'message': message
            }
        )

    async def chat_message(self, event):
        # Send the message to the WebSocket client
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
