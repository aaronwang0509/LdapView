#!/bin/bash
set -e

echo "Starting LdapView service..."

cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Start the backend service
uvicorn main:app --host 0.0.0.0 --port 8000
