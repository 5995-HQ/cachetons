import requests
import re
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


@router.get("/api/v1/ebay")
async def get_name(subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    result_subject = f"https://www.ebay.com/sch/i.html?_from=R40&_nkw={subject}&_sacat=0&_ipg=192"
    link = result_subject.replace(" ", "+")

    r = requests.get(link, headers=headers, stream=True)
    content_lxml = bs(r.text, "lxml")
    content_soup = bs(r.text, "html.parser")
    #  TODO: Regex to find the sku for this site.
    ebay_rows = content_soup.find_all("li", class_="s-item")
    list_assets = list(content_lxml.select(".s-item__image-section"))
    list_of_images = []
    list_of_titles = []
    for image in list_assets:
        try:
            if image.find("img") is not None:
                list_of_images.append(image.find("img")["src"])
            else:
                pass
        except Exception as e:
            print(e)

    for item in list_assets:
        try:
            if item.find("img") is not None:
                list_of_titles.append(item.find("img")["alt"])
            else:
                pass
        except Exception as e:
            print(e)

    for item, image, row_subject in zip(list_of_titles, list_of_images, ebay_rows):
        title = item.title()
        clean_title_string = re.sub("\W+", " ", title)
        image = image

        if row_subject.find("span", class_="s-item__price") is not None:
            price = [row_subject.find("span", class_="s-item__price").text]
        else:
            price = "Click link to view price"

        link_ = row_subject.find("a")["href"]
        full_product.append(
            dict(
                image=image,
                price=price,
                title=clean_title_string,
                link_=link_,
            )
        )
    print(link)
    return {"results": [product for product in full_product]}
