"""
WSGI config for rflow_django core.

It exposes the WSGI callable as a module-level variable named ``application``.

"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.rflow_django.core.settings')

application = get_wsgi_application()
