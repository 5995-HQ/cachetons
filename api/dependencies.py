# import os

# from fastapi import Header, HTTPException

# my_token = os.environ.get("SECRET_TOKEN")


# async def get_token_header(x_token: str = Header(...)):
#     if x_token != my_token:
#         raise HTTPException(status_code=400, detail="X-Token header invalid")


# async def get_query_token(token: str):
#     if token != my_token:
#         raise HTTPException(status_code=400, detail="No fernando token provided")
