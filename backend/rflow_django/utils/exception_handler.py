from rest_framework.views import exception_handler
from datetime import datetime
from typing import Any
from rest_framework.response import Response


def custom_exception_handler(exc: Any, context: dict) -> Response:
    """ Custom exception handler for the REST API """
    response = exception_handler(exc, context)

    if response is not None:
        response.data['time'] = datetime.now()

        detail = response.data.pop('detail', None)

        if isinstance(detail, dict):
            response.data['error'] = detail.get('error', 'An error occurred.')

            for key, value in detail.items():
                if key != 'error':
                    response.data[key] = value
        else:
            response.data['message'] = detail

    return response
