---
agent: agent
description: "Test a web app using Playwright MCP and create a report"
tools: ['run_in_terminal', 'create_file', 'replace_string_in_file', 'read_file', 'mcp_microsoft_pla_*']
model: 'Claude Sonnet 4.5'
---

# Playwright Testing with MCP

## Available Playwright MCP Tools

| Tool | Purpose |
|------|---------|
| `mcp_microsoft_pla_browser_navigate` | Navigate to a URL |
| `mcp_microsoft_pla_browser_snapshot` | Capture accessibility snapshot (use before clicking) |
| `mcp_microsoft_pla_browser_take_screenshot` | Take visual screenshot |
| `mcp_microsoft_pla_browser_click` | Click elements using `ref` from snapshot |
| `mcp_microsoft_pla_browser_type` | Type text into input fields |
| `mcp_microsoft_pla_browser_select_option` | Select dropdown options |
| `mcp_microsoft_pla_browser_press_key` | Press keyboard keys |
| `mcp_microsoft_pla_browser_console_messages` | Get browser console messages |
| `mcp_microsoft_pla_browser_close` | Close the browser when done |

## Testing Workflow

**IMPORTANT:** All test artifacts must be saved in the `TestWithPlaywright` folder:
- Report: `TestWithPlaywright/TestReport.md`
- Screenshots: `TestWithPlaywright/screenshots/*.png`

### Step 0: Create Memory Checkpoint
Before testing, update `.docs/memory.md` with:
- Task: "Playwright Testing"
- Status: Starting
- Tests planned

This allows recovery if context is lost mid-testing.

### Step 1: Start the Application
If no URL provided, start the local app:
```
run_in_terminal: dotnet run --project MyPetVenues/MyPetVenues.csproj --urls "http://localhost:5050"
(set isBackground: true)
```
Default URL: `http://localhost:5050`

### Step 2: Navigate and Explore
1. `mcp_microsoft_pla_browser_navigate` → go to the URL
2. `mcp_microsoft_pla_browser_snapshot` → get element references
3. Analyze the snapshot to understand the page

### Step 3: Interact with Elements
- **ALWAYS snapshot before clicking** - you need the `ref` attribute
- Click: `mcp_microsoft_pla_browser_click` with `ref` from snapshot
- Type: `mcp_microsoft_pla_browser_type` with `ref` and `text`
- Screenshot: `mcp_microsoft_pla_browser_take_screenshot` with `filename: "TestWithPlaywright/screenshots/[descriptive-name].png"`

### Step 4: Document Results
- Take screenshots for visual evidence (save to `TestWithPlaywright/screenshots/`)
- Check console messages for errors
- Note any issues found

### Step 5: Complete Testing
1. Create `TestWithPlaywright` folder in repository root if it doesn't exist
2. Create `TestWithPlaywright/screenshots` subfolder
3. Save all screenshots to `TestWithPlaywright/screenshots/[descriptive-name].png`
4. Create comprehensive report at `TestWithPlaywright/TestReport.md`
5. Update `.docs/memory.md` → clear checkpoint, note results
6. Close browser if needed

## Key Guidelines

- **Snapshot first, click second** - refs change between snapshots
- **Use `ref` exactly** as shown in snapshot (e.g., `ref="S1E2"`)
- **Take screenshots** for documentation and save to `TestWithPlaywright/screenshots/`
- **Check console** for JavaScript errors
- **Organize output** - All test files go in `TestWithPlaywright` folder

## Example Flow

```
1. Navigate → "http://localhost:5050"
2. Snapshot → see page structure
3. Click → ref: "S1E5" (Venues link)
4. Snapshot → verify navigation worked
5. Screenshot → save to TestWithPlaywright/screenshots/01-venues-page.png
6. Create report → TestWithPlaywright/TestReport.md
7. Update memory
```

## Report Template

**Folder Structure:**
```
TestWithPlaywright/
├── TestReport.md
└── screenshots/
    ├── 01-homepage.png
    ├── 02-feature-test.png
    └── ...
```

Save report to: `TestWithPlaywright/TestReport.md`

```markdown
# [Application Name] - Playwright Test Report

**Date:** [Date]
**Application URL:** [URL]
**Overall Status:** ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

## Summary
| Status | Test | Notes |
|--------|------|-------|
| ✅/❌ | [Name] | [Result] |

## Test Details

### [Test Name]
**Steps:**
1. [Action]
2. [Action]

**Expected:** [What should happen]
**Actual:** [What happened]
**Status:** ✅ Pass / ❌ Fail

## Screenshots
All screenshots are located in: `TestWithPlaywright/screenshots/`

**Files:**
- `01-homepage.png` - [description]
- `02-feature-test.png` - [description]

## Issues Found
- [ ] [Description]

## Conclusion
[Overall assessment and recommendations]
```
