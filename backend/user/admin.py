from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group


from .models import User

# Register your models here.
class UserAdmin(UserAdmin):
    model = User
    list_display = ["email",]
    list_display = ("email", "is_staff", "is_active", "is_admin", )
    list_filter = ("email", "is_staff", "is_active", "is_admin", )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_admin", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(User, UserAdmin)

# admin.site.unregister(Group)