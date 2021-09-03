import api
import re
import requests

from bs4 import BeautifulSoup as bs
from dataclasses import dataclass, field
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
def geo_loc():
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
async def get_name(page: int = 0, subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    page = page * 120
    result_subject = f"https://{geo_loc()}.craigslist.org/d/for-sale/search/sss?{page}&query={subject}"
    link = result_subject.replace(" ", "+")  # should use urljoin here. 

    r = requests.get(link, headers=headers)
    content_soup = bs(r.text, "html.parser")
    #  TODO: Regex to find the sku for this site.
    craigslist_rows = content_soup.find_all("li", class_="result-row")
    index = 0
    for post in craigslist_rows:
        post_title = post.find(class_="result-title").text
        post_url = post.find("a").get("href")
        if post.find(class_="result-price"):
            post_price = post.find(class_="result-price").text
            if post_price == "$0":
                post_price = "Click for price info"
        else:
            post_price = "Click for price info" 
        
        if post.find(class_="result-image").get("data-ids"):
            post_image = post.find(class_="result-image").get("data-ids").split(",")[0].split(":")[1]
            image_url = f"https://images.craigslist.org/{post_image}_300x300.jpg"
        else:
            image_url = "0000" # Tell the api to use a default image.
        post_result.append(dict(id=+index, title=post_title, link_=post_url, price=post_price, image=image_url))

    return {"results": [product for product in post_result]}

@router.get("/api/v1/craigslist/{id}")
async def get_product(id: int):
    id = [post_result[id][f"{id}"] if post_result[id]["id"] == id else 0000 for post_result in post_result]
    return {"results": [id if id and not 0 else "No id found"]}



"""
    list_assets = list(content_lxml.select(".result-image[data-ids]"))
    ids = [item["data-ids"].replace("1:", "").replace("3:", "").split(",")[0] for item in list_assets]

    list_of_images = [image_url.format(j) for i in ids for j in i.split(",")]
    full_product = []
    index=0
    for item, image in zip(craigslist_rows, list_of_images):
        price = item.a.text.strip()
        meta_title = item.find("a", class_="result-title hdrlnk")
        title = meta_title.text
        clean_title_string = re.sub("\W+", " ", title)
        link_ = meta_title["href"]
        index +=1
        if price == "":
            price = "Click for price"
        full_product.append(
            dict(
                id=index,
                image=image,
                price=price,
                title=clean_title_string,
                link_=link_,
            )
        )
    final_post = []
title = post.find(class_="result-title").text

>>> craigslist_rows = content_soup.find_all("li", {"class": "result-row"})
>>> for post in craigslist_rows:
     title = post.find(class_="result-title")
     print(title)

>>> 
final_post = []
for post in craigslist_rows:
    post_title = post.find(class_="result-title").text
    post_url = post.find("a").get("href")
    if post.find(class_="result-price"):
        post_price = post.find(class_="result-price").text
        if post_price == "$0":
            post_price = "Click for price info"
    else:
        post_price = "Click for price info" 
    
    if post.find(class_="result-image").get("data-ids"):
        post_image = post.find(class_="result-image").get("data-ids").split(",")[0].split(":")[1]   
    else:
        post_image = "NO IMAGE"
    final_post.append(dict(title=post_title, url=post_url, price=post_price, image=post_image))
print(final_post) 


"""

