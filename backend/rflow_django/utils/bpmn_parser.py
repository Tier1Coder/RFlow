"""
This module contains a class to parse BPMN 2.0 XML files.

According to BPMN 2.0 specification:
Serializing a BPMN diagram requires the following: collection of BPMNShape(s) & collection of BPMNEdge(s) on
BPMNPlane of BPMNDiagram. BPMNShape(s) & BPMNEdge(s) must reference BPMN model visual_element which is bpmnElement.
If no bpmnElement is referenced or if the reference is invalid, it is expected that
this shape or edge should not be depicted. The only exception is for a Data Association connected to a Sequence Flow.

When rendering a BPMN diagram, the correct depiction of a BPMNShape or BPMNEdge depends mainly on the
referenced BPMN model visual_element [bpmnElement] and its particular attributes and/or references.

Parser takes an XML file as input, removes namespaces from the XML document, collects logical and visual elements,
and then parses the XML file into a single dictionary structure, containing both logical and visual elements.

The text of the label to be rendered is obtained by resolving the name attribute of the referenced BPMN model
visual_element [bpmnElement] from the BPMNShape or BPMNEdge. In the particular case when the referenced BPMN model
visual_element [bpmnElement] is a DataObjectReference, the text of the label to be rendered is obtained by
concatenating the name attribute of the referenced BPMN model visual_element [bpmnElement] and the name attribute
of the dataState attribute of this DataObjectReference.

The parser also validates the XML document against the BPMN 2.0 XML schema and raises an exception if the document is
invalid in terms of its structure or content.

List of all visual_element (BPMNShapes and BPMNEdges) types according to the BPMN 2.0 specification is available in the:
12.3 Notational Depiction Library and Abstract Element Resolutions (p. 380)
or: https://github.com/Tier1Coder/RFlow/issues/20

"""

from typing import Union, List
import lxml.etree as etree
from lxml import objectify
from pathlib import Path
from utils.exceptions import DocumentInvalidError, ElementIdDuplicatedError
from collections import defaultdict


def remove_namespaces(root: etree.ElementBase) -> None:
    """
    Removes namespaces from the root and its children.

    Parameters
    ----------
    root : etree.ElementBase
        The root visual_element of the XML document.
    """
    for elem in root.getiterator():
        if isinstance(elem, etree._Comment) or isinstance(elem, etree._ProcessingInstruction):
            continue
        local_name = etree.QName(elem).localname
        if elem.tag != local_name:
            elem.tag = etree.QName(elem).localname

        for attr_name in elem.attrib:
            local_attr_name = etree.QName(attr_name).localname
            if attr_name != local_attr_name:
                attr_value = elem.attrib[attr_name]
                del elem.attrib[attr_name]
                elem.attrib[local_attr_name] = attr_value

    objectify.deannotate(root, cleanup_namespaces=True)


def obtain_logical_visual_elements(elements: List[etree.ElementBase]) -> tuple:
    """
    Collects logical and visual elements from the list of elements.

    Parameters
    ----------
    elements : List[etree.ElementBase]
    """
    logical_elements = []
    visual_elements = []

    for element in elements:
        if 'id' in element.attrib and 'bpmnElement' not in element.attrib:
            logical_elements.append(element)
        elif 'bpmnElement' in element.attrib:
            visual_elements.append(element)

    return logical_elements, visual_elements


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
    id_occurrences = defaultdict(list)
    for element in elements:
        if ident in element.attrib:
            element_id = element.attrib[ident]
            line = element.sourceline
            id_occurrences[element_id].append({
                'id': element_id,
                'line': line,
            })

    duplicated_id_info = []
    for id_, occurrences in id_occurrences.items():
        if len(occurrences) > 1:
            duplicated_id_info.extend(occurrences)

    if duplicated_id_info:
        raise ElementIdDuplicatedError(
            f"Duplicated element(s): {', '.join([info['id'] for info in duplicated_id_info])}",
            duplicated_ids=duplicated_id_info
        )
    return


