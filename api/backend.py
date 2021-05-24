import requests
import uuid


from typing import Optional
from bs4 import BeautifulSoup as bs
from fastapi import FastAPI
from api.routes import apiRoutes

app = FastAPI()
app.register_blueprint(apiRoutes, url_prefix="/api")

# TODO: Find a way to specify which city you want to search.
@app.get("/cities/")
def read_item():
    return {"city": ""}


""" You can specify a page number and a subject. Use '+' instead of space. 
 Example: http://127.0.0.1:8000/api/v1/craigslist?page=1&subject=beer+brewing+equipment """


@app.get("/api/v1/{name}")
async def get_name(name, page: int = 0, subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    if name == "craigslist":
        full_product = []
        page = page * 120
        image_url = "https://images.craigslist.org/{}_300x300.jpg"
        result_subject = f"https://sfbay.craigslist.org/d/for-sale/search/sss?{page}&query={subject}"
        link = result_subject.replace(" ", "+")

        r = requests.get(link, headers=headers)
        content_lxml = bs(r.content, "lxml")
        content_soup = bs(r.content, "html.parser")
        #  TODO: Regex to find the sku for this site.
        rows = content_soup.find_all("li", class_="result-row")
        list_assets = list(content_lxml.select(".result-image[data-ids]"))
        ids = [item[0]["data-ids"].replace("3:", "") for item in list_assets]
        list_of_images = [image_url.format(j) for i[0] in ids for j in i.split(",")]
        full_product = []
        for item, image in zip(rows, list_of_images):
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
                    uuid=uuid.uuid1(),
                )
            )
        print(page)
        print(link)
        return {"craigslist_result": [product for product in full_product]}
    if name == "ebay":
        return {"ebay_result": "{}"}


# TODO: Grab a specific item
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
