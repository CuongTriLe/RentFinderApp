from rest_framework import serializers
from renthouse.models import User, HouseOwner, House, RoomForRent, HouseImage, RoomImage, OwnerPost, \
    OwnerPostUserComment, UserPostUserComment, UserPost


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
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'avatar', 'is_houseowner']





class HouseSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = '__all__'

    def get_images(self, house):
        data = RoomImage.objects.filter(room_image__house=house)

        return RoomImageSerializer(data, many=True).data



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

    def to_representation(self, roomimage):
        data = super().to_representation(roomimage)
        image = data.get('image', None);

        if image:
            data['image'] = roomimage.image.url

        return data


class OwnerPostSerializer(serializers.ModelSerializer):
    house = HouseSerializer()
    author_avatar = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    class Meta:
        model = OwnerPost
        fields = '__all__'

    def get_author_avatar(self, obj):
        author = obj.author
        if author and author.avatar:
            return author.avatar.url
        return None

    def get_author_name(self,obj):
        author = obj.author
        if author and author.first_name and author.last_name:
            return author.last_name + ' ' + author.first_name
        return None


class OwnerPostUserCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    class Meta:
        model = OwnerPostUserComment
        fields = '__all__'

    def get_author_avatar(self, obj):
        author = obj.author
        if author and author.avatar:
            return author.avatar.url
        return None

    def get_author_name(self,obj):
        author = obj.author
        if author and author.first_name and author.last_name:
            return author.last_name + ' ' + author.first_name
        return None

class UserPostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    class Meta:
        model = UserPost
        fields = '__all__'

    def get_author_avatar(self, obj):
        author = obj.author
        if author and author.avatar:
            return author.avatar.url
        return None

    def get_author_name(self,obj):
        author = obj.author
        if author and author.first_name and author.last_name:
            return author.last_name + ' ' + author.first_name
        return None


class UserPostUserCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    class Meta:
        model = UserPostUserComment
        fields = '__all__'

    def get_author_avatar(self, obj):
        author = obj.author
        if author and author.avatar:
            return author.avatar.url
        return None

    def get_author_name(self,obj):
        author = obj.author
        if author and author.first_name and author.last_name:
            return author.last_name + ' ' + author.first_name
        return None
