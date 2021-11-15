import requests
import re
import logging
import http.client
import uuid

from .. import constants
from bs4 import BeautifulSoup as bs
from datetime import datetime
from fastapi import APIRouter, HTTPException

http.client.HTTPConnection.debuglevel = 1

router = APIRouter()
""" Make a request like this:  Example: http://127.0.0.1:5000/api/v1/ebay?subject=beer+brewing+equipment """
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True


@router.get("/api/v1/ebay")
async def get_name(subject: str = ""):
    if subject == "":
        subject = "beer brewing equipment"
    post_result = []
    link = f"https://www.ebay.com/sch/i.html?_from=R40&_nkw={subject}&_sacat=0&_ipg=192".replace(" ", "+")
    r = requests.get(link, headers=constants.HEADERS, stream=True)
    content_soup = bs(r.text, "html.parser")
    #  TODO: Regex to find the sku for this site.
    ebay_results_section = content_soup.find("ul", class_="srp-list")
    ebay_rows = ebay_results_section.find_all("li", class_="s-item")
    for ebay_result in ebay_rows:
        post_title = ebay_result.find("h3", class_="s-item__title").text
        post_url = ebay_result.find(class_="s-item__link").get("href")
        if ebay_result.find(class_="s-item__price"):
            post_price = ebay_result.find(class_="s-item__price").text
        else:
            post_price = "Click for price info"
        if ebay_result.find(class_="s-item__image-img").get("src"):
            post_image = ebay_result.find(class_="s-item__image-img").get("src")
        else:
            post_image = "0000"
        post_result.append(
            dict(
                id=(uuid.uuid4().hex), 
                title=post_title,
                link_=post_url,
                price=post_price, 
                image=post_image,
                date=datetime.today().strftime("%b %d")
                ))
    return {"results": tuple([product for product in post_result])}
    
