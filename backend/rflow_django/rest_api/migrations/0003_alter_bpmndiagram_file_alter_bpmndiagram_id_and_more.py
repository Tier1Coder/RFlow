# Generated by Django 5.1 on 2024-12-02 14:27

import rest_api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0002_alter_bpmndiagram_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bpmndiagram',
            name='file',
            field=models.FileField(blank=True, max_length=9999, upload_to=rest_api.models.upload_to),
        ),
        migrations.AlterField(
            model_name='bpmndiagram',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='bpmndiagram',
            name='name',
            field=models.CharField(blank=True, max_length=9999),
        ),
    ]
