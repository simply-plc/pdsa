# Generated by Django 5.0.2 on 2024-02-29 07:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_aim_created_at_changeidea_created_at_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='changeidea',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='change_ideas', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
