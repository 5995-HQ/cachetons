import requests
import logging
import http.client

from bs4 import BeautifulSoup as bs
from fastapi import APIRouter, HTTPException

http.client.HTTPConnection.debuglevel = 1

router = APIRouter()

""" Make a request like this:  Example: http://127.0.0.1:5000/api/v1/ebay?subject=beer+brewing+equipment """
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True


@router.get("/")
async def get_name():
    return {"data": 
                
                "Craigslist"
            }
