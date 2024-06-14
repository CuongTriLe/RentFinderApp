from rest_framework import permissions


class HouseOwnerCommentAuthor(permissions.BasePermission):
    def has_permission(self, request, view):
        if hasattr(request.user, 'houseowner'):
            houseowner = request.user.houseowner
            if bool(houseowner and houseowner.is_authenticated):
                return True
        else:
            return False

    def has_object_permission(self, request, view, comment):
        if hasattr(request.user, 'houseowner'):
            houseowner = request.user.houseowner
            return super().has_permission(request, view) and houseowner == comment.author
        else:
            return False


class UserCommentAuthor(permissions.BasePermission):

    def has_permission(self, request, view):
        if hasattr(request.user, 'houseowner'):
            houseowner = request.user.houseowner
            if bool(houseowner and houseowner.is_authenticated):
                return False
        else:
            return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, comment):
        return super().has_permission(request, view) and request.user == comment.author

