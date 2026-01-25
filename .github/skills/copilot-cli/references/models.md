# Available Models

Use `--model <model>` flag or `/model` slash command in interactive mode.

**Default**: Claude Sonnet 4.5

## Claude Models
| Model | Cost | Notes |
|-------|------|-------|
| `claude-sonnet-4.5` | 1x | **Default** - Balanced performance/speed |
| `claude-haiku-4.5` | 0.33x | Fastest, most cost-effective |
| `claude-opus-4.5` | 3x | Most capable, best for complex tasks |
| `claude-sonnet-4` | 1x | Fast, good for routine tasks |

## GPT Models
| Model | Cost | Notes |
|-------|------|-------|
| `gpt-5.1-codex-max` | 1x | Code-optimized, max capability |
| `gpt-5.1-codex` | 1x | Code-optimized |
| `gpt-5.2` | 1x | Latest GPT |
| `gpt-5.1` | 1x | Stable GPT 5.1 |
| `gpt-5` | 1x | GPT 5 base |
| `gpt-5.1-codex-mini` | 0.33x | Code-optimized, faster |
| `gpt-5-mini` | 0x | Fastest GPT (no premium cost) |
| `gpt-4.1` | 0x | Previous generation (no premium cost) |

## Google Models
| Model | Cost | Notes |
|-------|------|-------|
| `gemini-3-pro-preview` | 1x | Gemini 3 Pro |

## Model Selection Guidelines

| Use Case | Recommended Model | Why |
|----------|-------------------|-----|
| Complex refactoring | `claude-opus-4.5` | Most capable, handles multi-file changes |
| General development | `claude-sonnet-4.5` | Best balance of speed/quality |
| Quick edits | `claude-haiku-4.5` | Fast, cost-effective (0.33x) |
| Code generation | `gpt-5.1-codex-max` | Optimized for code |
| Budget-conscious | `gpt-5-mini` or `gpt-4.1` | 0x cost multiplier |

## Informing Users

**ALWAYS tell the user which model you selected and why:**

```
Using Claude Sonnet 4.5 (default, 1x) - balanced performance for general development tasks
```

```
Using Claude Opus 4.5 (3x) - selected for complex multi-file refactoring
```

```
Using Claude Haiku 4.5 (0.33x) - fast model for quick edits, cost-effective
```
