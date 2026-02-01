---
agent: agent
description: "Test a web app using Playwright MCP and create a report"
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'context7/*', 'azure-mcp/*', 'ms-azuretools.vscode-azure-github-copilot/azure_recommend_custom_modes', 'ms-azuretools.vscode-azure-github-copilot/azure_query_azure_resource_graph', 'ms-azuretools.vscode-azure-github-copilot/azure_get_auth_context', 'ms-azuretools.vscode-azure-github-copilot/azure_set_auth_context', 'ms-azuretools.vscode-azure-github-copilot/azure_get_dotnet_template_tags', 'ms-azuretools.vscode-azure-github-copilot/azure_get_dotnet_templates_for_tag', 'vijaynirmal.playwright-mcp-relay/browser_close', 'vijaynirmal.playwright-mcp-relay/browser_resize', 'vijaynirmal.playwright-mcp-relay/browser_console_messages', 'vijaynirmal.playwright-mcp-relay/browser_handle_dialog', 'vijaynirmal.playwright-mcp-relay/browser_evaluate', 'vijaynirmal.playwright-mcp-relay/browser_file_upload', 'vijaynirmal.playwright-mcp-relay/browser_fill_form', 'vijaynirmal.playwright-mcp-relay/browser_install', 'vijaynirmal.playwright-mcp-relay/browser_press_key', 'vijaynirmal.playwright-mcp-relay/browser_type', 'vijaynirmal.playwright-mcp-relay/browser_navigate', 'vijaynirmal.playwright-mcp-relay/browser_navigate_back', 'vijaynirmal.playwright-mcp-relay/browser_network_requests', 'vijaynirmal.playwright-mcp-relay/browser_take_screenshot', 'vijaynirmal.playwright-mcp-relay/browser_snapshot', 'vijaynirmal.playwright-mcp-relay/browser_click', 'vijaynirmal.playwright-mcp-relay/browser_drag', 'vijaynirmal.playwright-mcp-relay/browser_hover', 'vijaynirmal.playwright-mcp-relay/browser_select_option', 'vijaynirmal.playwright-mcp-relay/browser_tabs', 'vijaynirmal.playwright-mcp-relay/browser_wait_for', 'todo']
model: 'Claude Sonnet 4.5'
---

# Playwright Testing with MCP

## EXECUTION MODE: AUTONOMOUS

Do not stop. Do not ask.
Execute fully. Report at end.
Failures trigger alternatives, not questions.

---

## Quick Reference

| Action | Behavior |
|--------|----------|
| **Start app** | Auto-start on localhost:5050 if not running |
| **Test data** | Use realistic defaults |
| **Screenshots** | Save to `TestWithPlaywright/screenshots/` |
| **Report** | Create at `TestWithPlaywright/TestReport.md` |
| **Failures** | Note and continue |
| **Completion** | Summarize at end |

---

## Available Playwright MCP Tools

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to a URL |
| `browser_snapshot` | Capture accessibility snapshot (use before clicking) |
| `browser_take_screenshot` | Take visual screenshot |
| `browser_click` | Click elements using `ref` from snapshot |
| `browser_type` | Type text into input fields |
| `browser_select_option` | Select dropdown options |
| `browser_press_key` | Press keyboard keys |
| `browser_console_messages` | Get browser console messages |
| `browser_close` | Close the browser when done |

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
Start command (run in background):
```
run_in_terminal: dotnet run --project MyPetVenues/MyPetVenues.csproj --urls "http://localhost:5050"
(set isBackground: true)
```
Default URL: `http://localhost:5050`

Wait 5-10 seconds for application to start, then proceed to testing.

### Step 2: Navigate and Explore
1. `browser_navigate` → go to the URL
2. `browser_snapshot` → get element references
3. Analyze the snapshot to understand the page
4. Identify all testable workflows (navigation, forms, buttons, etc.)

