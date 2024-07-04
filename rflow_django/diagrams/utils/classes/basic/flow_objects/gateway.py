"""


"""


#  TODO
from dataclasses import dataclass
from enum import Enum
from typing import Optional
from rflow_django.diagrams.utils.classes.base_element import BaseElement


class GatewayDirection(Enum):
    UNSPECIFIED = 'Unspecified'  # MAY have any number of incoming and outgoing Sequence Flows.
    CONVERGING = 'Converging'  # MAY have multiple incoming Sequence Flows but MUST have no more than one (1) outgoing Sequence Flow.
    DIVERGING = 'Diverging'  # MAY have multiple outgoingSequence Flows but MUST have no more than one (1) incoming Sequence Flow.
    MIXED = 'Mixed'  # Contains multiple outgoing and multiple incoming Sequence Flows.


class EventGatewayType(Enum):
    EXCLUSIVE = 'Exclusive'
    PARALLEL = 'Parallel'


@dataclass
class Gateway(BaseElement):
    id: Optional[str]
    name: Optional[str]
    type: str
    direction: GatewayDirection
    # itd.


@dataclass
class EventBasedGateway(Gateway):
    instantiate: Optional[bool] = False  # When true, receipt of one of the Events will instantiate the Process instance
    event_gateway_type: Optional[EventGatewayType] = None

