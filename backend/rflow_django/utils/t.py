from bpmn_factory import BPMNFactory

a = BPMNFactory('../../../test_files/t2.xml', xsd_path='schemas/BPMN20.xsd')
print(str(a.parse()))
