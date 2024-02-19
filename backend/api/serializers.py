from rest_framework import serializers

from .models import *
from user.models import User



class TeamMembershipSerializer(serializers.ModelSerializer):
    team_name = serializers.ReadOnlyField(source='team.name') # Get the read only value of id from team
    team_get_members = serializers.ReadOnlyField(source='team.get_members') # Get the read only value from the function to see whose on the team
    team_pk = serializers.ReadOnlyField(source='team.pk'); # Get just the pk value of team
    user = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all()) # This is for allowing email to be inputted into the serializer instead of the pk

    class Meta:
        model = TeamMembership
        fields = ['user', 'team_pk', 'team_name', 'team_get_members', 'is_admin', 'joined_date']


class TeamSerializer(serializers.ModelSerializer):
    """
        {
            "name": "truly final testing stuffy",
            "team_memberships": [{"user":1,"is_admin":true},{"user":3,"is_admin":false}]
        }
        {
            "name": "truly final testing stuffy",
            "team_memberships": [{"user":"derekhuang7@gmail.com","is_admin":true},{"user":"aleher1126@gmail.com","is_admin":false}]
        }
    """
    team_memberships = TeamMembershipSerializer(many=True) # serialilzes the team_memberships field so that we can see the actual values of team_memberships

    class Meta:
        model = Team
        fields = ['id', 'name', 'team_memberships']

    def create(self, validated_data):
        team_memberships = validated_data.pop('team_memberships') # Get the team memberships
        team = Team.objects.create(**validated_data) # Create the team and assign object to team
        for member in team_memberships: # Iterate through the memberships 
            TeamMembership.objects.create(team=team, **member) # Create a membership for each member in the team
        return team # return the team

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        
        return instance

class AimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aim
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class ChangeIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeIdea
        fields = '__all__'

class PDSASerializer(serializers.ModelSerializer):
    class Meta:
        model = PDSA
        fields = '__all__'







