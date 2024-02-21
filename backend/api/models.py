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

class Aim(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='aims')
    goal = models.TextField() # What do you want to accomplish?
    population = models.TextField() # Who is this aim for?
    by_num = models.TextField() # By how much do we want to accomplish?
    by_date = models.DateField() # By when will we have accomplished this aim?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.goal

class Driver(models.Model):
    aim = models.ForeignKey(Aim, on_delete=models.CASCADE, related_name='drivers')
    goal = models.TextField() # What needs to be improved?
    description = models.TextField() # How does it relate with the aim?
    measure = models.TextField() # What data do we measure?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.goal

class ChangeIdea(models.Model):
    STAGE_CHOICES = [
        ('Testing', 'Testing'), 
        ('Implementing', 'Implementing'), 
        ('Spreading', 'Spreading')
    ]

    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='change_ideas')
    idea = models.TextField() # What is the action idea you want to implement?
    stage = models.CharField(max_length=255, choices=STAGE_CHOICES) # Are we testing, implementing, or spreading?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.idea

class PDSA(models.Model):
    NEXT_STEP_CHOICES = [
        ('Implement', 'Implement'), 
        ('Expand', 'Expand'), 
        ('Abandon', 'Abandon')
    ]

    change_idea = models.ForeignKey(ChangeIdea, on_delete=models.CASCADE, related_name='pdsa')
    learning_goal = models.TextField() # What do you want to learn about change idea?
    steps = models.TextField() # What steps are you going to take to test the change idea?
    measure = models.TextField() # What data are you going to measure for the change idea?
    predictions = models.TextField() # What predictions do you have about the data for the change idea?
    by_date = models.DateField() # When are you going to test the change idea?
    learning = models.TextField() # What did you learn from the data you collected from testing the change idea?
    next_step = models.CharField(max_length=255, choices=NEXT_STEP_CHOICES) # Are you going to implement, expand, or abandon the change idea?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.learning_goal










