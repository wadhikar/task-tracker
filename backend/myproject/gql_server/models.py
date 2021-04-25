from django.db import models

# Create your models here.
class TaskModel(models.Model):
    text = models.TextField()
    day = models.DateField()
    reminder = models.BooleanField()
