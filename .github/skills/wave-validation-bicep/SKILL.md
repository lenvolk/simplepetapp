---
name: wave-validation-bicep
description: Validate Bicep changes by compiling templates and reporting actionable errors. Use after editing .bicep/.bicepparam files or when deploying Azure infrastructure as code.
---

# Wave Validation: Bicep (Skill)

## Preferred checks
- If Azure CLI is available: `az bicep build --file <template.bicep>`
- If Bicep CLI is available: `bicep build <template.bicep>`

## What to report
- Command run
- Pass/fail
- If fail: smallest actionable error summary

## Notes
Don’t run Bicep validation when the wave touched only `.cs/.razor` or docs.
