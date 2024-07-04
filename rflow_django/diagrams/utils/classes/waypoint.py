"""
    An edge is often depicted as a line with 2 or more points (i.e., one or more connected line segments)
    in the coordinate system, called waypoints.

"""

from dataclasses import dataclass


@dataclass
class Waypoint:
    x: float
    y: float
