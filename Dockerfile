FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV SECRET_KEY=dummy-secret-key-for-build
RUN python website/manage.py collectstatic --noinput
CMD ["gunicorn", "website.wsgi:application", "--bind", "0.0.0.0:8000", "--chdir", "/app/website"]
