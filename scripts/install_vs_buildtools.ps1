# PowerShell script to install Visual Studio Build Tools via winget (requires admin)
# Run as Administrator

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host "winget not found. Please install the App Installer from Microsoft Store or use Chocolatey to install build tools manually." -ForegroundColor Yellow
  exit 1
}

Write-Host "Installing Visual Studio 2022 Build Tools (C++ workload) via winget..." -ForegroundColor Cyan
winget install --id Microsoft.VisualStudio.2022.BuildTools -e --silent

Write-Host "If installation succeeded, restart PowerShell and run: `pip install -r backend/requirements.txt`" -ForegroundColor Green
