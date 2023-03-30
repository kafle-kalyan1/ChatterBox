from django.contrib.auth.models import User

from rest_framework import permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer, UserPublicSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserPublicSerializer

class MyAccount(APIView):
    permissions=[permissions.IsAuthenticated, permissions.AllowAny]

    def get(self, request):
        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        request.user.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
    