from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from db.models.project import Project, Site
from schemas.project import ProjectCreate, ProjectUpdate, SiteCreate


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
            if key == "phase" and value is not None:
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


def create_site(db: Session, site: SiteCreate, project_id: int):
    print(site, "FFFFF")
    db_site = Site(**site.dict(), project_id=project_id)
    db.add(db_site)
    db.commit()
    db.refresh(db_site)

    return db_site


def delete_site(db: Session, project_id: int, site_id: int):
    site = (
        db.query(Site).filter(Site.id == site_id, Site.project_id == project_id).first()
    )
    if site:
        db.delete(site)
        db.commit()
        return site
    return None


def update_site(db: Session, project_id: int, site_id: int, site_update: SiteCreate):
    site = (
        db.query(Site).filter(Site.id == site_id, Site.project_id == project_id).first()
    )
    if site:
        for key, value in site_update.dict(exclude_unset=True).items():
            setattr(site, key, value)
        db.commit()
        db.refresh(site)
        return site
    return None
