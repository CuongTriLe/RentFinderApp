from rest_framework import serializers
from renthouse.models import User, HouseOwner, House, RoomForRent, HouseImage, RoomImage, OwnerPost, \
    OwnerPostUserComment, OwnerPostOwnerComment, UserPostOwnerComment, UserPostUserComment, UserPost


class HouseOwnerSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()
        user = HouseOwner(**data)
        user.set_password(user.password)
        user.save()
        return user

    class Meta:
        model = HouseOwner
        fields = ['id', 'username', 'first_name', 'last_name', 'phone', 'address', 'email', 'password', 'avatar']


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'avatar']


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomForRent
        fields = '__all__'


class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = '__all__'


class RoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = '__all__'


class OwnerPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerPost
        fields = '__all__'


class OwnerPostOwnerCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerPostOwnerComment
        fields = '__all__'


class OwnerPostUserCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = OwnerPostUserComment
        fields = '__all__'


class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = '__all__'


class UserPostOwnerCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPostOwnerComment
        fields = '__all__'


class UserPostUserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPostUserComment
        fields = '__all__'
