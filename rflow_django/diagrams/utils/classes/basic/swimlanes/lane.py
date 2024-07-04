"""
    A Lane is a sub-partition within a Process (often within a Pool) and will extend the entire length of the Process
    level, either vertically or horizontally.

"""

from dataclasses import dataclass, field
from typing import Optional, List
from rflow_django.diagrams.utils.classes.bounds import Bounds
from rflow_django.diagrams.utils.classes.base_element import BaseElement


@dataclass
class Lane(BaseElement):
    name: Optional[str] = None
    flowNodeRefs: List[str] = field(default_factory=list)
    bounds: Optional[Bounds] = None
    isHorizontal: Optional[bool] = True
