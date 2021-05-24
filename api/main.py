from fastapi import Depends, FastAPI

# from api.dependencies import get_query_token, get_token_header

# from api.internal import admin
from api.routers import craigslist, ebay

# app = FastAPI(dependencies=[Depends(get_query_token)])
app = FastAPI()


app.include_router(craigslist.router)
app.include_router(ebay.router)
# app.include_router(
#     admin.router,
#     prefix="/admin",
#     tags=["admin"],
#     dependencies=[Depends(get_token_header)],
#     responses={418: {"description": "I'm a teapot"}},
# )


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
