# Generated by Django 5.0.2 on 2024-02-14 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['email'], name='user_user_email_5f6a77_idx'),
        ),
    ]