def get_all_visual_element_attributes_recursively(visual_element: etree.ElementBase) -> dict:
    """
    Recursively collects attributes of the visual element and its children.
    Includes all waypoints that must be enumerated because they have no unique identifier.
    It only works for visual elements.

    Parameters
    ----------
    visual_element : etree.ElementBase
        The element to collect attributes from.

    Returns
    -------
    dict
        A dictionary containing all attributes of the element and its children.
    """
    children_attributes = {}
    waypoints = []

    for child in visual_element:
        child_attrib = dict(child.attrib)

        grandchildren = get_all_visual_element_attributes_recursively(child)
        if grandchildren:
            child_attrib.update(grandchildren)

        if child.tag == 'waypoint':
            waypoints.append(child_attrib)
        elif child_attrib:
            children_attributes[child.tag] = child_attrib

    if waypoints:
        for i, waypoint in enumerate(waypoints, start=1):
            children_attributes[f'waypoint{i}'] = waypoint

    return children_attributes


def parse_process_element(process_element: etree.ElementBase) -> dict:
    """
    Parses BPMN process element.

    Parameters
    ----------
    process_element : etree.ElementBase
        The BPMN process element.

    Returns
    -------
    dict
        A dictionary containing the BPMN process specific data such as attributes, text, and children.
    """

    def recursive_parse(element):
        element_data = {
            "tag": element.tag,
            "attributes": dict(element.attrib),
            "text": element.text if element.text and element.text.strip() else 'None'
        }
        tag_counts = {}

        for child in element:
            child_data = recursive_parse(child)
            child_tag = child.tag
            if child_tag not in tag_counts:
                tag_counts[child_tag] = 0
            tag_counts[child_tag] += 1
            key = f"{child_tag}{tag_counts[child_tag]}"

            element_data[key] = child_data
        return element_data

    return recursive_parse(process_element)


def combine_logical_and_visual_elements(logical_elements: List[etree.ElementBase],
                                        visual_elements: List[etree.ElementBase]) -> dict:
    """
    Combines logical and visual elements into a single dictionary.

    Parameters
    ----------
    logical_elements : List[etree.ElementBase]
    visual_elements : List[etree.ElementBase]

    Returns
    -------
    dict
        A combination of visual and logical elements merged into a single structure.
        When a visual visual_element references a logical visual_element, the attributes of the visual visual_element
        are added to the logical visual_element.
    """
    combined_elements = {}

    for logical_element in logical_elements:
        logical_element_attributes = dict(logical_element.attrib)
        logical_element_id = logical_element_attributes.pop('id', None)
        if logical_element_id:
            logical_element_attributes['elementType'] = logical_element.tag
            combined_elements[logical_element_id] = logical_element_attributes

    for visual_element in visual_elements:
        visual_element_attributes = dict(visual_element.attrib)
        visual_element_id = visual_element_attributes.pop('bpmnElement', None)
        if visual_element_id and visual_element_id in combined_elements:
            combined_elements[visual_element_id].update(
                get_all_visual_element_attributes_recursively(visual_element)
            )

    # Add process element data to the combined elements
    for logical_element in logical_elements:
        for logical_element_child in logical_element:
            if logical_element_child.tag == 'process':
                for process_element_child in logical_element_child:
                    try:
                        combined_elements[process_element_child.attrib.get('id')].update(
                            parse_process_element(process_element_child))
                    except KeyError:
                        pass
                    if process_element_child.tag == 'subProcess':
                        for sub_process_child in process_element_child:
                            try:
                                combined_elements[sub_process_child.attrib.get('id')].update(
                                    parse_process_element(sub_process_child))
                            except KeyError:
                                pass

    return combined_elements


def remove_repetitions(element_data: dict) -> dict:
    def remove_redundant_attributes(data: dict) -> dict:
        for data_key, data_value in list(data.items()):
            if isinstance(data_value, dict):
                remove_redundant_attributes(data_value)
            if data_key == "attributes":
                redundant_keys = [k for k in data_value if k in data and data[k] == data_value[k]]
                for redundant_key in redundant_keys:
                    del data_value[redundant_key]
        return data

    for key, value in list(element_data.items()):
        if isinstance(value, dict):
            remove_repetitions(value)
        if key == "tag" and "elementType" in element_data and element_data["elementType"] == value:
            del element_data[key]

    return remove_redundant_attributes(element_data)


