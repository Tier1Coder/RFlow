from rest_framework import status
from rest_framework.exceptions import APIException

""" Custom base exception class for the REST API """


class BaseCustomException(APIException):
    detail = None
    status_code = None

    def __init__(self, detail: str, status_code: int):
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


class DocumentInvalidError(Exception):
    """ Raised when an XML document is not valid according to the schema. """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class ElementIdDuplicatedError(Exception):
    """ Raised when an element ID is duplicated in the XML document. """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)
