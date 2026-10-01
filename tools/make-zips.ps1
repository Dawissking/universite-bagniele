# Genere les deux archives de publication depuis l'arborescence travaillee.
#   ubd-site.zip       : contenu statique a deposer dans public_html
#                        (copie de tools/dist, chemins relatifs a la racine)
#   projet-complet.zip : source du projet, sans .git, node_modules, tools/dist
#                        ni archives. Les entrees sont ecrites avec "/" pour
#                        rester lisibles par les outils POSIX.
param(
    [switch]$SiteOnly
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Split-Path -Parent $PSScriptRoot

function New-ZipFromList {
    param(
        [string]$ZipPath,
        [array]$Files,
        [string]$BaseDir
    )
    if (Test-Path -LiteralPath $ZipPath) { Remove-Item -LiteralPath $ZipPath -Force }
    $zip = [System.IO.Compression.ZipFile]::Open($ZipPath, "Create")
    try {
        foreach ($f in $Files) {
            $rel = $f.FullName.Substring($BaseDir.Length).TrimStart("\", "/").Replace("\", "/")
            $entry = $zip.CreateEntry($rel)
            $dest = $entry.Open()
            $src = [System.IO.File]::OpenRead($f.FullName)
            try { $src.CopyTo($dest) } finally { $src.Dispose(); $dest.Dispose() }
        }
    } finally {
        $zip.Dispose()
    }
    $size = [math]::Round((Get-Item -LiteralPath $ZipPath).Length / 1MB, 1)
    Write-Output ("{0} : {1} entrees, {2} Mo" -f (Split-Path $ZipPath -Leaf), $Files.Count, $size)
}

# --- Archive de site : tools/dist tel que produit par tools/pack.js ---
$dist = Join-Path $root "tools\dist"
if (-not (Test-Path -LiteralPath $dist)) {
    throw "tools/dist introuvable : lancer d'abord 'npm run build'."
}
$siteFiles = @(Get-ChildItem -LiteralPath $dist -Recurse -File)
New-ZipFromList -ZipPath (Join-Path $root "ubd-site.zip") -Files $siteFiles -BaseDir $dist

if ($SiteOnly) { exit 0 }

# --- Archive source : arborescence complete hors artefacts ---
$skipSegment = '(^|[\\/])(\.git|node_modules|\.vscode|site)([\\/]|$)'
$srcFiles = @(Get-ChildItem -LiteralPath $root -Recurse -File |
    Where-Object {
        $rel = $_.FullName.Substring($root.Length).TrimStart("\", "/")
        ($rel -notmatch $skipSegment) -and
        ($rel -notmatch '^tools[\\/]dist([\\/]|$)') -and
        ($_.Extension -ne ".zip") -and ($_.Extension -ne ".log") -and ($_.Name -ne ".DS_Store")
    })
New-ZipFromList -ZipPath (Join-Path $root "projet-complet.zip") -Files $srcFiles -BaseDir $root
