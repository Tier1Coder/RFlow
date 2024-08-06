from django.apps import AppConfig


class RestApiConfig(AppConfig):
    """
       Configuration class for the rest_api app.

       This class sets the default type of primary key to use for models in this app
       and specifies the name of the app.

       Attributes:
           default_auto_field (str): The default type of primary key to use for models in this app.
           name (str): The name of the app as specified in the Django settings.
       """

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'rest_api'
