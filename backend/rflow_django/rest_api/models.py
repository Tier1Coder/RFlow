from django.db import models
import os


def upload_to(instance: 'BPMNDiagram', filename: str) -> str:
    base, extension = os.path.splitext(filename)
    new_filename = f"{base}_{instance.id}{extension}"
    return new_filename


class BPMNDiagram(models.Model):
    """
    Model representing a BPMN diagram.

    Attributes:
        name (str): The name of the BPMN diagram. Maximum length is 120 characters.
        creation_date (datetime): The date and time when the BPMN diagram was created. Automatically set on creation.
        file (FileField): The file associated with the BPMN diagram.
        objects (Manager): The default manager for the model.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(
        blank=True,  # True for custom validation (see serializers.py)
        unique=False,  # False for custom validation (see serializers.py)
        max_length=9999)  # Max length is set to a different value (see serializers.py)
    creation_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(
        max_length=9999,  # Max length is set to a different value (see serializers.py)
        blank=True,  # True for custom validation (see serializers.py)
        upload_to=upload_to
    )
    objects = models.Manager()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """ Overloaded save method to handle file renaming using following pattern: {file}_{id}{extension}. """
        if not self.id and self.file:
            temp_file = self.file
            self.file = None
            super().save(*args, **kwargs)
            self.file = temp_file

            # Ensure updating the existing instance, not creating a new one
            kwargs['force_insert'] = False

        super().save(*args, **kwargs)
