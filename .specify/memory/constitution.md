
# Simkplepetapp Constitution



## Core Principles

### I. Azure Container Apps First
All production workloads MUST be hosted in Azure Container Apps, following Microsoft Learn's Well-Architected Framework for reliability, security, performance, and cost optimization. Use infrastructure-as-code for deployments and enable autoscaling, observability, and health probes.

### II. Managed Identity Everywhere
All app-to-Azure resource access MUST use managed identities (prefer user-assigned for shared or pre-provisioned access, system-assigned for resource-coupled access). No credentials or secrets are permitted in code or configuration. Follow least privilege and audit all permissions.

### III. MCP Server & Coding Agent Integration
All automation, deployment, and agentic workflows MUST use the Azure MCP server and its tools. Coding agents MUST check and apply Microsoft Learn best practices for every Azure resource and operation.

### IV. Secure by Default
Enforce HTTPS, disable public ingress unless required, and use network isolation (VNet injection) for all container environments. Enable authentication for all endpoints and use Azure Policy to audit compliance.

### V. Observability & Operational Excellence
Diagnostics, logging, and metrics MUST be enabled for all environments. Use Azure Monitor, Application Insights, and log streaming. All deployments MUST be automated and repeatable. Tag resources consistently for cost and operations.


## Additional Constraints

- All deployments MUST use infrastructure-as-code (Bicep, ARM, or Terraform) and be stored in version control.
- All code and infrastructure changes MUST be reviewed for compliance with the above principles.
- No secrets or credentials may be stored in source control or configuration files.
- All environments (dev, staging, prod) MUST use separate managed identities and resource groups.


## Development Workflow & Quality Gates

- All PRs and deployments MUST pass a constitution check for compliance with core principles.
- All new features or infrastructure changes MUST document their Azure resource usage and managed identity configuration.
- All agentic automation (Copilot, MCP, etc.) MUST invoke Microsoft Learn best practices for every Azure resource and operation.
- All deployments MUST be tested in a staging environment before production.


## Governance

- This constitution supersedes all other workflow or architectural practices.
- Amendments require documentation, approval, and a migration plan.
- All PRs and reviews MUST verify compliance with the constitution.
- Use Microsoft Learn and Azure Well-Architected Framework as runtime guidance.


**Version**: 1.1.0 | **Ratified**: 2025-12-22 | **Last Amended**: 2025-12-22

