# Generated by Django 4.2.7 on 2024-06-11 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renthouse', '0002_alter_ownerpost_post_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='houseowner',
            name='phone',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
