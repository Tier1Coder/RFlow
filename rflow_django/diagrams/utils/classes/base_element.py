from dataclasses import dataclass
from typing import Optional


@dataclass
class BaseElement:
    id: Optional[str]
