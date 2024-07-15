from sqlalchemy import Column, Integer, String,  Float, Enum

from db.base import Base
from enum import Enum as PyEnum

class ProjectPhase(PyEnum):
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

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    phase = Column(Enum(ProjectPhase), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

