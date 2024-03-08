import uvicorn
import random
from typing import Annotated
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models, schemas, auth
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# These lines are added for CORS
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)


@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)]
):
    return current_user


@app.get("/secretdata/")
async def secret_data(
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)]
):
    return {"secret": f"this is super sensitive data: {random.randint(1, 1000)}"}


if __name__ == "__main__":
    uvicorn.run(app, port=8000, host="127.0.0.1")
