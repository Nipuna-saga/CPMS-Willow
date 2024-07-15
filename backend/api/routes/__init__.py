from fastapi import APIRouter
from api.routes import hello, projects

router = APIRouter()
router.include_router(hello.router, prefix="/hello", tags=["hello"])
router.include_router(projects.router, prefix="/projects", tags=["projects"])
