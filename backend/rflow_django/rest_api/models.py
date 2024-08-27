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
    name = models.CharField(
        blank=True,  # True for custom validation (see serializers.py)
        unique=False,  # False for custom validation (see serializers.py)
        max_length=9999)  # Max length is set to a different value (see serializers.py)
    creation_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(
        max_length=9999,  # Max length is set to a different value (see serializers.py)
        blank=True  # True for custom validation (see serializers.py)
    )
    objects = models.Manager()

    def __str__(self):
        return self.name
