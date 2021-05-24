
FROM docker.apple.com/python:3.8-slim-buster

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc libc-dev libsasl2-dev python-dev libldap2-dev libssl-dev

COPY . .
RUN pip install setuptools
RUN pip install . -i https://pypi.apple.com/simple

ENV PYTHONPATH "${PYTHONPATH}:/app"

CMD ["gunicorn", "--workers", "2", "-k", "sync", "--timeout", "1800", "main:app", "--bind", "0.0.0.0:8888"]