def update_element_types(element_data: dict, all_elements: dict = None) -> dict:
    """ Updates element types based on the rules defined in the BPMN 2.0 specification. """
    if all_elements is None:
        all_elements = element_data

    for key, value in list(element_data.items()):
        if isinstance(value, dict):
            update_element_types(value, all_elements)

        current_element_type = element_data.get("elementType", None)
        if current_element_type:
            """ Rules for updating element types """
            """ BPMN Shapes """
            # artifacts
            # call activities
            # call choreographies
            # choreography participant bands
            # choreography tasks
            # collapsed ad hoc sub - processes
            # collapsed call activities
            if current_element_type == "callActivity":
                called_element_id = element_data.get("calledElement", None)
                if called_element_id:
                    if all_elements[called_element_id]["elementType"] == "process":
                        element_data["elementType"] = "callActivityCollapsed"
            # collapsed call choreographies
            # collapsed event sub - processes
            if current_element_type == "subProcess" and \
                    element_data.get("triggeredByEvent", "false").lower() == "true" and \
                    not element_data.get("isExpanded", None) and \
                    sum(1 for key in element_data if key.startswith("startEvent")) == 1:
                if any("messageEventDefinition" in key for key in element_data.get("startEvent1", {})):
                    if element_data.get("startEvent1", {}).get("isInterrupting", "false") is True:
                        element_data["elementType"] = "interruptingMessageEventSubProcessCollapsed"
                    else:
                        element_data["elementType"] = "nonInterruptingMessageEventSubProcessCollapsed"
            # collapsed sub - choreographies
            # collapsed sub - processes
            if current_element_type == "subProcess" and \
                    element_data.get("triggeredByEvent", "false").lower() == "false" and \
                    not element_data.get("isExpanded", None):
                element_data["elementType"] = "subProcessCollapsed"

            # collapsed transactions
            # conversations
            # data
            if current_element_type == "dataObjectReference":
                data_object_ref_id = element_data.get("dataObjectRef", None)
                if data_object_ref_id and all_elements.get(data_object_ref_id, {}).get("isCollection") is True:
                    element_data["elementType"] = "dataObjectCollection"
                else:
                    element_data["elementType"] = "dataObject"
            # events
            if current_element_type == "startEvent" and any("messageEventDefinition" in key for key in element_data):
                if element_data.get("isInterrupting") is True:
                    element_data["elementType"] = "interruptingMessageStartEvent"
                else:
                    element_data["elementType"] = "nonInterruptingMessageStartEvent"
            if current_element_type == "startEvent" and not any("EventDefinition" in key for key in element_data):
                element_data["elementType"] = "noneStartEvent"
            if current_element_type == "intermediateCatchEvent" and element_data.get("timerEventDefinition1", None):
                element_data["elementType"] = "timerIntermediateEvent"
            if current_element_type == "intermediateCatchEvent" and element_data.get("messageEventDefinition1", None):
                element_data["elementType"] = "catchSignalIntermediateEvent"
            if current_element_type == "endEvent" and not any("EventDefinition" in key for key in element_data):
                element_data["elementType"] = "noneEndEvent"
            if current_element_type == "endEvent" and any("terminateEventDefinition" in key for key in element_data):
                element_data["elementType"] = "terminateEndEvent"
            if current_element_type == "intermediateThrowEvent" and not any("EventDefinition" in key for key in
                                                                            element_data):
                element_data["elementType"] = "interruptingNoneIntermediateEvent"
            if current_element_type == "intermediateThrowEvent" and any("compensateEventDefinition" in key for key in
                                                                        element_data):
                element_data["elementType"] = "throwCompensationIntermediateEvent"
            if current_element_type == "boundaryEvent" and any("timerEventDefinition" in key for key in element_data)\
                    and element_data.get("cancelActivity") == "true":
                element_data["elementType"] = "interruptingBoundaryTimerIntermediateEvent"
            if current_element_type == "endEvent" and any("messageEventDefinition" in key for key in element_data):
                element_data["elementType"] = "messageEndEvent"
            if current_element_type == "startEvent" and any("timerEventDefinition" in key for key in element_data):
                if element_data.get("isInterrupting") is True:
                    element_data["elementType"] = "interruptingTimerStartEvent"
                else:
                    element_data["elementType"] = "nonInterruptingTimerStartEvent"
            if current_element_type == "boundaryEvent" and any("errorEventDefinition" in key for key in element_data):
                element_data["elementType"] = "boundaryCatchErrorIntermediateEvent"
            if current_element_type == "boundaryEvent" and any(
                    "compensateEventDefinition" in key for key in element_data):
                element_data["elementType"] = "boundaryCatchCompensationIntermediateEvent"
            if current_element_type == "startEvent" and \
                    any("conditionalEventDefinition" in key for key in element_data):
                if element_data.get("isInterrupting", None) is True:
                    element_data["elementType"] = "interruptingConditionalStartEvent"
                else:
                    element_data["elementType"] = "nonInterruptingConditionalStartEvent"
            if current_element_type == "endEvent" and any("errorEventDefinition" in key for key in element_data):
                element_data["elementType"] = "errorEndEvent"
            if current_element_type == "intermediateThrowEvent" and any("escalationEventDefinition" in key for key in
                                                                        element_data):
                element_data["elementType"] = "throwEscalationIntermediateEvent"
            if current_element_type == "boundaryEvent" and \
                    any("escalationEventDefinition" in key for key in element_data):
                if element_data.get("cancelActivity") == "true":
                    element_data["elementType"] = "interruptingBoundaryCatchEscalationIntermediateEvent"
                else:
                    element_data["elementType"] = "nonInterruptingBoundaryCatchEscalationIntermediateEvent"
            # expanded ad hoc sub - processes
            # expanded call activities
            # expanded call choreographies
            # expanded event sub - processes
            # expanded sub - choreographies
            # expanded sub - processes
            # expanded transactions
            # gateways
            if current_element_type == "exclusiveGateway" and element_data.get("isMarkerVisible", None):
                element_data["elementType"] = "exclusiveGatewayWithMarker"
            # lanes
            if current_element_type == "lane" and not element_data.get("isVertical", None):
                element_data["elementType"] = "horizontalLane"
            if current_element_type == "lane" and element_data.get("isVertical", None):
                element_data["elementType"] = "verticalLane"
            # loop markers
            # pools
            if current_element_type == "participant" and (element_data.get("ParticipantMultiplicity") is None or
                                                          element_data.get("ParticipantMultiplicity") == "1"):
                element_data["elementType"] = "horizontalPool"
            # tasks
            if current_element_type == "task":
                element_data["elementType"] = "abstractTask"

            """ BPMN Edges """
            # connecting objects
            if current_element_type == "messageFlow" and (element_data.get("messageVisibleKind") is None or
                                                          element_data.get("messageVisibleKind") == "unspecified"):
                pass
    return element_data


