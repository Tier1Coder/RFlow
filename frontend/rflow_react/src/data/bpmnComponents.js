/* -BPMN Shapes- */

// artifacts
import TextAnnotationIcon from '../assets/visualization/bpmn-shapes/artifacts/TextAnnotationIcon.tsx';
// call activities
// call choreographies
// choreography participant bands
// choreography tasks
// collapsed ad hoc sub-processes
// collapsed call activities
import CallActivityCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-call-activities/CallActivityCollapsedIcon.tsx';
// collapsed call choreographies
// collapsed event sub-processes
import NonInterruptingMessageEventSubProcessCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-event-sub-processes/NonInterruptingMessageEventSubProcessCollapsedIcon.tsx';
// collapsed sub-choreographies
// collapsed sub-processes
import SubProcessCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-sub-processes/SubProcessCollapsedIcon.tsx';
// collapsed transactions
// conversations
// data
import DataInputIcon from '../assets/visualization/bpmn-shapes/data/DataInputIcon.tsx';
import DataObjectIcon from '../assets/visualization/bpmn-shapes/data/DataObjectIcon.tsx';
import DataOutputIcon from '../assets/visualization/bpmn-shapes/data/DataOutputIcon.tsx';
import DataStoreReferenceIcon from '../assets/visualization/bpmn-shapes/data/DataStoreReferenceIcon.tsx';
// events
import NoneStartEventIcon from '../assets/visualization/bpmn-shapes/events/NoneStartEventIcon.tsx';
import NonInterruptingMessageStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingMessageStartEventIcon.tsx';
import TimerIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/TimerIntermediateEventIcon.tsx';
import CatchSignalIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/CatchSignalIntermediateEventIcon.tsx';
import NoneEndEventIcon from '../assets/visualization/bpmn-shapes/events/NoneEndEventIcon.tsx';
import TerminateEndEventIcon from '../assets/visualization/bpmn-shapes/events/TerminateEndEventIcon.tsx';
import InterruptingNoneIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingNoneIntermediateEventIcon.tsx';
import ThrowCompensationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/ThrowCompensationIntermediateEventIcon.tsx';
import InterruptingBoundaryTimerIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingBoundaryTimerIntermediateEventIcon.tsx';
import MessageEndEventIcon from '../assets/visualization/bpmn-shapes/events/MessageEndEventIcon.tsx';
import NonInterruptingTimerStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingTimerStartEventIcon.tsx';
import InterruptingTimerStartEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingTimerStartEventIcon.tsx';
import BoundaryCatchErrorIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/BoundaryCatchErrorIntermediateEventIcon.tsx';
import BoundaryCatchCompensationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/BoundaryCatchCompensationIntermediateEventIcon.tsx';
import NonInterruptingConditionalStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingConditionalStartEventIcon.tsx';
import ErrorEndEventIcon from '../assets/visualization/bpmn-shapes/events/ErrorEndEventIcon.tsx';
import ThrowEscalationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/ThrowEscalationIntermediateEventIcon.tsx';
import NonInterruptingBoundaryCatchEscalationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingBoundaryCatchEscalationIntermediateEventIcon.tsx';
// expanded ad hoc sub-processes
// expanded call activities
// expanded call choreographies
// expanded event sub-processes
// expanded sub-choreographies
// expanded sub-processes
// expanded transactions
// gateways
import InclusiveGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/InclusiveGatewayIcon.tsx';
import ParallelGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/ParallelGatewayIcon.tsx';
import ExclusiveGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/ExclusiveGatewayIcon.tsx';
import ExclusiveGatewayWithMarkerIcon from '../assets/visualization/bpmn-shapes/gateways/ExclusiveGatewayWithMarkerIcon.tsx';
import EventBasedGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/EventBasedGatewayIcon.tsx';
// lanes
import HorizontalLaneIcon from '../assets/visualization/bpmn-shapes/lanes/HorizontalLaneIcon.tsx';
// loop markers
// pools
import HorizontalPoolIcon from '../assets/visualization/bpmn-shapes/pools/HorizontalPoolIcon.tsx';
// tasks
import AbstractTaskIcon from '../assets/visualization/bpmn-shapes/tasks/AbstractTaskIcon.tsx';
import SendTaskIcon from '../assets/visualization/bpmn-shapes/tasks/SendTaskIcon.tsx';
import ScriptTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ScriptTaskIcon.tsx';
import UserTaskIcon from '../assets/visualization/bpmn-shapes/tasks/UserTaskIcon.tsx';
import ServiceTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ServiceTaskIcon.tsx';
import ReceiveTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ReceiveTaskIcon.tsx';


