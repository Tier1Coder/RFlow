from django.db import models


class BPMNDiagram(models.Model):
    """
    Model representing a BPMN diagram.

    Attributes:
        name (str): The name of the BPMN diagram. Maximum length is 120 characters.
        creation_date (datetime): The date and time when the BPMN diagram was created. Automatically set on creation.
        file (FileField): The file associated with the BPMN diagram.
        objects (Manager): The default manager for the model.
    """
    name = models.CharField(max_length=120)
    creation_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField()
    objects = models.Manager()

    def __str__(self):
        return self.name
