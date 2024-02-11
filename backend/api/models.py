from django.db import models

# Create your models here.
class Team(models.Model):
    name = model.CharField(max_length=255)
    

    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        pass
    