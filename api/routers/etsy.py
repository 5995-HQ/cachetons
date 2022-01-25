import http.client
import logging
import requests
import re
import time

from bs4 import BeautifulSoup as bs
from .. import constants
from collections import OrderedDict
from dataclasses import dataclass, field
from datetime import date
from fastapi import APIRouter, HTTPException
from selenium import webdriver
from requests.api import get, post
from utils.words import random_word

http.client.HTTPConnection.debuglevel = 1

router = APIRouter()

""" Make a request like this:  Example: http://127.0.0.1:5000/api/v1/etsy?subject=beer+brewing+equipment """
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True


@router.get("/api/v1/etsy")
async def get_name(subject: str = ""):
    if subject == "":
        subject = random_word()
    options = webdriver.FirefoxOptions()
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--incognito")
    options.add_argument("--headless")
    driver = webdriver.Firefox(executable_path="/opt/geckodriver", options=options)
    full_product = []
    # subject = "Quilting things"
    result_subject = f"https://www.etsy.com/search?q={subject}&order=most_relevant&view_type=gallery".replace(" ", "+")
    # link = result_subject
    driver.get(result_subject)
    time.sleep(1)
    page_source = driver.page_source
    content_soup = bs(page_source, "html.parser")
    list_assets = list(content_soup.find_all("ul", class_="wt-grid"))
    price_list = []
    list_of_images = []
    list_of_titles = []
    list_of_links = []
    index = 0
    for title in list_assets:
        for tit in title.find_all("h3", class_="wt-text-caption"):
            list_of_titles.append(tit.text)

    for item in list_assets:
        for img in item.find_all("div", class_="placeholder-content"):
            list_of_images.append(img.find("img")["src"])

    for money in list_assets:
        for price in money.find_all("span", class_="currency-value"):
            price_list.append(price.text)

    for item in list_assets:
        for li in item.find_all("div", class_="v2-listing-card"):
            list_of_links.append(li.find("a", class_="listing-link")["href"])

    for item, image, money, link_ in zip(list_of_titles, list_of_images, price_list, list_of_links):
        title = item.title()
        clean_title_string = re.sub("\W+", " ", title)
        image = image
        price = money
        link_ = link_
        index +=1
        full_product.append(
            dict(
                id=index,
                image=image,
                price=price,
                title=clean_title_string,
                link_=link_,
            )
        )
    return {"results": [product for product in full_product]}
