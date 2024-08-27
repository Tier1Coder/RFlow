from typing import Any
import re
from rest_framework import serializers
from .models import BPMNDiagram
from utils.exceptions import (
    DiagramNameTooLongException,
    DiagramNameContainsInvalidCharactersException,
    DiagramNameAlreadyExistsException,
    DiagramNameCannotBeBlankException,
    InvalidFileTypeException,
    DiagramFileNameTooLongException,
    DiagramFileCannotBeBlankException
)


MAXIMUM_DIAGRAM_NAME_LENGTH = 50
MAXIMUM_FILE_NAME_LENGTH = 100
INVALID_CHARACTERS_PATTERN = r'[^a-zA-Z0-9_\- ]'  # Only letters, numbers, underscores, hyphens, and spaces are allowed.


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

    Methods:
        validate(data): Validates the data for the BPMN diagram.
        create(data): Creates a new BPMN diagram instance. (Inherited from ModelSerializer - overloaded)
        update(instance, data): Updates an existing BPMN diagram instance. (Inherited from ModelSerializer - overloaded)
    """

    class Meta:
        model = BPMNDiagram
        fields = ('id', 'name', 'creation_date', 'file')

    def validate(self, data: Any) -> Any:
        """ Object-level validation for the BPMN diagram fields. """
        name = data.get('name', '')
        file = data.get('file', None)

        # Custom name validation
        if not name.strip() or name.isspace() or name == '' or name is None:
            raise DiagramNameCannotBeBlankException()
        if len(name) > MAXIMUM_DIAGRAM_NAME_LENGTH:
            raise DiagramNameTooLongException(
                f'Diagram name is too long. Maximum length is {MAXIMUM_DIAGRAM_NAME_LENGTH} characters.'
            )
        if re.search(INVALID_CHARACTERS_PATTERN, name):
            raise DiagramNameContainsInvalidCharactersException(
                "Diagram name contains invalid characters. "
                "Only letters, numbers, underscores, hyphens, and spaces are allowed."
            )

        try:
            if BPMNDiagram.objects.filter(name=name).exclude(id=self.instance.id).exists():
                raise DiagramNameAlreadyExistsException()
        except AttributeError:
            if BPMNDiagram.objects.filter(name=name).exists():
                raise DiagramNameAlreadyExistsException()

        # Custom file validation
        if self.instance is None and file is None:
            raise DiagramFileCannotBeBlankException("File cannot be blank.")

        if file:
            if not file.name.endswith(('.xml', '.bpmn', '.xmi')):
                raise InvalidFileTypeException("Invalid file type. Only XML, BPMN, and XMI files are allowed.")

            if len(file.name) > MAXIMUM_FILE_NAME_LENGTH:
                raise DiagramFileNameTooLongException(
                    f'File name is too long. Maximum length is {MAXIMUM_FILE_NAME_LENGTH} characters.'
                )

        return data

    def create(self, validated_data: dict):
        return BPMNDiagram.objects.create(**validated_data)

    def update(self, instance: BPMNDiagram, validated_data: dict):
        instance.name = validated_data.get('name', instance.name)
        new_file = validated_data.get('file', None)

        if new_file:
            old_file = instance.file
            if old_file:
                old_file.storage.delete(old_file.name)
            instance.file = new_file

        instance.save()
        return instance
