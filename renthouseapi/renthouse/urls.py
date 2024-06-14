from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from renthouse import views

r = routers.DefaultRouter()
r.register('house-owners', views.HouseOwnerViewSet, 'house-owners')
r.register('users', views.UserViewSet, 'users')
r.register('houses', views.HouseViewSet, 'houses')
r.register('rooms', views.RoomViewSet, 'rooms')
r.register('house-images', views.HouseImageViewSet, 'house-images')
r.register('room-images', views.RoomImageViewSet,'room-images')
r.register('user-posts', views.UserPostViewSet,'user-post')
r.register('owner-posts', views.OwnerPostViewSet,'owner-post')
r.register('user-post-owner-comments', views.UserPostOwnerCommentViewSet, 'user-post-owner-comments')
r.register('user-post-user-comments', views.UserPostUserCommentViewSet, 'user-post-user-comments')
r.register('owner-post-owner-comments', views.OwnerPostOwnerCommentViewSet, 'owner-post-owner-comments')
r.register('owner-post-user-comments', views.OwnerPostUserCommentViewSet, 'owner-post-user-comments')

urlpatterns = [
    path('', include(r.urls)),
]
