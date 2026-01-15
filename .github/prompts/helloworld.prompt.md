---
description: Hello World skill activation prompt - ensures the skill workflow is properly executed
applyTo: **
---

# Hello World Skill Prompt

When a user types "hello world" or similar variations (e.g., "Hello World", "hello world!"), you MUST follow this complete workflow:

## Required Steps

1. **Read the Skill Definition**: Load and analyze the complete skill file at `.github/skills/hello-world/SKILL.md` to understand the full workflow.

2. **Execute the Workflow**: Follow ALL steps defined in the skill file:
   - Run the system information script (`.github/skills/hello-world/scripts/get-system-info.js`)
   - Use the response template (`.github/skills/hello-world/TEMPLATE.md`)
   - Replace template variables with actual data

3. **Deliver the Complete Response**: 
   - Present the ASCII art "Hello World" banner (properly formatted in a code block)
   - Include the system information collected from the script
   - Maintain the exact formatting specified in the template
   - **CRITICAL**: Render the template as markdown output, NOT wrapped in a code block
   - Only the ASCII art and system info sections should be in code blocks

## Important Notes

- Do NOT skip any steps in the skill workflow
- Do NOT respond with a generic greeting
- Do NOT wrap the entire response in a code block - render it as markdown
- ONLY wrap the ASCII art itself in a markdown code block (triple backticks) to preserve formatting
- ONLY wrap the system information output in a markdown code block
- The skill file is the source of truth - read it first before responding
- This ensures consistent, skill-based responses rather than generic AI responses

## Trigger Phrases

- "hello world"
- "Hello World"
- "hello world!"
- Similar variations of the classic greeting
