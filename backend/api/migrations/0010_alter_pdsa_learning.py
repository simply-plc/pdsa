# Generated by Django 5.0.2 on 2024-02-25 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_pdsa_learning_alter_pdsa_next_step'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdsa',
            name='learning',
            field=models.TextField(blank=True),
        ),
    ]