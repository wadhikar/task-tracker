from django.db import models

# Create your models here.

# {
#     id: 1,
#     text: 'Make Lunch',
#     day: 'Apr 22nd at 11:30am',
#     reminder: false,
# }


class TaskModel(models.Model):
    text = models.TextField()
    day = models.DateField()
    reminder = models.BooleanField()
