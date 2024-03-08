from django.contrib import admin

from .models import *

# Register your models here.
class TeamAdmin(admin.ModelAdmin):
    model = Team
    list_display = ["id", "name", "get_members", "created_at"]

admin.site.register(Team, TeamAdmin)

class TeamMembershipAdmin(admin.ModelAdmin):
    model = TeamMembership
    list_display = ["id", "user", "team", "is_admin", "joined_date"]

admin.site.register(TeamMembership, TeamMembershipAdmin)

# class AimAdmin(admin.ModelAdmin):
#     model = Aim
#     list_display = ["id", "name", 'team', 'goal', 'population', 'by_num', 'by_date']

# admin.site.register(Aim, AimAdmin)

class DriverAdmin(admin.ModelAdmin):
    model = Driver
    list_display = ["id", "name", 'team', 'goal', 'description', 'measure']

admin.site.register(Driver, DriverAdmin)

class ChangeIdeaAdmin(admin.ModelAdmin):
    model = ChangeIdea
    list_display = ["id", "name", 'driver', 'idea', 'stage', 'created_by']

admin.site.register(ChangeIdea, ChangeIdeaAdmin)

class PDSAAdmin(admin.ModelAdmin):
    model = PDSA
    list_display = ["id", "name", 'change_idea', 'stage', 'learning_goal', 'steps', 'measure', 'predictions', 'by_date', 'learning', 'next_step', 'created_by']

admin.site.register(PDSA, PDSAAdmin)