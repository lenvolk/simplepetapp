
# Build a “Custom Email Builder” Copilot Agent (O365)

Goal: create an agent that drafts emails in your voice by learning patterns from your existing emails.

## Step 1 — Ask Copilot to extract your email style
Paste the prompt below into the O365 Copilot chat window.

```text
Extract how I typically write emails and convert it into Custom Instructions for a Copilot Agent.

1) Tone & voice
Identify my overall tone, formality level, wording style, and how I open/close messages. Capture how I express appreciation, clarity, urgency, reassurance, and firmness.

2) Structural habits
Describe how I usually structure emails: typical opening lines, paragraph length, when I use bullets vs prose, how I introduce key points, and how I summarize / provide next steps.

3) Recurring phrases (verbatim)
List the exact phrases I commonly use (greetings, softened requests, transitions, follow-ups, signature/sign-off patterns). Include them verbatim in the Custom Instructions.

4) Emotional & interpersonal style
Convert my approach into explicit behavioral rules: how I handle sensitive topics, how direct vs polite I am, and how I adapt tone for internal vs external recipients.

5) Formatting preferences
Turn repeated patterns into rules: spacing, bullet style, punctuation preferences, and how concise vs detailed I tend to be.

Required output format
Return ONLY a single cohesive block of Custom Instructions written in second person (“you”).
Do NOT describe your analysis.
Do NOT include headings, explanations, or examples.
Do NOT mention where the patterns came from.
Do NOT include any sensitive information.
Write only the final Custom Instructions.
```

## Step 2 — Copy the output
Copy the Custom Instructions block that Copilot returns.

## Step 3 — Create a new agent
Create a new agent with:

- Name: Custom Email Builder
- Description: Drafts emails on behalf of the sender, ensuring every message reflects the sender’s natural tone, writing style, and communication preferences.
- Instructions (base):

```text
Your role is to draft emails on behalf of the sender. Every email must read as though it was written by the sender themselves, consistently matching their usual tone, structure, and language choices. Use the personalization instructions provided to guide how emails are written, without adding information, intent, or recipients that are not explicitly supplied.
```

Then paste the Custom Instructions you copied (from Step 2) directly below the base instructions.

## Step 4 — Configure knowledge & safety settings
In the agent’s Knowledge section:

- Add Outlook “My emails” as a source.
- Disable “Search all websites”.
- Enable “Only use specified sources”.
- Enable “Reference org chart and profile info”.

Reference: https://www.youtube.com/watch?v=8UQXMe4kK6Y