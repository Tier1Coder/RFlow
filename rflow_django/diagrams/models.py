from django.db import models


class BPMNFile(models.Model):
    name = models.CharField(max_length=255)
    xml_file = models.FileField(upload_to='uploads/') # TODO: do bazy danych ma to byc zapisywane - w przypadku tych samych nazw jest generowane ID (w bazie danych bedzie klucz glowny)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
