from rest_framework.views import exception_handler
from datetime import datetime
from typing import Any


def custom_exception_handler(exc: Any, context: dict):
    response = exception_handler(exc, context)

    if response is not None:
        response.data['message'] = response.data['detail']
        response.data['time'] = datetime.now()
        del response.data['detail']
    return response
