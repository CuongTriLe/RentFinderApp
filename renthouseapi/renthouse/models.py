from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatar/%Y/%m/', null=True)


class HouseOwner(User):
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, null=True)

    class Meta:
        verbose_name = 'House Owner User'


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


# Thông tin nhà trọ
class House(BaseModel):
    address = models.CharField(max_length=255)
    latitude = models.FloatField(default=0)  # vi do
    longtitude = models.FloatField(default=0)  # kinh do
    house_owner = models.ForeignKey(HouseOwner, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.house_owner.username + " House"


# Ảnh dãy trọ
class HouseImage(BaseModel):
    house_owner = models.ForeignKey(HouseOwner, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='houses/%Y/%m/')

    def __str__(self):
        return self.house_owner.username + " House Picture"


# Phòng cho thuê
class RoomForRent(BaseModel):
    room_number = models.CharField(max_length=3)  # số phòng
    price = models.FloatField()
    room_size = models.DecimalField(max_digits=10, decimal_places=2)
    house = models.ForeignKey(House, on_delete=models.CASCADE)

    def __str__(self):
        return self.house.house_owner.username + " " + self.room_number


# ảnh phòng trọ
class RoomImage(models.Model):
    room_image = models.ForeignKey(RoomForRent, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='room/%y/%m')

    def __str__(self):
        return self.room_image.house.house_owner.username + " " + self.room_image.room_number


# Chủ trọ đăng bài
class OwnerPost(BaseModel):
    post_content = RichTextField()  # Nội dung bài đăng
    house = models.ForeignKey(House, on_delete=models.CASCADE)  # Nhà trọ trong bài đăng
    author = models.ForeignKey(HouseOwner, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username + " Post"


# Bình luận bài viết của chủ trọ với tài khoan là người dùng
class OwnerPostUserComment(BaseModel):
    comment_content = RichTextField()  # Nội dung comment
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # Tác giả comment
    post_comment = models.ForeignKey(OwnerPost, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username + " in " + self.post_comment.author.username + " Post"


# Bình luận bài viết của chủ trọ với tài khoản là chủ trọ
class OwnerPostOwnerComment(BaseModel):
    comment_content = RichTextField()  # Nội dung comment
    author = models.ForeignKey(HouseOwner, on_delete=models.CASCADE)  # Tác giả comment
    post_comment = models.ForeignKey(OwnerPost, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username + " in " + self.post_comment.author.username + " Post"


# Người dùng đăng bài tìm trọ
class UserPost(BaseModel):
    post_content = RichTextField()  # Nội dung bài đăng
    find_area_address = models.CharField(max_length=255)  # Địa chỉ khu vực cần tìm
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # Tác giả bài đăng

    def __str__(self):
        return self.author.username + " Post"


# Bình luận bài viết của người tìm trọ với tài khoản là người dùng
class UserPostUserComment(BaseModel):
    comment_content = RichTextField()  # Nội dung comment
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # Tác giả comment
    post_comment = models.ForeignKey(UserPost, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username + " in " + self.post_comment.author.username + " Post"


# Bình luận bài viết của người tìm trọ với tài khoản là người dùng
class UserPostOwnerComment(BaseModel):
    comment_content = RichTextField()  # Nội dung comment
    author = models.ForeignKey(HouseOwner, on_delete=models.CASCADE)  # Tác giả comment
    post_comment = models.ForeignKey(UserPost, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.username + " in " + self.post_comment.author.username + " Post"



class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Người theo dõi
    house_owner = models.ForeignKey(HouseOwner, on_delete=models.CASCADE,
                                    related_name="house_owner")  # Chủ nhà được theo dõi

    def __str__(self):
        return self.user.username + " is follow " + self.house_owner.username
