# Generated by Django 5.0.2 on 2024-02-25 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_pdsa_by_date_alter_pdsa_learning_goal_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdsa',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