### Step 3: Test All Critical Workflows
**Must Test:**
- ✅ Homepage loading and display
- ✅ All navigation menu links
- ✅ Search/filter functionality (if present)
- ✅ Form submissions (if present)
- ✅ User interactions (clicks, typing, selections)
- ✅ Multi-step processes (wizards, checkouts, bookings)
- ✅ User profile/account features (if present)
- ✅ Theme switching (if present)

**For Each Test:**
1. Take snapshot before interaction
2. Perform action using `ref` from snapshot
3. Take screenshot after action
4. Verify expected result
5. Note any issues

### Step 4: Interact with Elements
- **ALWAYS snapshot before clicking** - you need the `ref` attribute
- Click: `browser_click` with `ref` from snapshot
- Type: `browser_type` with `ref` and `text`
- Screenshot: `browser_take_screenshot` with `filename: "TestWithPlaywright/screenshots/[descriptive-name].png"`

**Naming Convention for Screenshots:**
- Use descriptive names: `01-homepage-loaded.png`, `02-navigation-test.png`, `03-form-submit.png`
- Number sequentially for easy ordering
- Keep names clear and concise

### Step 5: Document Results
- Take screenshots for visual evidence (save to `TestWithPlaywright/screenshots/`)
- Check console messages for errors using `browser_console_messages`
- Note any issues found
- Document all test results in memory

### Step 6: Complete Testing
1. Create `TestWithPlaywright` folder in repository root (if doesn't exist)
2. Create `TestWithPlaywright/screenshots` subfolder (if doesn't exist)
3. Verify all screenshots saved to `TestWithPlaywright/screenshots/`
4. Create comprehensive report at `TestWithPlaywright/TestReport.md`
5. Update `.docs/memory.md` → clear checkpoint, note results
6. Provide user with summary and location of report

## Key Guidelines

**Decision-Making:**
- Use realistic defaults for all values (dates, names, etc.)
- Test most common/critical paths
- Note failures and continue with other tests
- Prioritize critical workflows over edge cases

**Technical Guidelines:**
- **Snapshot first, click second** - refs change between snapshots
- **Use `ref` exactly** as shown in snapshot (e.g., `ref="S1E2"`)
- **Take screenshots** for documentation and save to `TestWithPlaywright/screenshots/`
- **Check console** for JavaScript errors after each major action
- **Organize output** - All test files go in `TestWithPlaywright` folder
- **Use descriptive names** for screenshots (numbered and labeled)

**Default Test Data (use when forms need input):**
- Names: "Test User", "John Doe", "Jane Smith"
- Emails: "test@example.com", "user@test.com"
- Dates: Current date + 7 days (or any future date)
- Times: "10:00 AM", "2:00 PM"
- Phone: "555-0123"
- Text fields: Realistic but generic content
- Dropdowns: Select first valid option or most common choice

## Example Flow

```
1. Start application → dotnet run in background
2. Wait 10 seconds → let app initialize
3. Navigate → "http://localhost:5050"
4. Snapshot → analyze page structure
5. Screenshot → TestWithPlaywright/screenshots/01-homepage.png
6. Identify workflows → navigation, forms, features
7. Test Navigation:
   - Snapshot → get nav links
   - Click → ref: "S1E5" (Venues link)
   - Snapshot → verify page changed
   - Screenshot → TestWithPlaywright/screenshots/02-venues-page.png
8. Test Search/Filter:
   - Snapshot → get filter elements
   - Select → filter option
   - Screenshot → TestWithPlaywright/screenshots/03-filtered-results.png
9. Test Forms:
   - Snapshot → get form fields
   - Type → realistic test data
   - Click → submit button
   - Screenshot → TestWithPlaywright/screenshots/04-form-submitted.png
10. Continue testing all workflows systematically
11. Check console → capture any errors
12. Create folders → TestWithPlaywright/screenshots/
13. Create report → TestWithPlaywright/TestReport.md
14. Update memory → note completion
15. Summarize → tell user where to find results
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
