"""
Package used to unify the different constant values used in diagrams parsing and generation
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class Constants(object):

    # BPMN 2.0 element names
    DEFINITIONS: str = "definitions"
    COLLABORATION: str = "collaboration"
    PARTICIPANT: str = "participant"
    PARTICIPANTS: str = "participants"
    PROCESS: str = "process"
    PROCESS_REF: str = "processRef"
    LANE: str = "lane"
    LANES: str = "lanes"
    LANE_SET: str = "laneSet"
    CHILD_LANE_SET: str = "childLaneSet"
    FLOW_NODE_REF: str = "flowNodeRef"
    FLOW_NODE_REFS: str = "flowNodeRefs"
    TASK: str = "task"
    USER_TASK: str = "userTask"
    SERVICE_TASK: str = "serviceTask"
    MANUAL_TASK: str = "manualTask"
    SCRIPT_TASK: str = "scriptTask"
    SCRIPT: str = "script"
    SUBPROCESS: str = "subProcess"
    DATA_OBJECT: str = "dataObject"
    COMPLEX_GATEWAY: str = "complexGateway"
    EVENT_BASED_GATEWAY: str = "eventBasedGateway"
    INCLUSIVE_GATEWAY: str = "inclusiveGateway"
    EXCLUSIVE_GATEWAY: str = "exclusiveGateway"
    PARALLEL_GATEWAY: str = "parallelGateway"
    START_EVENT: str = "startEvent"
    INTERMEDIATE_CATCH_EVENT: str = "intermediateCatchEvent"
    END_EVENT: str = "endEvent"
    INTERMEDIATE_THROW_EVENT: str = "intermediateThrowEvent"
    BOUNDARY_EVENT: str = "boundaryEvent"

    # BPMN 2.0 element attribute names
    ID: str = "id"
    NAME: str = "name"
    NODE_NAME: str = "node_name"
    GATEWAY_DIRECTION: str = "gatewayDirection"
    DEFAULT: str = "default"
    INSTANTIATE: str = "instantiate"
    EVENT_GATEWAY_TYPE: str = "eventGatewayType"
    SOURCE_REF: str = "sourceRef"
    TARGET_REF: str = "targetRef"
    TRIGGERED_BY_EVENT: str = "triggeredByEvent"
    PARALLEL_MULTIPLE: str = "parallelMultiple"
    CANCEL_ACTIVITY: str = "cancelActivity"
    ATTACHED_TO_REF: str = "attachedToRef"
    IS_INTERRUPTING: str = "isInterrupting"
    IS_CLOSED: str = "isClosed"
    IS_EXECUTABLE: str = "isExecutable"
    IS_EXPANDED: str = "isExpanded"
    IS_HORIZONTAL: str = "isHorizontal"
    IS_COLLECTION: str = "isCollection"
    PROCESS_TYPE: str = "processType"
    SEQUENCE_FLOW: str = "sequenceFlow"
    CONDITION_EXPRESSION: str = "conditionExpression"
    MESSAGE_FLOW: str = "messageFlow"
    MESSAGE_FLOWS: str = "messageFlows"

    # BPMN 2.0 diagram interchange element names
    BPMN_SHAPE: str = "BPMNShape"
    BPMN_EDGE: str = "BPMNEdge"

    # BPMN 2.0 diagram interchange element attribute names
    BPMN_ELEMENT: str = "bpmnElement"
    HEIGHT: str = "height"
    WIDTH: str = "width"
    X: str = "x"
    Y: str = "y"

    # BPMN 2.0 child element names
    INCOMING_FLOW: str = "incoming"
    INCOMING_FLOW_LIST: str = "incoming_flow_list"
    OUTGOING_FLOW: str = "outgoing"
    OUTGOING_FLOW_LIST: str = "outgoing_flow_list"
    WAYPOINT: str = "waypoint"
    WAYPOINTS: str = "waypoints"

    # Additional parameter names
    TYPE: str = "type"
    EVENT_DEFINITIONS: str = "event_definitions"
    NODE_IDS: str = "node_ids"
    DEFINITION_TYPE: str = "definition_type"
