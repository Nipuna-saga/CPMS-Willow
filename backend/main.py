from fastapi import FastAPI
from api.routes import router
from db import base, session
from fastapi.middleware.cors import CORSMiddleware

from services.load_data import create_initial_data

origins = [
    "http://localhost:5173",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
def on_startup():
    base.Base.metadata.create_all(bind=session.engine)
    db = session.SessionLocal()
    try:
        create_initial_data(db) 
    except Exception as e:
        print(e)
    finally:
        db.close()
    