class BPMNParser:
    """
    A class to parse BPMN XML files according to the provided schema.

    Attributes:
    ----------
    xml_path : str
        The path to the BPMN XML file.
    xsd_path : str
        The path to the BPMN XML schema file.

    Methods:
    --------
    - validate_xml(xml_root: etree.ElementBase) -> Union[None, DocumentInvalidError]
    - parse() -> dict

    """
    def __init__(self, xml_path: str, xsd_path: str = str(Path(__file__).parent / 'schemas' / 'BPMN20.xsd')):
        self.xsd_path = xsd_path
        self.xml_path = xml_path

    def validate_xml(self, xml_root: etree.ElementBase) -> Union[None, DocumentInvalidError]:
        """
        Validates the given XML root visual_element against the schema.

        Parameters:
        ----------
        xml_root : etree.ElementBase
            The root visual_element of the XML document to validate.

        Raises:
        -------
        DocumentInvalidError:
            If the XML document is not valid according to the schema.
        """
        xml_schema = etree.XMLSchema(etree.parse(self.xsd_path))
        is_valid = xml_schema.validate(xml_root)

        if not is_valid:
            last_error = xml_schema.error_log.last_error
            raise DocumentInvalidError(last_error.message, last_error.line, last_error.column)
        return

    def parse(self) -> dict:
        """
        Parses the BPMN XML file and returns a dictionary containing the parsed BPMN elements.

        Returns:
        -------
        dict
            A dictionary containing the BPMN elements parsed from the XML file.
        """
        tree = etree.parse(self.xml_path)
        etree.strip_tags(tree, etree.Comment)  # Remove comments from the XML
        root = tree.getroot()

        self.validate_xml(root)

        remove_namespaces(root)

        all_elements = list(root.iter())
        logical_elements, visual_elements = obtain_logical_visual_elements(all_elements)
        check_duplicate_element_ids(logical_elements, "id")
        check_duplicate_element_ids(visual_elements, "bpmnElement")
        combined_elements = combine_logical_and_visual_elements(logical_elements, visual_elements)
        updated_combined_elements = remove_repetitions(combined_elements)
        updated_element_types = update_element_types(updated_combined_elements)

        return updated_element_types
