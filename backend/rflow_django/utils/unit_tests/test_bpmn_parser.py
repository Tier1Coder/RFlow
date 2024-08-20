"""
    This file contains the unit tests for the bpmn_parser module.

"""

import unittest
from lxml import etree
import utils.bpmn_parser as bp


class TestBpmnParser(unittest.TestCase):

    def test_get_all_attributes_recursively_bounds(self):
        tree = etree.fromstring(
            '<semantic:definitions'
            ' id="_1275940932088"'
            ' targetNamespace="http://www.trisotech.com/definitions/_1275940932088"'
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
            ' xmlns:di="http://www.omg.org/spec/DD/20100524/DI"'
            ' xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"'
            ' xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"'
            ' xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">'
            '   <bpmndi:BPMNShape bpmnElement="_6-53" isHorizontal="true" id="Trisotech.Visio__6-53">'
            '       <dc:Bounds height="294.0" width="1044.0" x="12.0" y="12.0"/>'
            '       <bpmndi:BPMNLabel>'
            '           <dc:Font name="Arial" size="12" isBold="true"/>'
            '       </bpmndi:BPMNLabel>'
            '   </bpmndi:BPMNShape>'
            '</semantic:definitions>'
        )

        result = bp.get_all_attributes_recursively(tree)

        expected = {
            'BPMNShape': {
                'bpmnElement': '_6-53',
                'isHorizontal': 'true',
                'id': 'Trisotech.Visio__6-53',
                'Bounds': {
                    'height': '294.0',
                    'width': '1044.0',
                    'x': '12.0',
                    'y': '12.0'
                },
                'BPMNLabel': {
                    'Font': {
                        'name': 'Arial',
                        'size': '12',
                        'isBold': 'true'
                    }
                }
            }
        }

        self.assertEqual(expected, result)

    def test_get_all_attributes_recursively_waypoints(self):
        tree = etree.fromstring(
            '<semantic:definitions'
            ' id="_1275940932088"'
            ' targetNamespace="http://www.trisotech.com/definitions/_1275940932088"'
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
            ' xmlns:di="http://www.omg.org/spec/DD/20100524/DI"'
            ' xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"'
            ' xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"'
            ' xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">'
            '   <bpmndi:BPMNEdge bpmnElement="_6-53" id="Trisotech.Visio__6-53">'
            '       <di:waypoint x="12.0" y="12.0"/>'
            '       <di:waypoint x="12.0" y="12.0"/>'
            '       <di:waypoint x="12.0" y="12.0"/>'
            '   </bpmndi:BPMNEdge>'
            '</semantic:definitions>'
        )

        result = bp.get_all_attributes_recursively(tree)

        expected = {
            'BPMNEdge': {
                'bpmnElement': '_6-53',
                'id': 'Trisotech.Visio__6-53',
                'waypoint1': {
                    'x': '12.0',
                    'y': '12.0'
                },
                'waypoint2': {
                    'x': '12.0',
                    'y': '12.0'
                },
                'waypoint3': {
                    'x': '12.0',
                    'y': '12.0'
                }
            }
        }

        self.assertEqual(expected, result)

    def test_get_al_attributes_recursively_empty_element(self):
        tree = etree.fromstring(
            '<semantic:emptyElement '
            '   xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"/>'
        )
        result = bp.get_all_attributes_recursively(tree)
        expected = {}
        self.assertEqual(expected, result)

    def test_get_all_attributes_recursively_at_different_levels(self):
        tree = etree.fromstring(
            '<semantic:root id="rootId" xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">'
            '   <semantic:child id="childId">'
            '       <semantic:grandchild id="grandchildId" name="test"/>'
            '   </semantic:child>'
            '</semantic:root>'
        )
        result = bp.get_all_attributes_recursively(tree)
        expected = {
            'child': {
                'id': 'childId',
                'grandchild': {
                    'id': 'grandchildId',
                    'name': 'test'
                }
            }
        }
        self.assertEqual(expected, result)

    def test_get_all_attributes_recursively_elements_with_same_name(self):
        tree = etree.fromstring(
            '<semantic:root xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">'
            '   <semantic:element id="id1"/>'
            '   <semantic:element id="id2"/>'
            '</semantic:root>'
        )

        result = bp.get_all_attributes_recursively(tree)
        expected = {
            'element': {
                'id': 'id2'
            }
        }
        self.assertEqual(expected, result)

    def test_get_all_attributes_recursively_invalid_xml(self):
        with self.assertRaises(etree.XMLSyntaxError):
            etree.fromstring('<semantic:root xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">')

    def test_merge_dictionaries(self):
        dict1 = {
            'a': 1,
            'b': 2
        }
        dict2 = {
            'b': 3,
            'c': 4
        }
        result = bp.merge_dictionaries(dict1, dict2)
        expected = {
            'a': 1,
            'b': 3,
            'c': 4
        }
        self.assertEqual(expected, result)

    def test_update_xml_root_attributes_namespaces(self):
        tree = etree.fromstring(
            '<semantic:root'
            ' xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">'
            '   <semantic:child id="childId"/>'
            '</semantic:root>'
        )

        bp.update_xml_root_attributes_namespaces(tree, bp.DEFAULT_ROOT_ATTRIBUTES, bp.DEFAULT_ROOT_NAMESPACES)
        result = etree.tostring(tree, pretty_print=True).decode('utf-8')

        expected = (
            '<semantic:root xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"'
            ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
            ' targetNamespace="http://www.example.org/ComplexExample"'
            ' typeLanguage="http://www.java.com/javaTypes"'
            ' expressionLanguage="http://www.mvel.org/2.0"'
            ' xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">'
            '   <semantic:child id="childId"/>'
            '</semantic:root>\n'
        )

        self.assertEqual(expected, result)


if __name__ == '__main__':
    unittest.main()
