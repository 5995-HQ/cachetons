from fastapi import Depends, FastAPI

# from api.dependencies import get_query_token, get_token_header

# from .internal import admin
from api.routers import craigslist, ebay
from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(dependencies=[Depends(get_query_token)])
app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(craigslist.router)
app.include_router(ebay.router)
# app.include_router(
#     admin.router,
#     prefix="/admin",
#     tags=["admin"],
#     dependencies=[Depends(get_token_header)],
#     responses={418: {"description": "I'm a teapot"}},
# )
