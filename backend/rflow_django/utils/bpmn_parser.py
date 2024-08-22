import lxml.etree as etree
from pathlib import Path
from utils.exceptions import ValidationError, ElementIdDuplicatedError
from collections import Counter


DEFAULT_ROOT_ATTRIBUTES = {
    'targetNamespace': 'http://www.example.org/ComplexExample',
    'typeLanguage': 'http://www.java.com/javaTypes',
    'expressionLanguage': 'http://www.mvel.org/2.0',
}
DEFAULT_ROOT_NAMESPACES = {
    'xsd': 'http://www.w3.org/2001/XMLSchema',
    'xs': 'http://www.w3.org/2001/XMLSchema-instance',
    'tns': 'http://www.example.org/ComplexExample',
    'bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
    'dc': 'http://www.omg.org/spec/DD/20100524/DC',
    'di': 'http://www.omg.org/spec/DD/20100524/DI',
    'bpmn': "http://www.omg.org/spec/BPMN/20100524/MODEL"
}
LOGIC_ELEMENTS_NAMESPACE = '{http://www.omg.org/spec/BPMN/20100524/MODEL'
VISUALIZATION_ELEMENTS_NAMESPACE = '{http://www.omg.org/spec/BPMN/20100524/DI'


def get_all_attributes_recursively(element: etree.ElementBase) -> dict:
    """
    Helper function to recursively collect attributes of elements and their children.
    Includes all waypoints that must be enumerated because they have no unique identifier.
    Removes namespaces from tag names and attribute keys.

    Parameters
    ----------
    element : etree.ElementBase
        The element to collect attributes from.

    Returns
    -------
    dict
        A dictionary containing all attributes of the element and its children.
    """
    children = {}
    waypoints = []

    for child in element:
        child_tag = child.tag.split('}')[-1] if '}' in child.tag else child.tag  # Potential namespace removal
        child_attrib = {}

        for attr_key, attr_value in child.attrib.items():
            clean_attr_key = attr_key.split('}')[-1] if '}' in attr_key else attr_key
            child_attrib[clean_attr_key] = attr_value

        grandchildren = get_all_attributes_recursively(child)
        if grandchildren:
            child_attrib.update(grandchildren)

        if child_tag == 'waypoint':
            waypoints.append(child_attrib)
        elif child_attrib:
            children[child_tag] = child_attrib

    if waypoints:
        for i, waypoint in enumerate(waypoints, start=1):
            children[f'waypoint{i}'] = waypoint

    return children


def merge_dictionaries(old_dict: dict,
                       priority_dict: dict) -> dict:
    """
    Merges two dictionaries, giving priority to the values in the second dictionary.

    This function adds key-value pairs from the first dictionary to the result if:
    - The key does not exist in the second dictionary.
    - The value does not exist in the second dictionary.

    It then adds or updates key-value pairs from the second dictionary to the result.
    If a value from the second dictionary already exists in the result under a different key,
    the corresponding key-value pair is removed before adding the new pair.

    Parameters
    ----------
    old_dict : dict
        The first dictionary (older data) to merge.
    priority_dict : dict
        The second dictionary (newer data) to merge, which takes precedence.

    Returns
    -------
    dict
        A dictionary containing the merged key-value pairs with priority given to the second dictionary.
    """
    result = {}

    for k, v in old_dict.items():
        if k not in priority_dict and v not in priority_dict.values():
            result[k] = v

    for k, v in priority_dict.items():
        for existing_k, existing_v in list(result.items()):
            if existing_v == v and existing_k != k:
                del result[existing_k]
        result[k] = v

    return result


def update_xml_root_attributes_namespaces(root_element: etree.ElementBase,
                                          default_attributes: dict,
                                          default_namespaces: dict) -> etree.ElementBase:
    """
    Updates the root element of an XML document with default attributes and namespaces.

    Parameters
    ----------
    root_element : etree.ElementBase
        The root element of the XML document to update.
    default_attributes : dict
        A dictionary containing default attributes to add to the root element.
    default_namespaces : dict
        A dictionary containing default namespaces to add to the root element.

    Returns
    -------
    etree.ElementBase
        The updated root element.
    """
    for key, value in merge_dictionaries(root_element.attrib, default_attributes).items():
        root_element.set(key, value)

    root_element.nsmap.update(default_namespaces)

    # Setting schemaLocation is special because it requires the 'xs' namespace
    root_element.set(f"{{{DEFAULT_ROOT_NAMESPACES['xs']}}}schemaLocation",
                     "http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd")

    return root_element


