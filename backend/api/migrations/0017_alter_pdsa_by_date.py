# Generated by Django 5.0.2 on 2024-02-25 08:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_pdsa_by_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdsa',
            name='by_date',
            field=models.DateField(default=datetime.datetime(2024, 2, 25, 8, 25, 4, 373640, tzinfo=datetime.timezone.utc)),
        ),
    ]
