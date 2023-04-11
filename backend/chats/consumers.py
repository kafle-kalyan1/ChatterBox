from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender_username = self.scope['url_route']['kwargs']['sender_username']
        self.receiver_username = self.scope['url_route']['kwargs']['receiver_username']

        # join room group based on sender and receiver usernames
        self.room_name = f"{self.sender_username}_{self.receiver_username}"
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # join room group for receiver as well
        self.receiver_room_group_name = f"chat_{self.receiver_username}"
        await self.channel_layer.group_add(self.receiver_room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        await self.channel_layer.group_discard(self.receiver_room_group_name, self.channel_name)

    async def receive(self, text_data):
        print(f'Group......{self.room_group_name}')
        print(f'Channels inside the group: {await self.channel_layer.group_channels(self.room_group_name)}')
        
        # receive message from WebSocket
        message = json.loads(text_data)
        sender = message['sender']
        receiver = message['receiver']
        text = message['message']

        # send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'sender': sender,
                'receiver': receiver,
                'text': text
            }
        )

    async def chat_message(self, event):
        # send message to WebSocket
        sender = event['sender']
        receiver = event['receiver']
        text = event['text']
        await self.send(text_data=json.dumps({
            'sender': sender,
            'receiver': receiver,
            'text': text
        })) 
