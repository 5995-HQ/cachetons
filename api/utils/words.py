import requests
import random

def random_word():
    word_site = "https://www.mit.edu/~ecprice/wordlist.10000"
    response = requests.get(word_site)
    txt = response.text
    WORDS = txt.splitlines()
    return random.choice(WORDS)


