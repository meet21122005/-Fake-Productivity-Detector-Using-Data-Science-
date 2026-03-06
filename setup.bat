@echo off
REM ============================================================================
REM Fake Productivity Detector - Setup Script (Windows)
REM ============================================================================
REM Usage:  setup.bat
REM ============================================================================

cd /d "%~dp0"

echo ==============================================
echo  Fake Productivity Detector - Setup
echo ==============================================

REM ---------- 1. Frontend Dependencies ----------
echo.
echo [1/4] Installing frontend dependencies...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo   !! npm not found. Install Node.js ^>= 18 from https://nodejs.org
    exit /b 1
)
call npm install
echo   -^> Frontend dependencies installed.

REM ---------- 2. Python Virtual Environment ----------
echo.
echo [2/4] Setting up Python virtual environment...
cd backend

set PYTHON_CMD=
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set PYTHON_CMD=python
) else (
    where python3 >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        set PYTHON_CMD=python3
    ) else (
        echo   !! Python 3.11+ not found. Install from https://python.org
        exit /b 1
    )
)

if not exist "venv" (
    %PYTHON_CMD% -m venv venv
    echo   -^> Virtual environment created.
) else (
    echo   -^> Virtual environment already exists.
)

REM Activate venv
call venv\Scripts\activate.bat

REM ---------- 3. Backend Dependencies ----------
echo.
echo [3/4] Installing backend dependencies...
pip install --upgrade pip -q
pip install -r requirements.txt -q
echo   -^> Backend dependencies installed.

REM ---------- 4. Train ML Model ----------
echo.
echo [4/4] Training ML model (if not already trained)...
if exist "app\ml\models\random_forest_model.joblib" (
    echo   -^> ML model already exists. Skipping training.
) else (
    python -m app.ml.train_model --output-dir app/ml/models
    echo   -^> ML model trained successfully.
)

REM ---------- 5. Environment File ----------
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
        echo   -^> Created .env from .env.example
    )
)

cd /d "%~dp0"
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env >nul
    )
)

call deactivate 2>nul

echo.
echo ==============================================
echo  Setup complete!
echo ==============================================
echo.
echo  To start the backend:
echo    cd backend ^&^& venv\Scripts\activate
echo    uvicorn app.main:app --reload
echo.
echo  To start the frontend:
echo    npm run dev
echo.
echo  Backend: http://localhost:8000
echo  Frontend: http://localhost:5173
echo ==============================================
pause
