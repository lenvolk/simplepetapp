# Implementation Plan: Modernize MyPetVenues for Azure Container Apps

**Branch**: `001-aca-modernization` | **Date**: 2025-12-22 | **Spec**: specs/001-aca-modernization/spec.md
**Input**: Feature specification from `/specs/001-aca-modernization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deploy MyPetVenues to Azure Container Apps (non-production scope) with secure-by-default access (Microsoft Entra ID required), system-assigned managed identity for Azure resource access, durable persistence in Azure Cosmos DB (SQL API) using Entra-based RBAC (no keys), and platform-integrated observability via Application Insights (workspace-based) and Azure Monitor.

Because the current app is Blazor WebAssembly-only with in-memory/mock services, the modernization requires introducing a server-side API surface (hosted alongside the UI in the same Container App) so data access can occur using managed identity without exposing any credentials to the browser.

## Technical Context

**Language/Version**: C# / .NET 9 (Blazor WebAssembly)  
**Primary Dependencies**: Blazor WebAssembly (`Microsoft.AspNetCore.Components.WebAssembly`), planned: ASP.NET Core minimal APIs for persistence endpoints, Azure SDKs (Cosmos DB)  
**Storage**: Azure Cosmos DB (SQL API) with Entra-based RBAC; private endpoint connectivity from a VNet-integrated Container Apps environment  
**Testing**: No automated test project currently detected; validation via repeatable deployment + manual acceptance scenarios from spec  
**Target Platform**: Azure Container Apps (Linux container), workload profiles environment with VNet integration  
**Project Type**: Web application (hosted UI + API in a single Container App deployment)  
**Performance Goals**: Non-prod SLIs: UI p95 navigation < 3s (warm) for core pages; API p95 < 500ms for simple reads under light load  
**Constraints**: No secrets in repo/config; Entra ID required for access; managed identity for Azure access; IaC required for all Azure resources  
**Scale/Scope**: Single non-production environment deployment; scale-to-zero acceptable for non-prod; data retention >= 30 days

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Gates derived from `.specify/memory/constitution.md`:

- Azure Container Apps First: Hosting target is ACA and deployment must be IaC.
- Managed Identity Everywhere: Cosmos DB access must use managed identity / Entra RBAC (disable key-based auth where feasible).
- MCP Server & Coding Agent Integration: Use Microsoft Learn guidance and Azure MCP tools for Azure resource operations.
- Secure by Default: Enforce HTTPS, require auth, and use network isolation (VNet integration / private connectivity).
- Observability: Enable Azure Monitor + Application Insights (workspace-based) and ensure logs are available for troubleshooting.

Status:

- PASS (planned): ACA + IaC.
- PASS (planned): System-assigned managed identity for app-to-Azure.
- PASS (planned): Entra auth required for user access.
- ACTION REQUIRED: Network isolation must be included (the spec previously assumed no private networking). The plan uses a VNet-integrated ACA environment and private endpoints for dependent services.
- ACTION REQUIRED: Constitution expects separate dev/staging/prod with separate identities/resource groups. This feature is scoped to a single non-prod environment; document the exception in Complexity Tracking or adjust scope.

## Project Structure

### Documentation (this feature)

```text
specs/001-aca-modernization/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
MyPetVenues/                 # Current Blazor WebAssembly application
├── Components/
├── Layout/
├── Models/
├── Pages/
├── Services/
└── wwwroot/

specs/
└── 001-aca-modernization/

# Planned additions during implementation (names may vary):
# - A server-hosted API (ASP.NET Core) to access Cosmos DB using managed identity
# - Infrastructure-as-code (Bicep) to provision ACA environment, networking, Cosmos DB, monitoring
```

**Structure Decision**: Single repository with the existing `MyPetVenues/` Blazor WebAssembly project, plus an added server/API component for persistence and auth enforcement, deployed together as one Azure Container App.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Single non-prod environment (no dev/staging/prod separation) | Feature scope explicitly excludes production; want to validate architecture end-to-end in one environment first | Multi-environment rollout adds cost and operational overhead beyond current scope |
