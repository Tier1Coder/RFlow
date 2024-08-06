import xml.etree.ElementTree as ET
from typing import Dict

import xmlschema


def get_children_from_element(element: ET.Element) -> dict:
    """
    Recursively adds children to the given element.

    Parameters
    ----------
    element : xml.etree.ElementTree.Element
        The XML element to process.

    Returns
    -------
    dict
        A dictionary with children elements.
    """
    children = {}
    waypoints = []

    for child in element:
        child_id = child.tag
        if child_id.endswith('waypoint'):
            waypoints.append(child.attrib)
        else:
            children[child_id] = {k: v for k, v in child.attrib.items()}
            # Add grandchildren recursively
            grandchildren = get_children_from_element(child)
            if grandchildren:
                children[child_id].update(grandchildren)

    if waypoints:
        for i, waypoint in enumerate(waypoints, start=1):
            children[f'waypoint{i}'] = waypoint

    return children


class BPMNFactory:
    def __init__(self, xml_path: str, xsd_path: str = 'utils/schemas/BPMN20.xsd'):
        self.xsd_path = xsd_path
        self.xml_path = xml_path
        self.schema = xmlschema.XMLSchema(xsd_path)

    def __validate(self) -> bool:
        """
        Validates the XML file against the XSD schema.

        Returns
        -------
        bool
            True if the XML is valid, False otherwise.
        """
        return self.schema.is_valid(self.xml_path)

    def parse(self) -> dict:
        """
        Parses the XML file and creates dynamic classes based on its content.

        Returns
        -------
        Dict[str, Any]
            One, filtered dictionary (merged using ids and bpmnElements fields) with the created classes.
        """
        if not self.__validate():
            raise ValueError(f"The XML file {self.xml_path} is not valid according to the schema {self.xsd_path}.")

        tree = ET.parse(self.xml_path)
        root = tree.getroot()
        for elem in tree.iter():
            tag_elements = elem.tag.split("}")  # Removing namespaces
            elem.tag = tag_elements[1]

        all_elements = list(root.iter())

        bpmn_classes = {}
        bpmndi_classes = {}

        """ Assuming that an element MUST have an id/bpmnElement field in order to properly 
            e.g. connect nodes on visualization. """
        for element in all_elements:
            element_id = element.attrib.get('id')
            bpmn_element_id = element.attrib.get('bpmnElement')
            if element_id:
                attributes = element.attrib.copy()
                attributes['elementType'] = element.tag
                del attributes['id']
                bpmn_classes[element_id] = type(element_id, (object,), attributes)
            elif bpmn_element_id:
                attributes = element.attrib.copy()
                attributes.update(get_children_from_element(element))
                bpmndi_classes[bpmn_element_id] = type(bpmn_element_id, (object,), attributes)

        for bpmndi_class_id, bpmn_class in bpmndi_classes.items():
            variables = {k: v for k, v in vars(bpmn_class).items() if not k.startswith('__')}
            for attr, value in variables.items():
                if attr != 'bpmnElement':
                    try:
                        setattr(bpmn_classes[bpmndi_class_id], attr, value)
                    except KeyError:
                        pass

        bpmn_classes_filtered = {i: {k: v for k, v in vars(j).items() if not k.startswith('__')} for i, j in
                                 bpmn_classes.items()}

        return bpmn_classes_filtered
