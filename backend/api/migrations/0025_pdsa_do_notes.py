# Generated by Django 5.0.2 on 2024-02-26 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_changeidea_stage_alter_pdsa_next_step'),
    ]

    operations = [
        migrations.AddField(
            model_name='pdsa',
            name='do_notes',
            field=models.TextField(blank=True),
        ),
    ]
