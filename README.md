# cachetons
An aggregator of subjects. I don't know, this is all Francisco's idea. 

### Installing:

Create a virtual environment:
```
virtualenv venv --python=$(which python3)
```

Activate that virtualenv:
```
source venv/bin/activate
```

Install all the things.
```
pip install -e .\[dev\]
```

Run the code:
```
uvicorn main:app --reload 
```

Visit http://127.0.0.1:8000  to see the response. 

