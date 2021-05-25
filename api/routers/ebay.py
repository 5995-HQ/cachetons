from fastapi import APIRouter, Depends, HTTPException

# from ..dependencies import get_token_header

router = APIRouter(
    prefix="/api/v1/ebay",
    tags=["ebay"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_ebay():
    return {"ebay_results": {}}
