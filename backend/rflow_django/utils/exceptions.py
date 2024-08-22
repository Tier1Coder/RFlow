class ValidationError(Exception):
    """ Raised when an XML document is not valid according to the schema. """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class ElementIdDuplicatedError(Exception):
    """ Raised when an element ID is duplicated in the XML document. """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)
