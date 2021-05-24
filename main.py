import requests
import uuid


from typing import Optional
from bs4 import BeautifulSoup as bs
from fastapi import FastAPI

app = FastAPI()

# TODO: Find a way to specify which city you want to search.
@app.get("/cities/")
def read_item():
    return {"city": ""}


""" You can specify a page number and a subject. Use '+' instead of space. 
 Example: http://127.0.0.1:8000/?page=1&subject=beer+brewing+equipment """


@app.get("/")
async def get_craigslist(page: int = 0, subject: str = ""):
    blank_subject = f"https://sfbay.craigslist.org/search/sss?query={subject}&purveyor-input=all"
    result_subject = f"https://sfbay.craigslist.org/d/for-sale/search/sss?{page}&query={subject}&sort=date"
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    if page == 0 and subject:
        link = blank_subject
    elif page != 0 and subject:
        page = page * 120
        link = result_subject
    else:
        print("Error")

    r = requests.get(link, headers=headers)
    soup = bs(r.text, "html.parser")
    #  TODO: Regex to find the sku for this site.
    rows = soup.find_all("li", class_="result-row")
    full_product = []
    for item in rows:
        price = item.a.text.strip()
        time_meta = item.find("time", class_="result-date")
        time = time_meta["datetime"]
        meta_title = item.find("a", class_="result-title hdrlnk")
        title = meta_title.text
        link_ = meta_title["href"]
        full_product.append(
            dict(
                price=price,
                time=time,
                title=title,
                link_=link_,
                uuid=uuid.uuid1(),
            )
        )
    return {"craigslist_result": [product for product in full_product]}


# TODO: Grab a specific item
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
