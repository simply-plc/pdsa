from rest_framework import serializers

from .models import *



class TeamMembershipSerializer(serializers.ModelSerializer):
    team_name = serializers.ReadOnlyField(source='team.name') # Get the read only value of id from team
    team_get_members = serializers.ReadOnlyField(source='team.get_members')
    # user = serializers.SlugRelatedField(slug_field='user.email', queryset='User.user') 

    #################### FIGRE OUT HOW TO CREATE: teammembership entry using user as the email rather than the primary key
    ########################## maybe call the serializer in the teamserializer create method

    class Meta:
        model = TeamMembership
        fields = ['user', 'team_name', 'team_get_members', 'is_admin', 'joined_date']


class TeamSerializer(serializers.ModelSerializer):
    """
        {
            "name": "truly final testing stuffy",
            "team_memberships": [{"user":1,"is_admin":true},{"user":3,"is_admin":false}]
        }
    """
    team_memberships = TeamMembershipSerializer(many=True)

    class Meta:
        model = Team
        fields = ['name', 'team_memberships']

    def create(self, validated_data): # TODO: MAKE SURE THAT THE USER WHO IS CREATING IS INCLUDED
        team_memberships = validated_data.pop('team_memberships') # Get the team memberships
        team = Team.objects.create(**validated_data) # Create the team and assign object to team
        for member in team_memberships: # Iterate through the memberships 
            TeamMembership.objects.create(team=team, **member) # Create a membership for each member in the team
        return team # return the team

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        
        return instance