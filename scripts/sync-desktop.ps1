Param(
  [string]$Source = "C:\Users\Pichau\Documents\GitHub\Site-Revela",
  [string]$Dest = "C:\Users\Pichau\Desktop\Site Revela"
)
Write-Host "Syncing from '$Source' to '$Dest'..." -ForegroundColor Cyan
Copy-Item -Path "$Source\*" -Destination "$Dest" -Recurse -Force
Write-Host "Sync complete." -ForegroundColor Green
