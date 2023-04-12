# from channels.generic.websocket import AsyncWebsocketConsumer
# import json


# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.sender_username = self.scope['url_route']['kwargs']['sender_username']
#         self.receiver_username = self.scope['url_route']['kwargs']['receiver_username']
#         self.room_name = f"{self.sender_username}_{self.receiver_username}"
#         self.room_group_name = f"chat_{self.room_name}"
#         await self.channel_layer.group_add(self.room_group_name, self.channel_name)

#         # join room group for receiver as well
#         self.receiver_room_group_name = f"chat_{self.receiver_username}"
#         await self.channel_layer.group_add(self.receiver_room_group_name, self.channel_name)

#         await self.accept()

#     async def disconnect(self, close_code):
#         # leave room group
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
#         await self.channel_layer.group_discard(self.receiver_room_group_name, self.channel_name)

#     async def receive(self, text_data):
#         print(f'Group......{self.room_group_name}')
#         print(f'Channels inside the group: {await self.channel_layer.group_channels(self.room_group_name)}')

#         # receive message from WebSocket
#         message = json.loads(text_data)
#         sender = message['sender']
#         receiver = message['receiver']
#         text = message['message']

#         # send message to room group
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'sender': sender,
#                 'receiver': receiver,
#                 'text': text
#             }
#         )

#     async def chat_message(self, event):
#         # send message to WebSocket
#         sender = event['sender']
#         receiver = event['receiver']
#         text = event['text']
#         await self.send(text_data=json.dumps({
#             'sender': sender,
#             'receiver': receiver,
#             'text': text
#         }))

import json
import traceback
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "chatterGroup"
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        message = json.loads(text_data)
        sender_username = message['sender']
        receiver_username = message['receiver']
        text = message['message']

        # get User instances for sender and receiver
        User = get_user_model()
        sender = await sync_to_async(User.objects.get)(username=sender_username)
        receiver = await sync_to_async(User.objects.get)(username=receiver_username)

        # save message to the database
        try:
            chat_message = await sync_to_async(Message.objects.create)(
                sender=sender,
                receiver=receiver,
                text=text
            )
            await sync_to_async(chat_message.save)()
        except Exception as e:
            print(f"Error saving message to database: {e}")

        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'chat.message',
                'sender': sender_username,
                'receiver': receiver_username,
                'text': text
            }
        )


    async def chat_message(self, event):
        sender = event['sender']
        receiver = event['receiver']
        text = event['text']
        await self.send(text_data=json.dumps({
            'sender': sender,
            'receiver': receiver,
            'text': text
        }))
