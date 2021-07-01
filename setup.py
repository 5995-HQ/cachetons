from setuptools import find_packages, setup

from src.version import __version__

exclude_dirs = ["venv", "ENV"]

with open("README.md") as f:
    readme = f.read()

production_requires = [
    "appdirs==1.4.4",
    "lxml==4.6.3",
    "beautifulsoup4==4.9.3",
    "black==21.4b0",
    "bs4==0.0.1",
    "certifi==2020.12.5",
    "chardet==4.0.0",
    "click==7.1.2",
    "fastapi==0.63.0",
    "h11==0.12.0",
    "httptools==0.1.1",
    "idna==2.10",
    "mypy-extensions==0.4.3",
    "pathspec==0.8.1",
    "pydantic==1.8.1",
    "python-dotenv==0.17.0",
    "PyYAML==5.4.1",
    "regex==2021.4.4",
    "requests==2.25.1",
    "soupsieve==2.2.1",
    "starlette==0.13.6",
    "toml==0.10.2",
    "typing-extensions==3.7.4.3",
    "urllib3==1.26.4",
    "uvicorn==0.13.4",
    "uvloop==0.15.2",
    "watchgod==0.7",
    "websockets==8.1",
    "selenium==3.141.0",
]

dev_requires = ["black", "flake8"]

setup(
    name="Cachetons",
    version=__version__,
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
