import requests
from bs4 import BeautifulSoup as bs
from fastapi import APIRouter, HTTPException


router = APIRouter()


@router.get("/api/v1/ebay")
async def get_name(subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    result_subject = f"https://www.ebay.com/sch/i.html?_from=R40&_nkw={subject}&_sacat=0&_ipg=192"
    link = result_subject.replace(" ", "+")

    r = requests.get(link, headers=headers)
    content_lxml = bs(r.content, "lxml")
    content_soup = bs(r.content, "html.parser")
    #  TODO: Regex to find the sku for this site.
    ebay_rows = content_soup.find_all("li", class_="s-item")
    list_assets = list(content_lxml.select(".s-item__image-section"))
    list_of_images = [item.find("img")["src"] for item in list_assets]
    list_of_titles = [item.find("img")["alt"] for item in list_assets]

    full_product = []
    for item, image, row_subject in zip(list_of_titles, list_of_images, ebay_rows):
        title = item.title()
        # image = image
        price = row_subject.find("span", class_="s-item__price").text
        link_ = row_subject.find("a")["href"]
        # for price, link in zip(ebay_rows):
        #     price = price.find("span", class_="s-item__price").text
        #     full_product.append(
        dict(
            image=image,
            price=price,
            title=title,
            link_=link_,
        )

    print(link)
    print(full_product)
    return {"results": [product for product in full_product]}
