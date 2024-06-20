from rest_framework import permissions


class CommentAuthor(permissions.BasePermission):

    def has_permission(self, request, view):
            return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, comment):
        return super().has_permission(request, view) and request.user == comment.author

