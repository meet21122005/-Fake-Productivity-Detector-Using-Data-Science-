#!/usr/bin/env bash
# ============================================================================
# Fake Productivity Detector - Setup Script (Linux / macOS)
# ============================================================================
# Usage:  chmod +x setup.sh && ./setup.sh
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=============================================="
echo " Fake Productivity Detector - Setup"
echo "=============================================="

# ---------- 1. Frontend Dependencies ----------
echo ""
echo "[1/4] Installing frontend dependencies..."
if command -v npm &>/dev/null; then
    npm install
    echo "  -> Frontend dependencies installed."
else
    echo "  !! npm not found. Install Node.js >= 18 from https://nodejs.org"
    exit 1
fi

# ---------- 2. Python Virtual Environment ----------
echo ""
echo "[2/4] Setting up Python virtual environment..."
cd "$SCRIPT_DIR/backend"

PYTHON_CMD=""
for py in python3 python; do
    if command -v "$py" &>/dev/null; then
        PYTHON_CMD="$py"
        break
    fi
done

if [ -z "$PYTHON_CMD" ]; then
    echo "  !! Python 3.11+ not found. Install from https://python.org"
    exit 1
fi

if [ ! -d "venv" ]; then
    "$PYTHON_CMD" -m venv venv
    echo "  -> Virtual environment created."
else
    echo "  -> Virtual environment already exists."
fi

# Activate venv
source venv/bin/activate

# ---------- 3. Backend Dependencies ----------
echo ""
echo "[3/4] Installing backend dependencies..."
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo "  -> Backend dependencies installed."

# ---------- 4. Train ML Model ----------
echo ""
echo "[4/4] Training ML model (if not already trained)..."
MODEL_PATH="app/ml/models/random_forest_model.joblib"
if [ -f "$MODEL_PATH" ]; then
    echo "  -> ML model already exists. Skipping training."
else
    python -m app.ml.train_model --output-dir app/ml/models
    echo "  -> ML model trained successfully."
fi

# ---------- 5. Environment File ----------
if [ ! -f ".env" ]; then
    cp .env.example .env 2>/dev/null || true
    echo "  -> Created .env from .env.example (edit with your Supabase keys, or leave blank for in-memory mode)."
fi

cd "$SCRIPT_DIR"
if [ ! -f ".env" ]; then
    cp .env.example .env 2>/dev/null || true
fi

deactivate 2>/dev/null || true

echo ""
echo "=============================================="
echo " Setup complete!"
echo "=============================================="
echo ""
echo " To start the backend:"
echo "   cd backend && source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo " To start the frontend:"
echo "   npm run dev"
echo ""
echo " Backend: http://localhost:8000"
echo " Frontend: http://localhost:5173"
echo "=============================================="
