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

### Step 4: Document Results
- Take screenshots for visual evidence
- Check console messages for errors
- Note any issues found

### Step 5: Complete Testing
1. `mcp_microsoft_pla_browser_close` → end session
2. Create report at `manual-tests/[name]-test-report.md`
3. Update `.docs/memory.md` → clear checkpoint, note results

## Key Guidelines

- **Snapshot first, click second** - refs change between snapshots
- **Use `ref` exactly** as shown in snapshot (e.g., `ref="S1E2"`)
- **Take screenshots** for documentation
- **Check console** for JavaScript errors

## Example Flow

```
1. Navigate → "http://localhost:5050"
2. Snapshot → see page structure
3. Click → ref: "S1E5" (Venues link)
4. Snapshot → verify navigation worked
5. Screenshot → document the page
6. Close → end session
7. Create report
```

## Report Template

Save to: `manual-tests/[feature]-test-report.md`

```markdown
# Test Report - [Feature Name]

**Date:** [Date]
**URL:** [URL]

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

## Issues Found
- [ ] [Description]

## Screenshots
(Include screenshots here)
```
