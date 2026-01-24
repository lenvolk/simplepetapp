<# 
.SYNOPSIS
    Cleanup script for MyPetVenues demo - removes application files while preserving demo infrastructure.

.DESCRIPTION
    This script prepares the repository for a fresh demo by:
    1. Removing the MyPetVenues application files (except empty project files)
    2. Preserving: .docs/, .github/, .vscode/, README.md, how2.md, NuGet.config
    3. Keeping MyPetVenues.Api/ and MyPetVenues.Shared/ as empty placeholders
    4. Resetting .docs/memory.md and .docs/report.md for fresh demo tracking

.EXAMPLE
    .\cleanup.ps1
    
.EXAMPLE
    .\cleanup.ps1 -WhatIf
    
.NOTES
    Run this script before starting a fresh demo deployment.
    The orchestrator will then use .docs/implementation.md to rebuild the app from scratch.
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [switch]$Force,
    [switch]$KeepWorktrees
)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🐾 MyPetVenues Demo Cleanup Script 🐾                    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Confirm unless -Force is specified
if (-not $Force) {
    Write-Host "⚠️  This will DELETE the MyPetVenues application files!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "The following will be PRESERVED:" -ForegroundColor Green
    Write-Host "  ✓ .docs/          (demo tasks, implementation plan, memory)"
    Write-Host "  ✓ .github/        (instructions, prompts, skills, agents)"
    Write-Host "  ✓ .vscode/        (tasks, launch config)"
    Write-Host "  ✓ README.md       (demo documentation)"
    Write-Host "  ✓ how2.md         (quick reference)"
    Write-Host "  ✓ NuGet.config    (package source)"
    Write-Host "  ✓ *.sln           (solution file)"
    Write-Host ""
    Write-Host "The following will be DELETED:" -ForegroundColor Red
    Write-Host "  ✗ MyPetVenues/Pages/*"
    Write-Host "  ✗ MyPetVenues/Components/*"
    Write-Host "  ✗ MyPetVenues/Layout/*"
    Write-Host "  ✗ MyPetVenues/Models/*"
    Write-Host "  ✗ MyPetVenues/Services/*"
    Write-Host "  ✗ MyPetVenues/wwwroot/css/*"
    Write-Host "  ✗ MyPetVenues/*.razor, Program.cs, _Imports.razor"
    Write-Host "  ✗ MyPetVenues/bin/, obj/"
    Write-Host ""
    
    $response = Read-Host "Continue? (y/N)"
    if ($response -notmatch "^[Yy]") {
        Write-Host "❌ Cleanup cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "🧹 Starting cleanup..." -ForegroundColor Cyan
Write-Host ""

# ============================================================
# STEP 1: Clean up any existing worktrees from previous demos
# ============================================================
if (-not $KeepWorktrees) {
    Write-Host "📁 Cleaning up git worktrees..." -ForegroundColor Blue
    
    $worktreeParent = Split-Path $RepoRoot -Parent
    $worktreeDirs = Get-ChildItem -Path $worktreeParent -Directory -ErrorAction SilentlyContinue | 
                    Where-Object { $_.Name -match "^(wt-|worktree-)" }
    
    foreach ($wtDir in $worktreeDirs) {
        if ($PSCmdlet.ShouldProcess($wtDir.FullName, "Remove worktree directory")) {
            Write-Host "  Removing: $($wtDir.Name)" -ForegroundColor DarkGray
            Remove-Item -LiteralPath $wtDir.FullName -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
    
    # Prune worktrees in git
    Push-Location $RepoRoot
    git worktree prune 2>$null
    
    # Clean up orphaned branches from previous demos
    $demoBranches = git branch --list "task-*" 2>$null
    foreach ($branch in $demoBranches) {
        $branchName = $branch.Trim().TrimStart("* ")
        if ($branchName -and $branchName -ne "main" -and $branchName -ne "dev-container") {
            Write-Host "  Removing branch: $branchName" -ForegroundColor DarkGray
            git branch -D $branchName 2>$null
        }
    }
    Pop-Location
    
    Write-Host "  ✓ Worktrees cleaned" -ForegroundColor Green
}

# ============================================================
# STEP 2: Remove MyPetVenues application files
# ============================================================
Write-Host "📁 Removing MyPetVenues application files..." -ForegroundColor Blue

$myPetVenuesPath = Join-Path $RepoRoot "MyPetVenues"

if (Test-Path $myPetVenuesPath) {
    # Remove specific directories
    $dirsToRemove = @(
        "Pages",
        "Components", 
        "Layout",
        "Models",
        "Services",
        "bin",
        "obj",
        "Properties"
    )
    
    foreach ($dir in $dirsToRemove) {
        $dirPath = Join-Path $myPetVenuesPath $dir
        if (Test-Path $dirPath) {
            if ($PSCmdlet.ShouldProcess($dirPath, "Remove directory")) {
                Write-Host "  Removing: MyPetVenues/$dir/" -ForegroundColor DarkGray
                Remove-Item -LiteralPath $dirPath -Recurse -Force
            }
        }
    }
    
    # Remove specific files
    $filesToRemove = @(
        "App.razor",
        "Program.cs",
        "_Imports.razor"
    )
    
    foreach ($file in $filesToRemove) {
        $filePath = Join-Path $myPetVenuesPath $file
        if (Test-Path $filePath) {
            if ($PSCmdlet.ShouldProcess($filePath, "Remove file")) {
                Write-Host "  Removing: MyPetVenues/$file" -ForegroundColor DarkGray
                Remove-Item -LiteralPath $filePath -Force
            }
        }
    }
    
    # Remove wwwroot/css contents but keep the folder structure
    $cssPath = Join-Path $myPetVenuesPath "wwwroot\css"
    if (Test-Path $cssPath) {
        if ($PSCmdlet.ShouldProcess($cssPath, "Clear CSS directory")) {
            Get-ChildItem -Path $cssPath -File | ForEach-Object {
                Write-Host "  Removing: MyPetVenues/wwwroot/css/$($_.Name)" -ForegroundColor DarkGray
                Remove-Item -LiteralPath $_.FullName -Force
            }
        }
    }
    
    # Remove wwwroot/index.html
    $indexPath = Join-Path $myPetVenuesPath "wwwroot\index.html"
    if (Test-Path $indexPath) {
        if ($PSCmdlet.ShouldProcess($indexPath, "Remove file")) {
            Write-Host "  Removing: MyPetVenues/wwwroot/index.html" -ForegroundColor DarkGray
            Remove-Item -LiteralPath $indexPath -Force
        }
    }
    
    # Keep images folder intact (venues, pets images are reusable)
    Write-Host "  ✓ Keeping: MyPetVenues/wwwroot/images/ (reusable assets)" -ForegroundColor Green
    
    Write-Host "  ✓ Application files removed" -ForegroundColor Green
}
else {
    Write-Host "  ⚠️  MyPetVenues folder not found (already clean?)" -ForegroundColor Yellow
}

# ============================================================
# STEP 3: Clean MyPetVenues.Api and MyPetVenues.Shared bin/obj
# ============================================================
Write-Host "📁 Cleaning API and Shared project build artifacts..." -ForegroundColor Blue

foreach ($proj in @("MyPetVenues.Api", "MyPetVenues.Shared")) {
    $projPath = Join-Path $RepoRoot $proj
    if (Test-Path $projPath) {
        foreach ($buildDir in @("bin", "obj")) {
            $buildPath = Join-Path $projPath $buildDir
            if (Test-Path $buildPath) {
                if ($PSCmdlet.ShouldProcess($buildPath, "Remove build directory")) {
                    Write-Host "  Removing: $proj/$buildDir/" -ForegroundColor DarkGray
                    Remove-Item -LiteralPath $buildPath -Recurse -Force
                }
            }
        }
    }
}
Write-Host "  ✓ Build artifacts cleaned" -ForegroundColor Green

# ============================================================
# STEP 4: Remove logs and report assets
# ============================================================
Write-Host "📁 Cleaning logs and temporary files..." -ForegroundColor Blue

$logsPath = Join-Path $RepoRoot "logs"
if (Test-Path $logsPath) {
    if ($PSCmdlet.ShouldProcess($logsPath, "Remove logs directory")) {
        Remove-Item -LiteralPath $logsPath -Recurse -Force
        Write-Host "  Removed: logs/" -ForegroundColor DarkGray
    }
}

$reportAssetsPath = Join-Path $RepoRoot "ReportAssets"
if (Test-Path $reportAssetsPath) {
    if ($PSCmdlet.ShouldProcess($reportAssetsPath, "Remove ReportAssets directory")) {
        Remove-Item -LiteralPath $reportAssetsPath -Recurse -Force
        Write-Host "  Removed: ReportAssets/" -ForegroundColor DarkGray
    }
}

Write-Host "  ✓ Temporary files cleaned" -ForegroundColor Green

# ============================================================
# STEP 5: Reset memory.md for fresh demo
# ============================================================
Write-Host "📝 Resetting demo tracking files..." -ForegroundColor Blue

$memoryPath = Join-Path $RepoRoot ".docs\memory.md"
$memoryContent = @"
# MyPetVenues Project Memory

## Project Summary
A pet-friendly location discovery platform ("Yelp/Meetup for pets") - Blazor WebAssembly app.

## Progress
- [ ] Wave 0: Foundation (Project Structure, Models, Global Styles)
- [ ] Wave 1: Services & Layout (Mock Services, Layout Components, Theme)
- [ ] Wave 2: Components (VenueCard, StarRating, ReviewCard, SearchFilters, Badges)
- [ ] Wave 3: Pages (Home, Venues, VenueDetail, Profile, Booking)
- [ ] Wave 4: Integration (Final wiring and testing)

---

## 🐝 Swarm Mode Demo

### Status: Ready for Fresh Build

The application has been cleaned. Use the orchestrator with `.docs/implementation.md` to rebuild from scratch.

### Files Reference
- Implementation Plan: `.docs/implementation.md`
- Demo Tasks (simple): `.docs/demo-tasks.md`
- Swarm Instructions: `.github/instructions/swarm-instruction.md`
- Orchestrator Prompt: `.github/prompts/swarm-mode.prompt.md`

---

## Agent Progress Log

> Agents update this section when working on tasks

(Waiting for orchestrator to start...)

"@

if ($PSCmdlet.ShouldProcess($memoryPath, "Reset memory.md")) {
    Set-Content -Path $memoryPath -Value $memoryContent -Encoding UTF8
    Write-Host "  ✓ Reset: .docs/memory.md" -ForegroundColor Green
}

# Reset report.md
$reportPath = Join-Path $RepoRoot ".docs\report.md"
$reportContent = @"
# Swarm Execution Report

**Status**: Pending  
**Generated**: (will be populated after demo run)

---

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | - |
| Total Waves | - |
| Total Duration | - |
| Total Tokens | - |

---

## Wave Execution

(Report will be generated after running the demo)

---

## Efficiency Metrics

- Sequential time (estimated): ~60-70 minutes
- Parallel time (actual): (pending)
- Time saved: (pending)
"@

if ($PSCmdlet.ShouldProcess($reportPath, "Reset report.md")) {
    Set-Content -Path $reportPath -Value $reportContent -Encoding UTF8
    Write-Host "  ✓ Reset: .docs/report.md" -ForegroundColor Green
}

# ============================================================
# STEP 6: Recreate minimal project structure
# ============================================================
Write-Host "📁 Creating minimal project structure..." -ForegroundColor Blue

# Ensure MyPetVenues folder exists
if (-not (Test-Path $myPetVenuesPath)) {
    New-Item -Path $myPetVenuesPath -ItemType Directory | Out-Null
}

# Create empty folders that agents will populate
$foldersToCreate = @(
    "MyPetVenues\Pages",
    "MyPetVenues\Components",
    "MyPetVenues\Layout",
    "MyPetVenues\Models",
    "MyPetVenues\Services",
    "MyPetVenues\Properties",
    "MyPetVenues\wwwroot\css"
)

foreach ($folder in $foldersToCreate) {
    $folderPath = Join-Path $RepoRoot $folder
    if (-not (Test-Path $folderPath)) {
        if ($PSCmdlet.ShouldProcess($folderPath, "Create directory")) {
            New-Item -Path $folderPath -ItemType Directory -Force | Out-Null
            
            # Add .gitkeep to empty folders so git tracks them
            $gitkeepPath = Join-Path $folderPath ".gitkeep"
            Set-Content -Path $gitkeepPath -Value "" -NoNewline
        }
    }
}

Write-Host "  ✓ Folder structure created" -ForegroundColor Green

# Ensure csproj exists (minimal placeholder)
$csprojPath = Join-Path $myPetVenuesPath "MyPetVenues.csproj"
if (-not (Test-Path $csprojPath)) {
    $minimalCsproj = @"
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="9.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="9.0.0" PrivateAssets="all" />
  </ItemGroup>

</Project>
"@
    if ($PSCmdlet.ShouldProcess($csprojPath, "Create minimal csproj")) {
        Set-Content -Path $csprojPath -Value $minimalCsproj -Encoding UTF8
        Write-Host "  ✓ Created: MyPetVenues/MyPetVenues.csproj (minimal)" -ForegroundColor Green
    }
}

# ============================================================
# COMPLETE
# ============================================================
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    ✅ Cleanup Complete!                          ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "The repository is now ready for a fresh demo." -ForegroundColor White
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Open VS Code Copilot Chat (Ctrl+Shift+I)"
Write-Host "   2. Reference: .github/prompts/swarm-mode.prompt.md"
Write-Host "   3. Say: 'Build the app using .docs/implementation.md'"
Write-Host ""
Write-Host "📁 Preserved Files:" -ForegroundColor Cyan
Write-Host "   • .docs/implementation.md  - Full build plan"
Write-Host "   • .docs/demo-tasks.md      - Simple 4-task demo"
Write-Host "   • .github/                 - All instructions & prompts"
Write-Host "   • .vscode/                 - Tasks & launch config"
Write-Host "   • README.md                - Documentation"
Write-Host ""
Write-Host "🐾 Happy demoing!" -ForegroundColor Magenta
Write-Host ""
