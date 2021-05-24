import requests


def test_reach_craigslist(result=0, subject):
    subject = f"https://sfbay.craigslist.org/search/sss?query={subject}&purveyor-input=all"
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    r = requests.get(link, headers=headers)
    assert r.status_code == 200
