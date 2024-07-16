from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class ProjectPhase(str, Enum):
    PLANNING = "Planning"
    DESIGN = "Design"
    SITE_PREPARATION = "Site Preparation"
    FOUNDATION_WORK = "Foundation Work"
    STRUCTURAL_CONSTRUCTION = "Structural Construction"
    EXTERIOR_WORK = "Exterior Work"
    INTERIOR_CONSTRUCTION = "Interior Construction"
    FINISHING_WORK = "Finishing Work"
    INSPECTION_TESTING_HANDOVER = "Inspection, Testing, and Handover"
    COMMISSIONING = "Commissioning"
    OPERATIONAL = "Operational"
    EXPANSION_UPGRADES = "Expansion and Upgrades"


class SiteBase(BaseModel):
    name: str
    description: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SiteCreate(SiteBase):
    pass


class Site(SiteBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True


class ProjectBase(BaseModel):
    name: str
    description: str
    phase: ProjectPhase
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    name: Optional[str] = None
    description: Optional[str] = None
    phase: Optional[ProjectPhase] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class Project(ProjectBase):
    id: int
    sites: List[Site] = []

    class Config:
        orm_mode = True
