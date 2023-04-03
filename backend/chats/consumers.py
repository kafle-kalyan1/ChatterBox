from channels.consumer import SyncConsumer,AsyncConsumer, StopConsumer


class s_consumer(SyncConsumer):
   
   def websocket_connect(self, event):
      self.send({
         'type': 'websocket.accept',
      })
      print("Connected...")
      
   def websocket_receive(self, event):
      self.send({
         'type': 'websocket.send',
         'text': event['text'] 
      })
      
   def websocket_disconnect(self, event):
      print("Disconnect...")
      raise StopConsumer()

class a_consumer(AsyncConsumer):
   
   async def websocket_connect(self, event):
      await self.send({
         'type': 'websocket.accept',
      })
      print("Connected...")
      
   async def websocket_receive(self, event):
      print("Recived...",event)
      await self.send({
         'type': 'websocket.send',
         'text': "Oaaaaa" 
      })
      
   async def websocket_disconnect(self, event):
      print("Disconnect...")
      raise StopConsumer()
      
