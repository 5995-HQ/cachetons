import requests

from bs4 import BeautifulSoup as bs
from fastapi import APIRouter, HTTPException  #  Depends,


router = APIRouter()


# from ..dependencies import get_token_header

# router = APIRouter(
# prefix="/api/v1/craigslist",
# tags=["craigsist"],
# # dependencies=[Depends(get_token_header)],
# responses={404: {"description": "Not found"}},
# )

""" Make a request like this:  Example: http://127.0.0.1:5000/api/v1/craigslist?page=1&subject=beer+brewing+equipment """


@router.get("/api/v1/craigslist")
async def get_name(page: int = 0, subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    page = page * 120
    image_url = "https://images.craigslist.org/{}_300x300.jpg"
    result_subject = f"https://sfbay.craigslist.org/d/for-sale/search/sss?{page}&query={subject}"
    link = result_subject.replace(" ", "+")

    r = requests.get(link, headers=headers)
    content_lxml = bs(r.content, "lxml")
    content_soup = bs(r.content, "html.parser")
    #  TODO: Regex to find the sku for this site.
    craigslist_rows = content_soup.find_all("li", class_="result-row")
    list_assets = list(content_lxml.select(".result-image[data-ids]"))
    ids = [item["data-ids"].replace("1:", "").replace("3:", "").split(",")[0] for item in list_assets]

    list_of_images = [image_url.format(j) for i in ids for j in i.split(",")]
    full_product = []
    for item, image in zip(craigslist_rows, list_of_images):
        price = item.a.text.strip()
        time_meta = item.find("time", class_="result-date")
        time = time_meta["datetime"]
        meta_title = item.find("a", class_="result-title hdrlnk")
        title = meta_title.text
        link_ = meta_title["href"]
        full_product.append(
            dict(
                image=image,
                price=price,
                time=time,
                title=title,
                link_=link_,
            )
        )
    print(link)
    return {"results": [product for product in full_product]}
