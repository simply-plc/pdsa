# Generated by Django 5.0.2 on 2024-02-25 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_pdsa_stage'),
    ]

    operations = [
        migrations.AddField(
            model_name='pdsa',
            name='data',
            field=models.TextField(blank=True),
        ),
    ]
