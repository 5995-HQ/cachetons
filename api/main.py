
from fastapi import Depends, FastAPI
from api.routers import craigslist, ebay, etsy
from fastapi.middleware.cors import CORSMiddleware

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
app.include_router(etsy.router)