/* -BPMN Edges- */

// connecting objects
import SequenceFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/SequenceFlowIcon.tsx';
import AssociationIcon from '../assets/visualization/bpmn-edges/connecting-objects/AssociationIcon.tsx';
import MessageFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/MessageFlowIcon.tsx';
import DataInputAssociationFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/DataInputAssociationFlowIcon.tsx'; // Directed data association
import DataOutputAssociationFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/DataOutputAssociationFlowIcon.tsx'; // Directed data association


const bpmnShapesComponents = {
    // artifacts
    textAnnotation: TextAnnotationIcon,
    // call activities
    // call choreographies
    // choreography participant bands
    // choreography tasks
    // collapsed ad hoc sub-processes
    // collapsed call activities
    callActivityCollapsed: CallActivityCollapsedIcon,
    // collapsed call choreographies
    // collapsed event sub-processes
    nonInterruptingMessageEventSubProcessCollapsed: NonInterruptingMessageEventSubProcessCollapsedIcon,
    // collapsed sub-choreographies
    // collapsed sub-processes
    subProcessCollapsed: SubProcessCollapsedIcon,
    // collapsed transactions
    // conversations
    // data
    dataInput: DataInputIcon,
    dataOutput: DataOutputIcon,
    dataObject: DataObjectIcon,
    dataStoreReference: DataStoreReferenceIcon,
    // events
    noneStartEvent: NoneStartEventIcon, 
    nonInterruptingMessageStartEvent: NonInterruptingMessageStartEventIcon,
    timerIntermediateEvent: TimerIntermediateEventIcon,
    catchSignalIntermediateEvent: CatchSignalIntermediateEventIcon,
    noneEndEvent: NoneEndEventIcon,
    terminateEndEvent: TerminateEndEventIcon,
    interruptingNoneIntermediateEvent: InterruptingNoneIntermediateEventIcon,
    throwCompensationIntermediateEvent: ThrowCompensationIntermediateEventIcon,
    interruptingBoundaryTimerIntermediateEvent: InterruptingBoundaryTimerIntermediateEventIcon,
    messageEndEvent: MessageEndEventIcon,
    nonInterruptingTimerStartEvent: NonInterruptingTimerStartEventIcon,
    interruptingTimerStartEvent: InterruptingTimerStartEventIcon,
    boundaryCatchErrorIntermediateEvent: BoundaryCatchErrorIntermediateEventIcon,
    boundaryCatchCompensationIntermediateEvent: BoundaryCatchCompensationIntermediateEventIcon,
    nonInterruptingConditionalStartEvent: NonInterruptingConditionalStartEventIcon,
    errorEndEvent: ErrorEndEventIcon,
    throwEscalationIntermediateEvent: ThrowEscalationIntermediateEventIcon,
    nonInterruptingBoundaryCatchEscalationIntermediateEvent: NonInterruptingBoundaryCatchEscalationIntermediateEventIcon,
    // expanded ad hoc sub-processes
    // expanded call activities
    // expanded call choreographies
    // expanded event sub-processes
    // expanded sub-choreographies
    // expanded sub-processes
    // expanded transactions
    // gateways
    inclusiveGateway: InclusiveGatewayIcon,
    parallelGateway: ParallelGatewayIcon,
    eventBasedGateway: EventBasedGatewayIcon,
    exclusiveGateway: ExclusiveGatewayIcon,
    exclusiveGatewayWithMarker: ExclusiveGatewayWithMarkerIcon, 
    // lanes
    horizontalLane: HorizontalLaneIcon,
    // loop markers
    // pools
    horizontalPool: HorizontalPoolIcon,
    // tasks
    abstractTask: AbstractTaskIcon,
    sendTask: SendTaskIcon,
    scriptTask: ScriptTaskIcon,
    userTask: UserTaskIcon,
    serviceTask: ServiceTaskIcon,
    receiveTask: ReceiveTaskIcon,
};

const bpmnEdgesComponents = {
    // connecting objects
    sequenceFlow: SequenceFlowIcon,
    messageFlow: MessageFlowIcon,
    dataInputAssociation: DataInputAssociationFlowIcon,
    dataOutputAssociation: DataOutputAssociationFlowIcon,
    association: AssociationIcon
}

// These elements are not used in the visualization (they are only logical and do not have a graphical representation)
const unusedElementComponents = [
    'definitions', 
    'laneSet', 
    'collaboration', 
    'BPMNDiagram', 
    'process', 
    'message',
    'dataStore'
];

export { bpmnShapesComponents, bpmnEdgesComponents, unusedElementComponents };
