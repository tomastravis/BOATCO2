# Using official python image as base
FROM python:3.10

# Establishing working directory 
WORKDIR /app

# Copy file requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Establishing PYTHONPATH
ENV PYTHONPATH /app

# Expose port FastAPI will be using
EXPOSE 8000

# Command to execute the app using run.py script
CMD ["python", "run.py"]

