from rest_framework.views import exception_handler
from datetime import datetime
from typing import Any
from rest_framework.response import Response


def custom_exception_handler(exc: Any, context: dict) -> Response:
    """ Custom exception handler for the REST API """
    response = exception_handler(exc, context)

    if response is not None:
        if 'detail' in response.data:
            response.data['message'] = response.data['detail']
            response.data['time'] = datetime.now()
            del response.data['detail']
        else:
            response.data['message'] = str(exc)
            response.data['time'] = datetime.now()
    return response
