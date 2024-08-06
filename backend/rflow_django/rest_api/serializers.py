from rest_framework import serializers
from .models import BPMNDiagram


class BPMNDiagramSerializer(serializers.ModelSerializer):
    """
    Serializer for the BPMNDiagram model.

    This class provides a way to convert BPMNDiagram instances to and from
    various data formats, such as JSON and XML. It includes metadata about
    the model and the fields to be serialized.

    Attributes:
        Meta (class): Metadata for the BPMNDiagramSerializer.
            model (BPMNDiagram): The model class to be serialized.
            fields (tuple): The fields of the model to be serialized.
                - id (int): The primary key of the BPMN diagram.
                - name (str): The name of the BPMN diagram.
                - creation_date (datetime): The date and time when the BPMN diagram was created.
                - file (FileField): The file associated with the BPMN diagram.
    """
    class Meta:
        model = BPMNDiagram
        fields = ('id', 'name', 'creation_date', 'file')
