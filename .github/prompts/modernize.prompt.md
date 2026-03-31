---
description: "Scan VS Code release notes for new agent customization features and apply them to MCAPS-IQ. Fetches release notes since the last audit, diffs against current repo state, proposes patches, and ends with /init. Triggers: modernize, upgrade agent layer, what's new in VS Code, scan release notes, catch up on features."
agent: doctor
---

# Modernize MCAPS-IQ Agent Layer

Scan VS Code release notes for new agent customization features since the last audit, compare against what MCAPS-IQ currently uses, apply improvements, and refresh workspace instructions.

## Last Audited Version

**v1.113** (March 25, 2026)

> After each successful modernization pass, update this version number to the latest stable release you scanned.

## Step 1 — Determine scan range

1. Read the "Last Audited Version" above → that's the starting point.
2. Determine the current latest stable VS Code version. Fetch `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/release-notes/` or infer from the highest `v1_NNN.md` file available.
3. Build the list of release notes to fetch: from `v1_{LAST+1}` through `v1_{CURRENT}`.
4. If already up-to-date, tell the user and stop.

## Step 2 — Fetch and extract relevant changes

For each release in the scan range, fetch the raw markdown from:
```
https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/release-notes/v1_{VERSION}.md
```

Extract ONLY sections related to:
- **Agent customization**: custom agents, `.agent.md` frontmatter properties, agent hooks, agent-scoped hooks
- **Skills**: `SKILL.md` frontmatter, skill authoring, skill discovery
- **Instructions**: `.instructions.md`, `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md`
- **Prompt files**: `.prompt.md` frontmatter, prompt features
- **Subagents**: subagent invocation, nested subagents, `agents:` property, `runSubagent`
- **MCP servers**: `mcp.json` schema changes, new MCP features, sandboxing
- **Tools**: new built-in tools, tool sets, tool restrictions
- **Settings**: new `chat.*` or `github.copilot.chat.*` settings relevant to agent behavior
- **Deprecations**: anything being removed or renamed that we might use

Also fetch the canonical docs pages to cross-reference the full current schema:
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/custom-agents.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/agents/subagents.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/agent-skills.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/hooks.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/custom-instructions.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/prompt-files.md`
- `https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/mcp-servers.md`

### Additional sources (check if relevant changes surfaced in Step 2)

These secondary sources cover features that ship outside VS Code core releases:

- **GitHub Copilot changelog**: `https://github.blog/changelog/` — search for recent posts mentioning "Copilot", "coding agent", "organization agents", "custom agents", or "Copilot memory". GitHub ships Copilot extension updates independently of VS Code releases.
- **MCP specification blog**: `https://blog.modelcontextprotocol.io/` — new protocol capabilities (Apps, elicitation, sampling, auth flows) that could improve the 3 local MCP servers in `mcp/`.
- **GitHub Copilot docs**: `https://docs.github.com/en/copilot` — organization-level agent definitions, coding agent configuration, Copilot policies.

> Only fetch secondary sources when Step 2 reveals a related change — don't fetch them every run. They're for deeper investigation, not routine scanning.

## Step 3 — Inventory current repo state

Read the following files to understand what MCAPS-IQ currently uses:

| What | Files |
|------|-------|
| Custom agents | `.github/agents/*.agent.md` — read all 4 files, note every frontmatter property used |
| Skills | `.github/skills/*/SKILL.md` — sample 5-10 skill headers for frontmatter coverage |
| Instructions | `.github/instructions/*.instructions.md` — check frontmatter format |
| Prompts | `.github/prompts/*.prompt.md` — check frontmatter format |
| MCP config | `.vscode/mcp.json` — check schema and server definitions |
| Workspace instructions | `copilot-instructions.md` — note structure |
| VS Code settings | `.vscode/settings.json` — check `chat.*` settings already configured |

## Step 4 — Produce a gap report

Compare what's available (Step 2) vs. what's used (Step 3). Organize findings as:

### New Features We Should Adopt
For each: what it is, which release introduced it, which files to change, and the specific edit.

### Deprecations We Need to Address
For each: what's deprecated, what replaces it, which of our files are affected.

### Settings We Should Consider
For each: the setting name, what it does, recommended value, and why.

### Features We Can Skip
Briefly list features that exist but don't apply to MCAPS-IQ (with one-line reason).

Present this report to the user. **Wait for confirmation before making changes** (unless in autopilot mode — then apply your best judgment and proceed).

## Step 5 — Apply changes

For each approved change:
1. Read the target file.
2. Make the edit.
3. Explain what changed and why in one sentence.

## Step 6 — Update audit anchor

Edit THIS file (`modernize.prompt.md`) — update the "Last Audited Version" to the latest version you scanned.

## Step 7 — Run context linters

```bash
cd .github/eval && node lint-descriptions.mjs && node lint-instructions.mjs --cross && node lint-context.mjs
```

Fix any lint errors before proceeding.

## Step 8 — Refresh workspace instructions

Tell the user:

> Modernization complete. Run `/init` now to regenerate workspace instructions so the agent layer reflects these changes going forward.

If in autopilot mode, run `/init` directly.

## Rules

- **Don't guess features.** Only report features you found in actual release notes content.
- **Don't over-adopt.** Skip features that add complexity without clear value for this repo. A feature existing doesn't mean MCAPS-IQ needs it. For each candidate, ask: "Does this make the agent system measurably better — faster, more reliable, less error-prone, or newly capable of something we need?" If the answer is "it's cool but we don't need it," skip it.
- **Show your work.** For each change, cite the VS Code version and section where the feature was announced.
- **Preserve existing patterns.** Don't refactor working files just because a new option exists — only adopt when it adds value.
- **One file at a time.** Don't batch-edit multiple agent files in one tool call.
- **Think before fetching.** Don't fetch all secondary sources every run. Only drill into GitHub Copilot changelog or MCP blog when a primary release note references something that needs deeper context.
- **Combine with knowledge.** Use your understanding of MCAPS-IQ's architecture (4 agents, 48 skills, 3 MCP servers, multi-agent orchestration) to evaluate fit. A feature that helps single-agent setups may not matter here, and vice versa.
