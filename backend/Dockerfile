FROM python:3.9.10
ENV PYTHONBUFFERED=1
ENV PORT 8080
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app/
# --- start: For this tutorial ---
RUN python manage.py migrate
RUN cat scripts/create_example_users.py | python manage.py shell
# --- end ---
CMD gunicorn -b :8080 server.wsgi:application
EXPOSE ${PORT}