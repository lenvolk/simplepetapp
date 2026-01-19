---
agent: agent
description: "Manually test a site using Microsoft Playwright MCP and create a detailed report"
tools: ['search/codebase', 'edit/editFiles', 'execute/runTask', 'playwright/*']
model: 'Claude Sonnet 4.5'
---

# Manual Testing Instructions using Microsoft Playwright MCP

## Available MCP Tools Reference

You have access to the following Microsoft Playwright MCP tools:

| Tool | Purpose |
|------|---------|
| `mcp_microsoft_pla_browser_navigate` | Navigate to a URL |
| `mcp_microsoft_pla_browser_snapshot` | Capture accessibility snapshot (preferred over screenshot for interactions) |
| `mcp_microsoft_pla_browser_take_screenshot` | Take visual screenshot of the page |
| `mcp_microsoft_pla_browser_click` | Click on elements using `ref` from snapshot |
| `mcp_microsoft_pla_browser_type` | Type text into input fields |
| `mcp_microsoft_pla_browser_fill_form` | Fill multiple form fields at once |
| `mcp_microsoft_pla_browser_hover` | Hover over elements |
| `mcp_microsoft_pla_browser_select_option` | Select dropdown options |
| `mcp_microsoft_pla_browser_press_key` | Press keyboard keys |
| `mcp_microsoft_pla_browser_navigate_back` | Go back to previous page |
| `mcp_microsoft_pla_browser_console_messages` | Get browser console messages |
| `mcp_microsoft_pla_browser_network_requests` | View network requests |
| `mcp_microsoft_pla_browser_close` | Close the browser when done |

## Testing Workflow

### Step 1: Start the Application (if needed)
If the app isn't running, use `execute/runTask` to run the application task first.
Default URL for this project: `http://localhost:5164`

### Step 2: Navigate and Capture Initial State
```
1. Use `mcp_microsoft_pla_browser_navigate` to go to the URL
2. Use `mcp_microsoft_pla_browser_snapshot` to capture the accessibility tree
3. Analyze the snapshot to understand page structure and available elements
```

### Step 3: Interact with Elements
The snapshot returns element references (`ref`) that you MUST use for interactions:
- Click buttons/links: `mcp_microsoft_pla_browser_click` with `ref` and `element` description
- Fill inputs: `mcp_microsoft_pla_browser_type` with `ref`, `element`, and `text`
- Submit forms: Use `submit: true` parameter or click submit button

### Step 4: Verify and Document
After each interaction:
1. Take a new snapshot to see UI changes
2. Check for expected elements, text, or state changes
3. Capture screenshots for visual evidence when needed
4. Check `mcp_microsoft_pla_browser_console_messages` for errors

### Step 5: Complete Testing
1. Use `mcp_microsoft_pla_browser_close` to close the browser
2. Generate the test report

## Important Guidelines

- **ALWAYS take a snapshot before clicking** - you need the `ref` attribute from the snapshot
- **Use `element` parameter** to describe what you're interacting with (for permission/logging)
- **Use `ref` parameter** with the exact reference from the snapshot (e.g., `ref="S1E2"`)
- **Don't guess refs** - they change between snapshots, always get fresh ones
- **Prefer snapshot over screenshot** for understanding page structure
- **Take screenshots** for visual documentation in reports

## Test Scenarios for MyPetVenues App

If no scenario is provided, test these common flows:
1. **Home Page Load** - Verify hero section, navigation, featured venues
2. **Venue Search** - Use filters, search by pet type, location
3. **Venue Details** - Click a venue card, view amenities, reviews
4. **Booking Flow** - Select dates, complete booking form
5. **User Profile** - View/edit profile, see booking history
6. **Theme Toggle** - Test dark/light mode switching
7. **Responsive Design** - Use `mcp_microsoft_pla_browser_resize` to test mobile views

## Report Format

Generate a markdown report in `manual-tests/` directory with this structure:

```markdown
# Manual Test Report - [Feature/Scenario Name]

**Date:** [Date]
**URL Tested:** [URL]
**Browser:** Playwright Chromium

## Test Summary
| Status | Scenario | Notes |
|--------|----------|-------|
| ✅/❌ | [Name] | [Brief result] |

## Detailed Test Results

### Scenario: [Name]
**Objective:** [What we're testing]

**Steps Performed:**
1. [Action taken]
2. [Action taken]

**Expected Result:** [What should happen]
**Actual Result:** [What actually happened]
**Status:** ✅ Pass / ❌ Fail

**Screenshots:**
(Add screenshots as needed)

## Issues Found
- [ ] Issue 1: [Description]
- [ ] Issue 2: [Description]

## Accessibility Observations
- [Observations about a11y from snapshots]

## Recommendations
- [Improvement suggestions]
```

## Example Interaction Flow

```
1. mcp_microsoft_pla_browser_navigate → url: "http://localhost:5164"
2. mcp_microsoft_pla_browser_snapshot → analyze page structure
3. mcp_microsoft_pla_browser_click → ref: "S1E5", element: "Venues navigation link"
4. mcp_microsoft_pla_browser_snapshot → verify navigation worked
5. mcp_microsoft_pla_browser_take_screenshot → document the venues page
6. mcp_microsoft_pla_browser_click → ref: "S2E3", element: "First venue card"
7. ... continue testing ...
8. mcp_microsoft_pla_browser_close → end session
```

Remember: Ask the user for specific scenarios if none provided. Always close the browser when testing is complete.
