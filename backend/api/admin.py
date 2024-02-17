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

class AimAdmin(admin.ModelAdmin):
    model = Aim
    list_display = ['team', 'goal', 'population', 'by_num', 'by_date']

admin.site.register(Aim, AimAdmin)

class DriverAdmin(admin.ModelAdmin):
    model = Driver
    list_display = ['aim', 'goal', 'description', 'measure']

admin.site.register(Driver, DriverAdmin)

class ChangeIdeaAdmin(admin.ModelAdmin):
    model = ChangeIdea
    list_display = ['driver', 'idea', 'stage']

admin.site.register(ChangeIdea, ChangeIdeaAdmin)

class PDSAAdmin(admin.ModelAdmin):
    model = PDSA
    list_display = ['change_idea', 'learning_goal', 'steps', 'measure', 'predictions', 'by_date', 'learning', 'next_step']

admin.site.register(PDSA, PDSAAdmin)