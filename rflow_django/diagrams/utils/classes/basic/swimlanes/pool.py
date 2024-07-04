"""
    A Pool is the graphical representation of a Participant in a Collaboration. A Participant can be a
    specific PartnerEntity (e.g., a company) or can be a more general PartnerRole (e.g., a buyer, seller, or
    manufacturer). A Pool is used to group process elements that user performs.
    A Pool MAY or MAY NOT reference a Process.
    A Pool is NOT REQUIRED to contain a Process, i.e., it can be a “black box.”

"""

from dataclasses import dataclass
from typing import Optional
from rflow_django.diagrams.utils.classes.bounds import Bounds
from rflow_django.diagrams.utils.classes.base_element import BaseElement


@dataclass
class Pool(BaseElement):
    name: Optional[str] = None
    processRef: Optional[str] = None
    isHorizontal: Optional[bool] = True
    bounds: Optional[Bounds] = None
