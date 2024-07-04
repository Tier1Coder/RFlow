from django import forms
from .models import BPMNFile


class BPMNFileForm(forms.ModelForm):
    class Meta:
        model = BPMNFile
        fields = ['name', 'xml_file']
