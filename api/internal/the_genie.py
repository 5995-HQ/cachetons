#!/bin/python -env

# This script will hold the genie in a bottle. The genie knows where to find and build out a site.

import requests
import re
import argparse

from bs4 import BeautifulSoup as bs
from fastapi import APIRouter, HTTPException

version_str = "0.0.1"
router = APIRouter()


def genie(cfg):
    """This script will find any ul elements of a store front, search for the list of items, and search for
    image=image,
    price=price,
    title=clean_title_string,
    link_=link_,"""
    headers = {"User-Agent": "Mozilla/5.0"}
    full_product = []
    if cfg.sitelink:
        subject = "Quilting things"
        headers = {"User-Agent": "Mozilla/5.0"}
        full_product = []
        result_subject = f"https://www.etsy.com/search?q={subject}&order=most_relevant&view_type=gallery"
        link = result_subject.replace(" ", "+")
        r = requests.get(link, headers=headers, stream=True)
        content_lxml = bs(r.text, "lxml")
        content_soup = bs(r.text, "html.parser")
        monies = content_soup.find_all("ul", class_="wt-grid")


def main():
    parser = argparse.ArgumentParser(
        description="Counts the number of lines, words, and characters in file(s)",
        prog="the_genie.py",
    )
    parser.add_argument("-v", "--version", action="version", version=version_str)
    parser.add_argument("--sitelink", "-s", help="Get the content", action="store")

    config = parser.parse_args()
    genie(config)


if __name__ == "__main__":
    main()
