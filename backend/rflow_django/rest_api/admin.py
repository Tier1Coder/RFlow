from django.contrib import admin
from .models import BPMNDiagram


class BPMNDiagramAdmin(admin.ModelAdmin):
    """
    Custom admin class for the BPMNDiagram model.

    This class customizes the admin interface for the BPMNDiagram model by
    specifying the fields to display in the list view.

    Attributes:
        list_display (tuple): Fields to display in the admin list view. Includes:
            - name (str): The name of the BPMN diagram.
            - creation_date (datetime): The date when the BPMN diagram was created.
            - file (FileField): The file associated with the BPMN diagram.
    """
    list_display = ('name', 'creation_date', 'file')


admin.site.register(BPMNDiagram, BPMNDiagramAdmin)
