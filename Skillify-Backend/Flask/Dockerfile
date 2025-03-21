# Use Python slim image for smaller size
FROM python:3.9-slim-buster

# Set working directory
WORKDIR /app

#eeet

# Copy requirements first for better caching
COPY Skillify-Backend/Flask/requirements.txt .

# Install system dependencies and Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install gunicorn

# Copy the Flask application code
COPY Skillify-Backend/Flask /app

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Start Flask application
CMD ["python", "app.py"]
