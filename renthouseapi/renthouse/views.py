from rest_framework import viewsets, generics
from renthouse.models import User, House, RoomForRent, HouseOwner, HouseImage, RoomImage, UserPost, OwnerPost, \
    UserPostOwnerComment, UserPostUserComment, OwnerPostOwnerComment, OwnerPostUserComment
from renthouse import serializers


class HouseOwnerViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = HouseOwner.objects.all()
    serializer_class = serializers.HouseOwnerSerializer


class UserViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class HouseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = House.objects.all()
    serializer_class = serializers.HouseSerializer


class RoomViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = RoomForRent.objects.all()
    serializer_class = serializers.RoomSerializer


class HouseImageViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = HouseImage.objects.all()
    serializer_class = serializers.HouseImageSerializer


class RoomImageViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = RoomImage.objects.all()
    serializer_class = serializers.RoomImageSerializer


class UserPostViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UserPost.objects.all()
    serializer_class = serializers.UserPostSerializer


class OwnerPostViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OwnerPost.objects.all()
    serializer_class = serializers.OwnerPostSerializer


class UserPostOwnerCommentViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UserPostOwnerComment.objects.all()
    serializer_class = serializers.UserPostOwnerCommentSerializer


class UserPostUserCommentViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UserPostUserComment.objects.all()
    serializer_class = serializers.UserPostUserCommentSerializer


class OwnerPostOwnerCommentViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OwnerPostOwnerComment.objects.all()
    serializer_class = serializers.OwnerPostOwnerCommentSerializer


class OwnerPostUserCommentViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OwnerPostUserComment.objects.all()
    serializer_class = serializers.OwnerPostUserCommentSerializer

