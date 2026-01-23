# Available Models

Use `--model <model>` to select:

## Claude Models
- `claude-opus-4.5` - Most capable, best for complex tasks
- `claude-sonnet-4.5` - Balanced performance/speed
- `claude-sonnet-4` - Fast, good for routine tasks
- `claude-haiku-4.5` - Fastest Claude model

## GPT Models
- `gpt-5.2` - Latest GPT
- `gpt-5.1` - Stable GPT 5.1
- `gpt-5.1-codex-max` - Code-optimized, max capability
- `gpt-5.1-codex` - Code-optimized
- `gpt-5.1-codex-mini` - Code-optimized, faster
- `gpt-5` - GPT 5 base
- `gpt-5-mini` - Faster GPT 5
- `gpt-4.1` - Previous generation

## Google Models
- `gemini-3-pro-preview` - Gemini 3 Pro

## Model Selection Guidelines

| Use Case | Recommended Model |
|----------|-------------------|
| Complex refactoring | `claude-opus-4.5` or `gpt-5.1-codex-max` |
| Routine bug fixes | `claude-sonnet-4` or `gpt-5.1-codex` |
| Quick edits | `claude-haiku-4.5` or `gpt-5-mini` |
| Code generation | `gpt-5.1-codex` |
