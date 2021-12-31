from setuptools import find_packages, setup

from api.__version__ import version

exclude_dirs = ["venv", "ENV"]

with open("README.md") as f:
    readme = f.read()

production_requires = [
    "appdirs",
    "lxml",
    "beautifulsoup4",
    "black",
    "bs4",
    "certifi",
    "chardet",
    "click",
    "fastapi",
    "h11",
    "httptools",
    "idna",
    "mypy-extensions",
    "pathspec",
    "pydantic",
    "python-dotenv",
    "PyYAML",
    "regex",
    "requests",
    "soupsieve",
    "starlette",
    "toml",
    "typing-extensions",
    "urllib3",
    "uvicorn",
    "uvloop",
    "watchgod",
    "websockets",
    "selenium",
]

dev_requires = ["black", "flake8"]

setup(
    name="Cachetons",
    version=version,
    author="Fernando Garcia",
    author_email="odnanrefdev@gmail.com",
    license="None I guess",
    description="A collector of sorts all of the things",
    long_description=readme,
    packages=find_packages(exclude=exclude_dirs),
    include_package_data=True,
    platforms="any",
    install_requires=production_requires,
    zip_safe=False,
    extras_require={"dev": dev_requires},
)
