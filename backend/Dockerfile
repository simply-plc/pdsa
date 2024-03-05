# Select a base image that includes Python
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set up a working directory in the container for your application
WORKDIR /app

# Copy the backend code into the container
COPY . /app

# Install any Python dependencies listed in 'requirements.txt'
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Set the command to run your application
# (Be sure to replace './your_app_script.py' with the relative path to the Python file that starts your application)
CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]