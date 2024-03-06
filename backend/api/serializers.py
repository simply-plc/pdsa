from rest_framework import serializers

from .models import *
from user.models import User

class TeamMembershipSerializer(serializers.ModelSerializer):
    # team_name = serializers.ReadOnlyField(source='team.name') # Get the read only value of id from team
    # team_get_members = serializers.ReadOnlyField(source='team.get_members') # Get the read only value from the function to see whose on the team
    # team_pk = serializers.ReadOnlyField(source='team.pk'); # Get just the pk value of team
    user = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all()) # This is for allowing email to be inputted into the serializer instead of the pk

    class Meta:
        model = TeamMembership
        fields = ['id', 'user', 'is_admin', 'joined_date'] # 'team_pk', 'team_name', 'team_get_members',


# This soley exists for the commented out stuff.
class TempPDSASerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = PDSA
        fields = '__all__'

class TempChangeIdeaSerializer(serializers.ModelSerializer): 
    pdsas = TempPDSASerializer(read_only=True, many=True)
    created_by = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = ChangeIdea
        fields = '__all__'

class TempDriverSerializer(serializers.ModelSerializer):
    change_ideas = TempChangeIdeaSerializer(read_only=True, many=True)

    class Meta:
        model = Driver
        fields = '__all__'

class TempAimSerializer(serializers.ModelSerializer):
    drivers = TempDriverSerializer(read_only=True, many=True)

    class Meta:
        model = Aim
        fields = '__all__'

# You can delete the above if you redefine the below.
class UserTeamSerializer(serializers.ModelSerializer):
    aims = TempAimSerializer(read_only=True, many=True)
    get_members = serializers.ReadOnlyField() # Get the read only value from the function to see whose on the team
    joined_dates = serializers.SlugRelatedField(slug_field='joined_date', read_only=True)
    team_memberships = TeamMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

class AimSerializer(serializers.ModelSerializer):
    drivers = TempDriverSerializer(read_only=True, many=True)
    # team_object = UserTeamSerializer(read_only=True, source='team')

    class Meta:
        model = Aim
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    change_ideas = TempChangeIdeaSerializer(read_only=True, many=True)
    # aim_object = AimSerializer(read_only=True, source='aim')

    class Meta:
        model = Driver
        fields = '__all__'

class ChangeIdeaSerializer(serializers.ModelSerializer): # This extra one is to allow change idea to use driverserializer
    pdsas = TempPDSASerializer(read_only=True, many=True)
    created_by = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())
    # driver_object = DriverSerializer(read_only=True, source='driver')

    class Meta:
        model = ChangeIdea
        fields = '__all__'

class PDSASerializer(serializers.ModelSerializer):
    # change_idea_object = ChangeIdeaSerializer(read_only=True, source='change_idea')
    created_by = serializers.SlugRelatedField(slug_field='email', queryset=User.objects.all())

    class Meta:
        model = PDSA
        fields = '__all__'





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
    # team_memberships = TeamMembershipSerializer(many=True) # serialilzes the team_memberships field so that we can see the actual values of team_memberships
    # members = serializers.SlugRelatedField(slug_field='email', read_only=True)
    aims = TempAimSerializer(read_only=True, many=True)
    get_members = serializers.ReadOnlyField() # Get the read only value from the function to see whose on the team
    joined_dates = serializers.SlugRelatedField(slug_field='joined_date', read_only=True)
    team_memberships = TeamMembershipSerializer(many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_at', 'get_members', 'team_memberships', 'joined_dates', 'aims']

    def create(self, validated_data):
        team_memberships = validated_data.pop('team_memberships') # Get the team memberships
        team = Team.objects.create(**validated_data) # Create the team and assign object to team
        for member in team_memberships: # Iterate through the memberships 
            TeamMembership.objects.create(team=team, **member) # Create a membership for each member in the team
        return team # return the team

    def update(self, instance, validated_data):        
        # Update team memberships
        updated_user_ids = [];
        team_memberships_data = validated_data.get('team_memberships', [])
        for team_membership_data in team_memberships_data:
            user_email = team_membership_data.get('user')  # Assuming 'user' contains the email
            updated_user_ids.append(user_email)
            # is_admin = team_membership_data.get('is_admin')
            
            # Find the team membership by user email
            print(user_email)
            team_membership, created = TeamMembership.objects.get_or_create(team=instance, user=user_email)
            # team_membership.is_admin = is_admin
            team_membership.save()

        instance.team_memberships.exclude(user__email__in=updated_user_ids).delete()

        instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance








