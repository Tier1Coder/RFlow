"""
This module contains a class to parse BPMN 2.0 XML files.

According to BPMN 2.0 specification:
Serializing a BPMN diagram requires the following: collection of BPMNShape(s) & collection of BPMNEdge(s) on
BPMNPlane of BPMNDiagram. BPMNShape(s) & BPMNEdge(s) must reference BPMN model element which is bpmnElement.
If no bpmnElement is referenced or if the reference is invalid, it is expected that
this shape or edge should not be depicted. The only exception is for a Data Association connected to a Sequence Flow.

When rendering a BPMN diagram, the correct depiction of a BPMNShape or BPMNEdge depends mainly on the
referenced BPMN model element [bpmnElement] and its particular attributes and/or references.

Parser takes an XML file as input, optionally updates the root element with default attributes and namespaces,
and then parses the XML file into a dictionary containing the BPMN diagram elements: both logical and visual.

The text of the label to be rendered is obtained by resolving the name attribute of the referenced BPMN model element
[bpmnElement] from the BPMNShape or BPMNEdge. In the particular case when the referenced BPMN model element
[bpmnElement] is a DataObjectReference, the text of the label to be rendered is obtained by concatenating the name
attribute of the referenced BPMN model element [bpmnElement] and the name attribute of the dataState attribute of this
DataObjectReference.

The parser also validates the XML document against the BPMN 2.0 XML schema and raises an exception if the document is
invalid in terms of its structure or content.

List of all element (BPMNShapes and BPMNEdges) types according to the BPMN 2.0 specification:
12.3 Notational Depiction Library and Abstract Element Resolutions (p. 380)
or: https://github.com/Tier1Coder/RFlow/issues/20

"""

from typing import Union, List
import lxml.etree as etree
from pathlib import Path
from utils.exceptions import DocumentInvalidError, ElementIdDuplicatedError
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


def merge_dictionaries(old_dict: dict, priority_dict: dict) -> dict:
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


def get_elements_with_specific_tag(elements: List[etree.ElementBase], tag: str) -> List[etree.ElementBase]:
    """
    Collects all elements with a specific tag name from the root element and its children.

    Parameters
    ----------
    elements : list
        A list of elements to search for the specified tag name.
    tag : str
        The tag name to search for.

    Returns
    -------
    list
        A list of elements with the specified tag name.
    """
    elements_with_specific_tag = []
    for element in elements:
        if element.tag.startswith(tag):
            elements_with_specific_tag.append(element)

    if len(elements_with_specific_tag) == 0:
        raise DocumentInvalidError(f"No elements with tag '{tag}' found in the XML document.")
    return elements_with_specific_tag


def check_duplicate_element_ids(elements: List[etree.ElementBase], ident: str) -> Union[ElementIdDuplicatedError, None]:
    """
    Checks for duplicate element IDs in a list of elements.

    Parameters
    ----------
    elements : list
        A list of elements to check for duplicate IDs.
    ident : str
        The identifier to check for duplicates.

    Returns
    -------
    None or DocumentInvalidError
        Returns None if no duplicate IDs are found, otherwise raises a ElementIdDuplicatedError.
    """
    element_ids = [element.attrib.get(ident) for element in elements if ident in element.attrib]
    duplicate_ids = [ident for ident, count in Counter(element_ids).items() if count > 1]

    if duplicate_ids:
        raise ElementIdDuplicatedError(
            f"Duplicated logic element(s): {', '.join(duplicate_ids)}")

    return


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


def combine_logical_and_visual_elements(logic_elements: List[etree.ElementBase],
                                        visual_elements: List[etree.ElementBase]) -> dict:
    """
    Combines logical and visual elements into a dictionary.

    Parameters
    ----------
    logic_elements : List[etree.ElementBase]
        A list of logical elements.
    visual_elements : List[etree.ElementBase]
        A list of visual elements.

    Returns
    -------
    dict
        A dict of elements containing both logical and visual elements inside of one key-value pair.
    """
    combined_elements = {}

    for logic_element in logic_elements:
        logic_element_attributes = dict(logic_element.attrib)
        if '}' in logic_element.tag:
            logic_element_attributes['elementType'] = logic_element.tag.split('}')[1]  # Remove namespace
        logic_element_id = logic_element.attrib.get('id')
        if logic_element_id:
            combined_elements[logic_element_id] = logic_element_attributes

    for visual_element in visual_elements:
        visualization_element_attributes = dict(visual_element.attrib)
        if '}' in visual_element.tag:
            visualization_element_attributes['elementType'] = visual_element.tag.split('}')[1]  # Remove namespace
        visualization_element_id = visualization_element_attributes.get('bpmnElement')

        if visualization_element_id and visualization_element_id in combined_elements:
            combined_elements[visualization_element_id].update(
                get_all_attributes_recursively(visual_element)
            )

    return combined_elements


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

    def validate_xml(self, xml_root: etree.ElementBase) -> Union[bool, DocumentInvalidError]:
        """
        Validates the given XML root element against the schema.

        Parameters:
        ----------
        xml_root : etree.ElementBase
            The root element of the XML document to validate.

        Raises:
        -------
        DocumentInvalidError:
            If the XML document is not valid according to the schema.
        """
        xml_schema = etree.XMLSchema(etree.parse(self.xsd_path))
        is_valid = xml_schema.validate(xml_root)

        if not is_valid:
            last_error = xml_schema.error_log.last_error
            raise DocumentInvalidError(f"XML file is not valid according to the BPMN 2.0 schema: {last_error}")
        return True

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

        # Classes for BPMN elements (processes, tasks, etc.)
        logic_elements = get_elements_with_specific_tag(all_elements, LOGIC_ELEMENTS_NAMESPACE)

        # Classes for BPMN DI elements (shapes, edges, etc.)
        visual_elements = get_elements_with_specific_tag(all_elements, VISUALIZATION_ELEMENTS_NAMESPACE)

        check_duplicate_element_ids(logic_elements, 'id')
        check_duplicate_element_ids(visual_elements, 'bpmnElement')

        combined_elements = combine_logical_and_visual_elements(logic_elements, visual_elements)

        # TODO: intermediateCatchEvent and intermediateThrowEvent are not included in the final dictionary (should be
        #  properly parsed)

        return combined_elements
