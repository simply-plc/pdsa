from django.db import models
from django.utils import timezone

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField('user.User', through='TeamMembership', related_name='teams')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def get_members(self):
        return "\n".join([m.email for m in self.members.all()])

class TeamMembership(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='team_memberships')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_memberships')
    is_admin = models.BooleanField(default=False)
    joined_date = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'team')