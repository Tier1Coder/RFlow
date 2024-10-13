from rest_framework import status
from rest_framework.exceptions import APIException
from typing import Union


class BaseCustomException(APIException):
    """ Base class for custom exceptions. """
    def __init__(self, detail: Union[str, dict], status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
        super().__init__(detail, status_code)
        self.detail = detail
        self.status_code = status_code


"""  REST API errors """


# Name field exceptions
class DiagramNameTooLongException(BaseCustomException):
    def __init__(self, detail: str = "Diagram name too long."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


class DiagramNameContainsInvalidCharactersException(BaseCustomException):
    def __init__(self, detail: str = "Diagram name contains invalid characters."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


class DiagramNameCannotBeBlankException(BaseCustomException):
    def __init__(self, detail: str = "Diagram name cannot be blank."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


class DiagramNameAlreadyExistsException(BaseCustomException):
    def __init__(self, detail: str = "Diagram name already exists. Please choose a different name."):
        super().__init__(detail, status.HTTP_409_CONFLICT)


# File field exceptions
class InvalidFileTypeException(BaseCustomException):
    def __init__(self, detail: str = "Invalid file type."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


class DiagramFileNameTooLongException(BaseCustomException):
    def __init__(self, detail: str = "Diagram file name too long."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


class DiagramFileCannotBeBlankException(BaseCustomException):
    def __init__(self, detail: str = "Diagram file cannot be blank."):
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)


""" BPMNParser errors """


class DocumentInvalidError(BaseCustomException):
    """ Raised when an XML document is not valid according to the schema. """
    status_code = status.HTTP_400_BAD_REQUEST

    def __init__(self, detail: str, line: int = None, column: int = None):
        detail = {
            'error': detail,
            'line': line,
            'column': column
        }
        super().__init__(detail, self.status_code)
        self.message = detail
        self.line = line
        self.column = column


class ElementIdDuplicatedError(BaseCustomException):
    """ Raised when a visual_element ID is duplicated in the XML document. """
    status_code = status.HTTP_400_BAD_REQUEST

    def __init__(self, detail: str, duplicated_ids: list = None):
        detail = {
            'error': detail,
            'duplicatedIds': duplicated_ids or []
        }
        super().__init__(detail, self.status_code)
        self.message = detail
        self.duplicated_ids = duplicated_ids
