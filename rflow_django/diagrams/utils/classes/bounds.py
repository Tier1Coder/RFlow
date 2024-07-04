"""
    Bounds contain coordinates (x, y) and dimensions (width, height) of an element of BPMN Diagram.

    Note that the bounds’ x and y coordinates are the position of the upper left corner of the label
    (relative to the upper left corner of the plane).

"""

from dataclasses import dataclass


@dataclass
class Bounds:
    x: float
    y: float
    width: float
    height: float
