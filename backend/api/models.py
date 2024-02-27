from django.db import models
from django.utils import timezone
from datetime import date

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
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='aims')
    goal = models.TextField() # What do you want to accomplish?
    population = models.TextField() # Who is this aim for?
    by_num = models.TextField() # By how much do we want to accomplish?
    by_date = models.DateField() # By when will we have accomplished this aim?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class Driver(models.Model):
    name = models.CharField(max_length=50)
    aim = models.ForeignKey(Aim, on_delete=models.CASCADE, related_name='drivers')
    goal = models.TextField() # What needs to be improved?
    description = models.TextField() # How does it relate with the aim?
    measure = models.TextField() # What data do we measure?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class ChangeIdea(models.Model):
    STAGE_CHOICES = [
        ('Abandoned', 'Abandoned'),
        ('Testing', 'Testing'), 
        ('Implementing', 'Implementing'), 
        ('Spreading', 'Spreading')
    ]

    name = models.CharField(max_length=50)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='change_ideas')
    idea = models.TextField() # What is the action idea you want to implement?
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES) # Are we testing, implementing, or spreading?
    modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class PDSA(models.Model):
    NEXT_STEP_CHOICES = [
        ('Adopt', 'Adopt'), 
        ('Adapt', 'Adapt'), 
        ('Abandon', 'Abandon')
    ]

    STAGE_CHOICES = [
        ('Plan', 'Plan'),
        ('Do', 'Do'),
        ('Study', 'Study'),
        ('Act', 'Act'),
        ('Complete', 'Complete')
    ]

    name = models.CharField(max_length=50)
    change_idea = models.ForeignKey(ChangeIdea, on_delete=models.CASCADE, related_name='pdsas')
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='Plan')
    learning_goal = models.TextField(blank=True) # What do you want to learn?
    steps = models.TextField(blank=True) # What steps do you need to test?
    measure = models.TextField(blank=True) # What data are you going to measure?
    predictions = models.TextField(blank=True) # What predictions do you have about the data?
    by_date = models.DateField(default=date.today) # When are you going to test the change idea?
    do_notes = models.TextField(blank=True) # Notes:
    data = models.TextField(blank=True) # What is your data?
    learning = models.TextField(blank=True) # What did you learn from the data you collected?
    next_step = models.CharField(max_length=20, choices=NEXT_STEP_CHOICES, blank=True) # Are you going to implement, expand, or abandon the change idea?
    next_step_rationale = models.TextField(blank=True) # What is your rationale for the choice?
    modified_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name










