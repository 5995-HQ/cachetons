import api
from datetime import datetime
import re
import requests
import time
import uuid


from bs4 import BeautifulSoup as bs
from collections import OrderedDict
from dataclasses import dataclass, field
from datetime import date
from fastapi import APIRouter, HTTPException  #  Depends,
from requests.api import get, post

@dataclass
class Item:
    id: str
    price: float
    image: str
    title: str
    link_: str

post_result = []
def geo_loc_from_header():
    """
    :return: your geo location for the craigslist search
    """
    headers = {"User-Agent": "Mozilla/5.0"}
    url = 'https://www.craigslist.org'
    response = requests.get(url, headers=headers)
    region_tag = response.headers["Set-Cookie"].split()[0].replace("cl_def_hp=","").replace(";","")
    return region_tag

router = APIRouter()
""" Make a request like this:  Example: http://127.0.0.1:5000/api/v1/craigslist?page=1&subject=beer+brewing+equipment """

@router.get("/api/v1/craigslist")
async def get_name(page: int = 120, subject: str = ""):
    global post_result
    page = 120
    headers = {"User-Agent": "Mozilla/5.0"}
    result_subject = f"https://{geo_loc_from_header()}.craigslist.org/d/for-sale/search/sss?{page}&query={subject}"
    link = result_subject.replace(" ", "+")  # should use urljoin here. 

    r = requests.get(link, headers=headers)
    content_soup = bs(r.text, "html.parser")
    #  TODO: Regex to find the sku for this site.
    craigslist_rows = content_soup.find_all("li", class_="result-row")
    for post in craigslist_rows:
        post_title = post.find(class_="result-title").text
        post_url = post.find("a").get("href")
        if post.find(class_="result-price"):
            post_price = post.find(class_="result-price").text
            if post_price == "$0":
                post_price = "Click for price info"
        else:
            post_price = "Click for price info" 
        
        if post.find(class_="result-date"):
            found_date = post.find(class_="result-date").text
            frmt_time = datetime.strptime(found_date, "%b %d")
            post_date = datetime.strftime(frmt_time, "%b %d")

            

        if post.find(class_="result-image").get("data-ids"):
            post_image = post.find(class_="result-image").get("data-ids").split(",")[0].split(":")[1]
            image_url = f"https://images.craigslist.org/{post_image}_300x300.jpg"
        else:
            image_url = "0000" # Tell the api to use a default image.
        
    
        post_result.append(dict(id=(uuid.uuid4().hex), title=post_title, link_=post_url, price=post_price, image=image_url, date=post_date))

    return {"results": tuple([product for product in post_result]) if post_result else "No results found"}
        

@router.get("/api/v1/craigslist/{product_id}")
async def get_product(product_id):
    global post_result
    # print(post_result)
    print(f"{product_id}")
    value = (list(filter(lambda x:x["id"]==f"{product_id}",post_result)))
    print(value)
    return {"results": value if value else "No id found"}
    

@router.get("/api/v1/craigslist/results&sorted")
async def sort_results():
    global post_result
    ordered = OrderedDict(sorted(post_result["results"].items()))
    print(ordered)
    return {"results": ordered if ordered else "No results found"}
