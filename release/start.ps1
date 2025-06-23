Write-Host "Starting LdapView service..."

# Navigate to backend folder
Set-Location -Path ".\backend"

# Create virtual environment if not exists
if (-Not (Test-Path -Path ".\venv")) {
    python -m venv venv
}

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Start the backend service
uvicorn main:app --host 0.0.0.0 --port 8000