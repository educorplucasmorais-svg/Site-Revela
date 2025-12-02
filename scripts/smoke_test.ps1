param(
    [string]$BaseUrl = "https://example.vercel.app",
    [string]$BypassToken = "",
    [int]$TimeoutSec = 15
)

function Invoke-RevelaCheck {
    param(
        [string]$Path,
        [string[]]$Keywords
    )
    $qs = ""
    if ($BypassToken -ne "") {
        $qs = "?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=$BypassToken"
    }
    $url = "$BaseUrl$Path$qs"
    Write-Host "\n[CHECK] $url" -ForegroundColor Cyan
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec $TimeoutSec -ErrorAction Stop
        $status = $resp.StatusCode
        $content = $resp.Content
        $missing = @()
        foreach ($k in $Keywords) { if ($content -notmatch [Regex]::Escape($k)) { $missing += $k } }
        [PSCustomObject]@{
            Path = $Path
            Status = $status
            MissingKeywords = if ($missing.Count -eq 0) { "OK" } else { ($missing -join ",") }
        }
    }
    catch {
        [PSCustomObject]@{ Path = $Path; Status = "ERROR"; MissingKeywords = $_.Exception.Message }
    }
}

Write-Host "Revela Smoke Test" -ForegroundColor Green
Write-Host "BaseUrl: $BaseUrl" -ForegroundColor DarkGray
if ($BypassToken -ne "") { Write-Host "Using bypass token." -ForegroundColor DarkGray } else { Write-Host "No bypass token provided (may 401)." -ForegroundColor Yellow }

$results = @()
$results += Invoke-RevelaCheck -Path "/" -Keywords @("Hub","Pilares","Esteira","Incubadora")
$results += Invoke-RevelaCheck -Path "/pitch" -Keywords @("Investidor","Pilares","Roadmap")
$results += Invoke-RevelaCheck -Path "/kaia" -Keywords @("Kaia","App","Hub")

Write-Host "\nSummary:" -ForegroundColor Green
$results | Format-Table -AutoSize

$fail = $results | Where-Object { $_.Status -ne 200 -or $_.MissingKeywords -ne "OK" }
if ($fail.Count -eq 0) {
    Write-Host "\nAll checks passed." -ForegroundColor Green
    exit 0
} else {
    Write-Host "\nFailures detected." -ForegroundColor Red
    exit 1
}
