param(
  [Parameter(Mandatory=$true)][string]$Destination,
  [string]$Source = "$PSScriptRoot\..",
  [switch]$VerboseOutput
)

Write-Host "Backing up from: $Source" -ForegroundColor Cyan
Write-Host "To destination: $Destination" -ForegroundColor Cyan

if (!(Test-Path -Path $Destination)) {
  New-Item -ItemType Directory -Force -Path $Destination | Out-Null
}

# Exclude heavy/artifact folders
$excludeDirs = @('node_modules','dist','build','.git','.github','.vercel');

$robocopyArgs = @(
  '"' + $Source + '"',
  '"' + $Destination + '"',
  '*.*',
  '/E',
  '/NFL','/NDL','/NJH','/NJS','/NC','/NS'
);

foreach ($dir in $excludeDirs) { $robocopyArgs += @('/XD', $dir) }

if ($VerboseOutput) { Write-Host "Robocopy args: $robocopyArgs" -ForegroundColor DarkGray }

robocopy @robocopyArgs | Out-Null

$count = (Get-ChildItem -Path $Destination -Recurse -Force | Measure-Object).Count
Write-Host "Backup complete. Files in destination: $count" -ForegroundColor Green

Write-Host "Tip: Re-run with: powershell -File scripts/backup.ps1 -Destination 'C:\\Users\\Pichau\\Desktop\\Site Revela - Backup'" -ForegroundColor Yellow
