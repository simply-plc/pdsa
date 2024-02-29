from rest_framework import permissions

class IsTeamMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(request.user)
        return request.user in obj.members.all()