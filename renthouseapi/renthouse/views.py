from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from renthouse.models import User, House, RoomForRent, HouseOwner, HouseImage, RoomImage, UserPost, OwnerPost, \
    UserPostUserComment, OwnerPostUserComment
from renthouse import serializers, paginator , perms


class HouseOwnerViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = HouseOwner.objects.filter(is_active=True)
    serializer_class = serializers.HouseOwnerSerializer
    pagination_class = paginator.BasePaginator

    def get_permissions(self):
        if self.action in ['get_current_houseowner']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-owner', detail=False)
    def get_current_houseowner(self, request):
        if request.method.__eq__('PATCH'):
            houseowner = request.user.houseowner
            for k, v in request.data.items():
                setattr(houseowner, k, v)
            houseowner.save()

        return Response(serializers.HouseOwnerSerializer(request.user.houseowner).data)

    @action(methods=['get'], url_path='houses', detail=True)
    def get_house(self, request, pk):
        houses = self.get_object().house_set.filter(active=True)
        return Response(serializers.HouseSerializer(houses, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='house-images', detail=True)
    def get_house_images(self, request, pk):
        house_images = self.get_object().houseimage_set.filter(active=True)
        return Response(serializers.HouseImageSerializer(house_images, many=True).data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    pagination_class = paginator.BasePaginator
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):
        if request.method.__eq__('PATCH'):
            user = request.user
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(request.user).data)


class HouseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = House.objects.all()
    serializer_class = serializers.HouseSerializer
    pagination_class = paginator.BasePaginator
    parser_classes = [parsers.MultiPartParser, ]

    def get_queryset(self):
        queryset = self.queryset

        owner_id = self.request.query_params.get('house_owner_id')
        if owner_id:
            queryset = queryset.filter(house_owner_id=owner_id)
        return queryset

    @action(methods=['get'], url_path='room', detail=True)
    def get_room(self, request, pk):
        room = self.get_object().roomforrent_set.filter(active=True)
        return Response(serializers.RoomSerializer(room, many=True).data, status=status.HTTP_200_OK)


class RoomViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView):
    queryset = RoomForRent.objects.all()
    serializer_class = serializers.RoomSerializer
    pagination_class = paginator.BasePaginator

    def get_queryset(self):
        queryset = self.queryset

        houses_id = self.request.query_params.get('house_id')
        if houses_id:
            queryset = queryset.filter(house_id=houses_id)
        return queryset

    @action(methods=['get'], url_path='room-images', detail=True)
    def get_room_images(self, request, pk):
        room = self.get_object().roomimage_set.filter(active=True)
        return Response(serializers.RoomImageSerializer(room, many=True).data, status=status.HTTP_200_OK)


class HouseImageViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = HouseImage.objects.all()
    serializer_class = serializers.HouseImageSerializer
    pagination_class = paginator.BasePaginator

    def get_queryset(self):
        queryset = self.queryset

        owner_id = self.request.query_params.get('house_owner_id')
        if owner_id:
            queryset = queryset.filter(house_owner_id=owner_id)
        return queryset


class RoomImageViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = RoomImage.objects.all()
    serializer_class = serializers.RoomImageSerializer
    pagination_class = paginator.BasePaginator

    def get_queryset(self):
        queryset = self.queryset

        roomforrent_id = self.request.query_params.get('room_image_id')
        if roomforrent_id:
            queryset = queryset.filter(room_image_id=roomforrent_id)
        return queryset


class UserPostViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = UserPost.objects.all()
    serializer_class = serializers.UserPostSerializer
    pagination_class = paginator.BasePaginator

    def get_queryset(self):
        queryset = self.queryset

        c = self.request.query_params.get('c')
        if c:
            queryset = queryset.filter(post_content__icontains=c)
        return queryset

    def get_permissions(self):
        if self.action in ['add_user_comment']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='user-comments', detail=True)
    def get_user_comments(self, request, pk):
        user_comment = self.get_object().userpostusercomment_set.filter(active=True)
        return Response(serializers.UserPostUserCommentSerializer(user_comment, many=True).data,
                        status=status.HTTP_200_OK)


    @action(methods=['post'], url_path='user-comments', detail=True)
    def add_user_comment(self, request, pk):
        c = self.get_object().userpostusercomment_set.create(comment_content=request.data.get('comment_content'),
                                                             author=request.user)
        return Response(serializers.UserPostUserCommentSerializer(c).data, status=status.HTTP_201_CREATED)


class OwnerPostViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = OwnerPost.objects.all()
    serializer_class = serializers.OwnerPostSerializer
    pagination_class = paginator.BasePaginator

    def get_queryset(self):
        queryset = self.queryset

        c = self.request.query_params.get('c')
        if c:
            queryset = queryset.filter(post_content__icontains=c)
        return queryset

    def retrieve(self, request, pk=None):
        queryset = self.get_queryset()
        try:
            owner_posts = queryset.get(pk=pk)
            serializer = self.serializer_class(owner_posts)
            return Response(serializer.data)
        except OwnerPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_permissions(self):
        if self.action in ['add_user_comment']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='user-comments', detail=True)
    def get_user_comments(self, request, pk):
        user_comment = self.get_object().ownerpostusercomment_set.order_by('-id')
        return Response(serializers.OwnerPostUserCommentSerializer(user_comment, many=True).data,
                        status=status.HTTP_200_OK)


    @action(methods=['post'], url_path='user-comment', detail=True)
    def add_user_comment(self, request, pk):
        c = self.get_object().ownerpostusercomment_set.create(comment_content=request.data.get('comment_content'),
                                                             author=request.user)
        return Response(serializers.OwnerPostUserCommentSerializer(c).data, status=status.HTTP_201_CREATED)



class UserPostUserCommentViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = UserPostUserComment.objects.all()
    serializer_class = serializers.UserPostUserCommentSerializer
    pagination_class = paginator.BasePaginator


    def get_queryset(self):
        queryset = self.queryset

        comment_author_id = self.request.query_params.get('author_id')
        if comment_author_id:
            queryset = queryset.filter(author_id=comment_author_id)
        return queryset




class OwnerPostUserCommentViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = OwnerPostUserComment.objects.all()
    serializer_class = serializers.OwnerPostUserCommentSerializer
    pagination_class = paginator.BasePaginator


    def get_queryset(self):
        queryset = self.queryset

        comment_author_id = self.request.query_params.get('author_id')
        if comment_author_id:
            queryset = queryset.filter(author_id=comment_author_id)
        return queryset
