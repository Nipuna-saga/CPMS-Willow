from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from db.models.project import Project
from schemas.project import ProjectCreate, ProjectUpdate


def get_projects(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Project).offset(skip).limit(limit).all()


def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()


def create_project(db: Session, project: ProjectCreate):

    project.phase = project.phase.name
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project_id: int, project_update: ProjectUpdate):
    db_project = get_project(db, project_id)
    if db_project:
        for key, value in project_update.dict(exclude_unset=True).items():
            if key == 'phase' and value is not None:
                value = value.name  # Convert enum to string
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
        return db_project
    else:
        raise NoResultFound(f"Project with id {project_id} not found")


def delete_project(db: Session, project_id: int):
    db_project = get_project(db, project_id)
    if db_project:
        db.delete(db_project)
        db.commit()
        return db_project
    else:
        raise NoResultFound(f"Project with id {project_id} not found")
