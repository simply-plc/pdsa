from django.contrib import admin

from .models import *

# Register your models here.
class TeamAdmin(admin.ModelAdmin):
    model = Team
    list_display = ["name", "get_members", "created_at"]

admin.site.register(Team, TeamAdmin)

class TeamMembershipAdmin(admin.ModelAdmin):
    model = TeamMembership
    list_display = ["user", "team", "is_admin", "joined_date"]

admin.site.register(TeamMembership, TeamMembershipAdmin)
