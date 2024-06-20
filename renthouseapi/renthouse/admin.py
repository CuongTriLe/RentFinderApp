from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse

from renthouse.models import User, House, RoomForRent, HouseOwner, HouseImage, RoomImage, UserPost, OwnerPost, \
    UserPostOwnerComment, UserPostUserComment, OwnerPostOwnerComment, OwnerPostUserComment
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


class RentHouseAdminSite(admin.AdminSite):
    site_header = 'RentHouseOnline'

    def get_urls(self):
        return [path('statistic/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        user_stats = User.objects.exclude(houseowner__isnull=False).values('id', 'username', 'date_joined')
        user_count = User.objects.exclude(houseowner__isnull=False).count()
        howner_stats = HouseOwner.objects.values('id', 'username', 'date_joined')
        howner_count = HouseOwner.objects.count()
        return TemplateResponse(request, 'admin/statistic.html', {
            "user_stats": user_stats,
            "user_count": user_count,
            "howner_stats": howner_stats,
            "howner_count": howner_count
        })


admin_site = RentHouseAdminSite(name='RentHouse')


class UserPostForm(forms.ModelForm):
    post_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = UserPost
        fields = '__all__'


class OwnerPostForm(forms.ModelForm):
    post_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = OwnerPost
        fields = '__all__'


class UserPostOwnerCommentForm(forms.ModelForm):
    comment_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = UserPostOwnerComment
        fields = '__all__'


class UserPostUserCommentForm(forms.ModelForm):
    comment_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = UserPostUserComment
        fields = '__all__'


class OwnerPostOwnerCommentForm(forms.ModelForm):
    comment_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = OwnerPostOwnerComment
        fields = '__all__'


class OwnerPostUserCommentForm(forms.ModelForm):
    comment_content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = OwnerPostUserComment
        fields = '__all__'


class HouseAppAdmin(admin.ModelAdmin):
    list_display = ['id', '__str__', 'address', 'created_date', 'updated_date', 'active']


class ImageModel(admin.ModelAdmin):
    list_display = ['__str__', ]
    readonly_fields = ['uploaded_photo']

    def uploaded_photo(self, instance):
        if instance:
            return mark_safe(f"<img width='120' src='{instance.image.url}' />")


class AccountManager(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'email']
    search_fields = ['id', 'username', 'email', 'phone', 'first_name', 'last_name']
    list_filter = ['id', 'username']
    readonly_fields = ['uploaded_avatar']

    def uploaded_avatar(self, instance):
        if instance:
            return mark_safe(f"<img width='120' src='{instance.avatar.url}' />")


class RoomManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'room_number', 'price', 'room_size']
    search_fields = ['room_number']
    list_filter = ['id', 'room_number']


class UserPostManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = UserPostForm


class UserPostUserCommentManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = UserPostUserCommentForm


class UserPostOwnerCommentManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = UserPostOwnerCommentForm


class OwnerPostManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = OwnerPostForm


class OwnerPostUserCommentManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = OwnerPostUserCommentForm


class OwnerPostOwnerCommentManager(admin.ModelAdmin):
    list_display = ['id', '__str__', 'created_date']
    form = OwnerPostOwnerCommentForm


# Register your models here.
admin_site.register(User, AccountManager)
admin_site.register(HouseOwner, AccountManager)
admin_site.register(House, HouseAppAdmin)
admin_site.register(HouseImage, ImageModel)
admin_site.register(RoomImage, ImageModel)
admin_site.register(RoomForRent, RoomManager)
admin_site.register(UserPost, UserPostManager)
admin_site.register(OwnerPost, OwnerPostManager)
admin_site.register(UserPostOwnerComment, UserPostOwnerCommentManager)
admin_site.register(UserPostUserComment, UserPostUserCommentManager)
admin_site.register(OwnerPostOwnerComment, OwnerPostOwnerCommentManager)
admin_site.register(OwnerPostUserComment, OwnerPostUserCommentManager)
