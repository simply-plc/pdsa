from rest_framework import permissions

class IsTeamMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.members.all()

class IsAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user is an admin of the team
        return obj.team_memberships.filter(user=request.user, is_admin=True).exists()


class IsOwnerReadyOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.email == request.data['created_by'] # user.email since we are getting a string email and not object

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user == obj.created_by # no user.email necessary because they both compare the actual user object