class BPMNParser:
    """
    A class to parse BPMN 2.0 XML files.

    Attributes:
    ----------
    xml_path : str
        The path to the BPMN 2.0 XML file.
    xsd_path : str
        The path to the BPMN 2.0 XML schema file.

    Methods:
    --------
    - validate_xml(xml_root: etree.ElementBase) -> None
    - parse() -> dict

    """
    def __init__(self, xml_path: str, xsd_path: str = str(Path(__file__).parent / 'schemas' / 'BPMN20.xsd')):
        self.xsd_path = xsd_path
        self.xml_path = xml_path

    def validate_xml(self, xml_root: etree.ElementBase) -> None:
        """
        Validates the given XML root element against the schema.

        Parameters:
        ----------
        xml_root : etree.ElementBase
            The root element of the XML document to validate.

        Raises:
        -------
        ValidationError:
            If the XML document is not valid according to the schema.
        """
        xml_schema = etree.XMLSchema(etree.parse(self.xsd_path))
        is_valid = xml_schema.validate(xml_root)

        if not is_valid:
            last_error = xml_schema.error_log.last_error
            raise ValidationError(f"XML file is not valid according to the BPMN 2.0 schema: {last_error}")

    def parse(self) -> dict:
        """
        Parses the BPMN 2.0 XML file and returns a dictionary containing the BPMN elements.

        Returns:
        -------
        dict
            A dictionary containing the BPMN elements parsed from the XML file.
        """
        tree = etree.parse(self.xml_path)
        etree.strip_tags(tree, etree.Comment)  # Remove comments from the XML
        root = tree.getroot()
        updated_xml_root = update_xml_root_attributes_namespaces(root,
                                                                 DEFAULT_ROOT_ATTRIBUTES,
                                                                 DEFAULT_ROOT_NAMESPACES)
        self.validate_xml(updated_xml_root)
        all_elements = list(updated_xml_root.iter())

        logic_elements = []  # Classes for BPMN elements (processes, tasks, etc.)
        visualization_elements = []  # Classes for BPMN DI elements (shapes, edges, etc.)
        full_elements = {}

        for element in all_elements:
            if element.tag.startswith(LOGIC_ELEMENTS_NAMESPACE):
                logic_elements.append(element)
            elif element.tag.startswith(VISUALIZATION_ELEMENTS_NAMESPACE):
                visualization_elements.append(element)

        logic_element_ids = [element.attrib.get('id') for element in logic_elements if 'id' in element.attrib]
        duplicates_logic = [item for item, count in Counter(logic_element_ids).items() if count > 1]

        if duplicates_logic:
            raise ElementIdDuplicatedError(
                f"Duplicated logic element(s): {', '.join(duplicates_logic)}")

        visualization_element_ids = [element.attrib.get('bpmnElement') for element in visualization_elements if
                                     'bpmnElement' in element.attrib]
        duplicates_visualization = [item for item, count in Counter(visualization_element_ids).items() if count > 1]

        if duplicates_visualization:
            raise ElementIdDuplicatedError(
                f"Duplicated visualization element(s): {', '.join(duplicates_visualization)}")

        for logic_element in logic_elements:
            logic_element_attributes = dict(logic_element.attrib)
            if '}' in logic_element.tag:
                logic_element_attributes['elementType'] = logic_element.tag.split('}')[1]  # Remove namespace
            logic_element_id = logic_element.attrib.get('id')
            if logic_element_id:
                full_elements[logic_element_id] = logic_element_attributes

        for visualization_element in visualization_elements:
            visualization_element_attributes = dict(visualization_element.attrib)
            if '}' in visualization_element.tag:
                visualization_element_attributes['elementType'] = visualization_element.tag.split('}')[1]
            visualization_element_id = visualization_element_attributes.get('bpmnElement')

            if visualization_element_id and visualization_element_id in full_elements:
                full_elements[visualization_element_id].update(
                    get_all_attributes_recursively(visualization_element)
                )

        # TODO: Elements that are not referenced by any DI element are not included in the final dictionary
        # TODO: intermediateCatchEvent and intermediateThrowEvent are not included in the final dictionary (should be
        #  properly parsed)

        return full_elements
