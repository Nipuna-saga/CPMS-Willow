from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from schemas.project import Project, ProjectCreate, ProjectUpdate
from services import project as project_service
from api.deps import get_db
from sqlalchemy.exc import NoResultFound

router = APIRouter()

@router.get("/projects/", response_model=List[Project])
def read_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    projects = project_service.get_projects(db, skip=skip, limit=limit)
    return projects

@router.post("/projects/", response_model=Project)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return project_service.create_project(db=db, project=project)

@router.get("/projects/{project_id}", response_model=Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    project = project_service.get_project(db=db, project_id=project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    try:
        return project_service.update_project(db=db, project_id=project_id, project_update=project)
    except NoResultFound as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/projects/{project_id}", response_model=Project)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    try:
        return project_service.delete_project(db=db, project_id=project_id)
    except NoResultFound as e:
        raise HTTPException(status_code=404, detail=str(e))

