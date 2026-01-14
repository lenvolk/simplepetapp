# SimplePetApp — Repo Walkthrough Agenda (One-page, slide-friendly)

**Session length:** 30–35 minutes  
**Goal:** Show how this repo demonstrates agentic coding patterns (Skills / Structured Autonomy / SpecKit) and how AI support maps from requirements → implementation.

---

## 0) Opening: what we’re doing today (2 min)
- **Outcome:** You’ll know *where AI lives in the repo* and *how the workflows differ*.  
  *Talk track:* “This is not a tool demo—this is a workflow + repo-structure demo that scales beyond a single engineer.”

---

## 1) Product + architecture snapshot (3 min)
- **What this app is:** A small end-to-end sample that’s intentionally easy to evolve.  
  *Talk track:* “We want something real enough to change, but small enough to reason about quickly.”
- **What matters today:** where requirements, prompts, and implementation meet.  
  *Talk track:* “We’re focusing on the *system of work*, not just the UI.”

---

## 2) Repo tour: where the ‘AI operating system’ lives (5 min)
- **Core app surface:** `MyPetVenues/`, shared + API folders.  
  *Talk track:* “This is the product code—the rest is how we make change safer, faster, repeatable.”
- **AI assets & governance:** `.github/skills/`, `.github/prompts/`, `.github/agents/`, `.github/instructions/`.  
  *Talk track:* “These are reusable constraints and playbooks—how we prevent ‘random’ AI output.”
- **Approaches you can compare in this repo:** `structured-autonomy` branch vs `SpecKit` branch.  
  *Talk track:* “Same app, different operating model for making changes.”

---

## 3) Mental alignment: why code review is the real context engine (3 min)
- **One-liner:** Code review keeps the team’s mental model aligned by requiring clear intent, small reviewable changes, and explicit testing context.  
  *Talk track:* “PRs are where humans and AI converge—context, intent, and correctness get negotiated.”
- **Reference:** Blake Smith, *Code Review Essentials for Software Teams*  
  https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html

---

## 4) The three AI strategies (10–12 min)
- **SKILLS (reusable capabilities):** scoped, repeatable tasks with consistent outputs.  
  *Talk track:* “Skills reduce variability: same input shape, same quality bar, less prompt thrash.”
- **Structured Autonomy (custom agents + prompts):** role-based agents, guardrails, and repeatable decision-making.  
  *Talk track:* “This is how you scale beyond ‘one good prompt’—specialize agents, enforce constraints.”
- **SpecKit (spec-driven workflow):** specs first, then implementation driven by the spec artifacts.  
  *Talk track:* “SpecKit optimizes for traceability: decisions become documents, not just chats.”

---

## 5) RPI in action: Research → Plan → Implement (6–8 min)
- **Research:** confirm constraints, find existing patterns, locate integration points.  
  *Talk track:* “The goal is to avoid ‘greenfield hallucination’—reuse what the repo already does.”
- **Plan:** define acceptance criteria + smallest shippable slice.  
  *Talk track:* “Planning is where we align humans, AI, and reviewers before code moves.”
- **Implement:** minimal diffs, tests/validation, PR-ready narrative.  
  *Talk track:* “Implementation is the easy part when research + plan are disciplined.”

---

## 6) Context engineering + reuse (4 min)
- **What gets saved:** decisions, constraints, and recurring tasks (skills/prompts/instructions).  
  *Talk track:* “We’re turning ‘tribal knowledge’ into versioned artifacts.”
- **How reuse works:** repeatable prompts + stable constraints beat one-off conversations.  
  *Talk track:* “The win is consistency and onboarding speed, not just faster typing.”

---

## 7) Enterprise reality check (3–5 min)
- **Integration points:** CI, PR templates, governance, security review, auditability.  
  *Talk track:* “The question is: can you *trust* changes and explain why they’re correct?”
- **Known limits:** context windows, tool access, and non-determinism.  
  *Talk track:* “We design workflows that assume imperfection—guardrails + reviews are mandatory.”

---

## 8) Close: how to choose an approach (2 min)
- **When to use what:** Skills for repeatable tasks; Structured Autonomy for complex multi-step work; SpecKit for high-traceability initiatives.  
  *Talk track:* “Pick the operating model based on risk, stakeholders, and required traceability.”
