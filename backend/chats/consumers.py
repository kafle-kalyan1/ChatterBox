# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         print("WebSocket connection established.")

#     async def disconnect(self, close_code):
#         print("WebSocket connection closed.")

#     async def receive(self, text_data):
#         data = json.loads(text_data)

#         message = data['message']
#         receiver = data['receiver']
#         sender = data['sender']
#         print(f"Message received: {message} from {sender} for {receiver}")

#         # Create a group name based on the sender and receiver
#         group_name = f'chat-{sender}-{receiver}'

#         # Add both sender and receiver to the group
#         await self.channel_layer.group_add(group_name, self.channel_name)

#         # Get the list of channel names in the group
#         group = self.channel_layer.group_channels(group_name)
#         if group is not None:
#             # Send the message to all channels in the group
#             response = {
#                 'type': 'websocket.send',
#                 'text': f"{sender}: {message}"
#             }
#             for channel_name in group:
#                 await self.channel_layer.send(channel_name, response)
#         else:
#             print(f"No channels found in group: {group_name}")



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
