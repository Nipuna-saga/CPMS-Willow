from fastapi import FastAPI
from api.routes import router
from db import base, session

app = FastAPI()

app.include_router(router)

@app.on_event("startup")
def on_startup():
    base.Base.metadata.create_all(bind=session.engine)



