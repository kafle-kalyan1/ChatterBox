# from django.contrib import admin
# from . import models
# # Register your models here.
# admin.site.register(models.Message)

from django.contrib import admin
from .models import Message

class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'text', 'timestamp')
    
    def save_model(self, request, obj, form, change):
        obj.save() # make sure to call save() on the Message object
        
admin.site.register(Message, MessageAdmin)
