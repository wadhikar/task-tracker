import graphene
from graphene_django import DjangoObjectType

from .models import TaskModel


class TaskType(DjangoObjectType):
  class Meta:
    model = TaskModel


class Query(graphene.ObjectType):
  tasks = graphene.List(TaskType)

  def resolve_tasks(self, info):
    return TaskModel.objects.all()
    

class CreateTask(graphene.Mutation):
  id = graphene.ID()
  text = graphene.String()
  day = graphene.Date()
  reminder = graphene.Boolean()

  class Arguments:
    text = graphene.String()
    day = graphene.Date() # YYYY-MM-DD
    reminder = graphene.Boolean()

  def mutate(self, info, text, day, reminder):
    task = TaskModel(text=text, day=day, reminder=reminder)
    task.save()

    return CreateTask(
      id = task.id,
      text = task.text,
      day = task.day,
      reminder = task.reminder,
    )

# TODO: #4 Delete Task Mutation
class DeleteTask(graphene.Mutation):
  class Arguments:
    id = graphene.ID()

  task = graphene.Field(TaskType)

  def mutate(self, info, id):
    task_instance = TaskModel.objects.get(id=id)
    task_instance.delete()

    return None

# TODO: Update Task Mutation

class Mutation(graphene.ObjectType):
  create_task = CreateTask.Field()
  delete_task = DeleteTask.Field()

schema = graphene.Schema(
  query=Query,
  mutation=Mutation
)