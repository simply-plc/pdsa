# Generated by Django 5.0.2 on 2024-02-25 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_pdsa_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='pdsa',
            name='next_step_rationale',
            field=models.TextField(blank=True),
        ),
    ]