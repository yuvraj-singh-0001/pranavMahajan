Add-Type -AssemblyName System.Drawing

$width = 2880
$height = 1440

$finalBmp = New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($finalBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$imgPaths = @(
    'client/public/images/health_exercise.jpg',
    'client/public/images/health_pushups.jpg',
    'client/public/images/health_yoga.jpg',
    'client/public/images/health_meditation.jpg'
)

$imgs = @()
foreach ($p in $imgPaths) {
    if (Test-Path $p) {
        $imgs += [System.Drawing.Bitmap]::FromFile((Resolve-Path $p))
    }
}

Write-Output ("Loaded " + $imgs.Count + " images.")

# We scale each image to height 1440 and proportional width
$scaledBmps = @()
for ($i = 0; $i -lt $imgs.Count; $i++) {
    $src = $imgs[$i]
    $scaleRatio = $height / [double]$src.Height
    $scaledW = [int]($src.Width * $scaleRatio)
    
    $sb = New-Object System.Drawing.Bitmap $scaledW, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $sg = [System.Drawing.Graphics]::FromImage($sb)
    $sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $sg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $sg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $sg.DrawImage($src, 0, 0, $scaledW, $height)
    $sg.Dispose()
    
    $scaledBmps += $sb
}

# Draw base image 0 (Youth Running, Age ~13-18)
$g.DrawImage($scaledBmps[0], 0, 0)

# Overlap positions and 280px smooth cosine feathering
$segmentStarts = @(0, 720, 1440, 2160)
$featherWidth = 280

for ($i = 1; $i -lt $scaledBmps.Count; $i++) {
    $xPos = $segmentStarts[$i]
    $currBmp = $scaledBmps[$i]
    
    $featheredBmp = New-Object System.Drawing.Bitmap $currBmp.Width, $currBmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $fg = [System.Drawing.Graphics]::FromImage($featheredBmp)
    $fg.DrawImage($currBmp, 0, 0)
    $fg.Dispose()
    
    $rect = New-Object System.Drawing.Rectangle 0, 0, $featherWidth, $height
    $data = $featheredBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $stride = $data.Stride
    $ptr = $data.Scan0
    $numBytes = $stride * $height
    $bytes = New-Object byte[] $numBytes
    [System.Runtime.InteropServices.Marshal]::Copy($ptr, $bytes, 0, $numBytes)
    
    for ($y = 0; $y -lt $height; $y++) {
        $rowOffset = $y * $stride
        for ($x = 0; $x -lt $featherWidth; $x++) {
            $pxOffset = $rowOffset + ($x * 4)
            $progress = [double]$x / [double]$featherWidth
            $factor = 0.5 - 0.5 * [Math]::Cos($progress * [Math]::PI)
            
            $origAlpha = $bytes[$pxOffset + 3]
            $bytes[$pxOffset + 3] = [byte]([Math]::Round($origAlpha * $factor))
        }
    }
    
    [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $ptr, $numBytes)
    $featheredBmp.UnlockBits($data)
    
    $g.DrawImage($featheredBmp, $xPos, 0)
    $featheredBmp.Dispose()
}

# 1. Warm morning dawn golden glow across whole panorama
$ptStart = New-Object System.Drawing.Point 0, 0
$ptEnd = New-Object System.Drawing.Point 0, $height
$warmGlow = New-Object System.Drawing.Drawing2D.LinearGradientBrush $ptStart, $ptEnd, ([System.Drawing.Color]::FromArgb(35, 255, 235, 195)), ([System.Drawing.Color]::FromArgb(60, 240, 248, 244))
$g.FillRectangle($warmGlow, 0, 0, $width, $height)
$warmGlow.Dispose()

# 2. Organic bottom-to-top editorial vignette for effortless foreground text readability
$vignetteStartY = [int]($height * 0.45)
$ptVStart = New-Object System.Drawing.Point 0, $vignetteStartY
$ptVEnd = New-Object System.Drawing.Point 0, $height
$bottomVignette = New-Object System.Drawing.Drawing2D.LinearGradientBrush $ptVStart, $ptVEnd, ([System.Drawing.Color]::FromArgb(0, 243, 249, 245)), ([System.Drawing.Color]::FromArgb(180, 243, 249, 245))
$g.FillRectangle($bottomVignette, 0, $vignetteStartY, $width, [int]($height - $vignetteStartY))
$bottomVignette.Dispose()

# Save final composite
$outPath = Resolve-Path 'client/public/health-wellbeing-hero.jpg'
$finalBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

Write-Output ("Saved perfectly blended panorama to: " + $outPath)

$g.Dispose()
$finalBmp.Dispose()
foreach ($sb in $scaledBmps) { $sb.Dispose() }
foreach ($i in $imgs) { $i.Dispose() }
