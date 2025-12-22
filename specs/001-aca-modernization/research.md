# Phase 0 Research: ACA Modernization

## Decisions

### 1) Hosting model: introduce a server-side API (same Container App)
**Decision:** Host the Blazor UI together with an ASP.NET Core API in the same Azure Container App.

**Rationale:** The current app is Blazor WebAssembly-only and uses mock/in-memory services. Durable persistence in Azure Cosmos DB using managed identity requires server-side code (managed identity is not available to browser code, and Cosmos DB credentials must not be exposed client-side).

**Alternatives considered:**
- Keep pure static WASM and call Cosmos DB directly from the browser: rejected (would require keys in client code or otherwise expose privileged access; violates constitution).
- Convert to Blazor Server: feasible, but a larger behavioral shift and hosting posture change; keeping WASM UI while adding an API provides a clearer separation of concerns.

---

### 2) Authentication: app-enforced Entra ID (avoid ACA “Easy Auth” secrets)
**Decision:** Require Microsoft Entra ID authentication in the app/API using standard OAuth/OIDC flows (no client secrets in app), and validate JWTs on the API.

**Rationale:** Azure Container Apps built-in authentication can store an Entra client secret as a Container Apps secret for the auth sidecar. The constitution’s “no secrets in code or configuration” constraint is best satisfied by using secretless auth patterns (public client for UI + JWT validation for API).

**Notes:**
- UI: use MSAL (public client) for sign-in.
- API: validate tokens using OpenID metadata from Entra (no secrets required).

**Alternatives considered:**
- Azure Container Apps built-in authentication (“Easy Auth”): lower code effort, but introduces secrets.

---

### 3) Network isolation: VNet-integrated ACA environment + private connectivity
**Decision:** Use a workload profiles Azure Container Apps environment integrated with a customer VNet. Use private endpoints/private link where supported for dependent services.

**Rationale:** The constitution requires network isolation (VNet injection) for container environments.

**Alternatives considered:**
- Public-only environment with external ingress: rejected (constitution).

---

### 4) Public access pattern for non-prod
**Decision:** Keep the Container App environment internal-only (no public ingress) and expose the app via a fronting service that supports private connectivity (e.g., Azure Front Door with Private Link) if public access is required.

**Rationale:** This aligns with “disable public ingress unless required” while still allowing secure operator access.

**Alternatives considered:**
- Direct external ingress on the Container App: simpler, but doesn’t follow the constitution’s secure-by-default posture.

---

### 5) Persistence: Cosmos DB (SQL API) with Entra RBAC and local auth disabled
**Decision:** Use Azure Cosmos DB (SQL API) as the primary datastore, accessed via the app’s system-assigned managed identity. Configure Cosmos DB to use Entra-based RBAC for data plane access and disable local authentication methods where possible.

**Rationale:** Matches the spec’s durability requirement while supporting managed identity and least-privilege access.

---

### 6) Observability: Application Insights (workspace-based) + Azure Monitor logs
**Decision:** Use a workspace-based Application Insights resource for application telemetry, alongside Container Apps environment log integration with Azure Monitor/Log Analytics.

**Rationale:** Container Apps captures stdout/stderr and platform logs via Azure Monitor; Application Insights provides request/dependency/exception telemetry via SDK instrumentation.

---

### 7) Baseline performance/scale targets (to resolve “NEEDS CLARIFICATION”)
**Decision:** Establish the following minimum non-prod SLIs:
- UI navigation: p95 client-side navigation < 3s (warm) for core pages (Home, Venues, Venue Detail).
- API latency: p95 < 500ms for simple reads (list venues filtered by city/type) under light load.
- Availability: best-effort for non-prod; focus on diagnosability (logs + traces) over strict uptime.

**Rationale:** Provides measurable targets without overcommitting to production-grade SLOs for a non-prod-only scope.

## Source references (Microsoft Learn)
- Azure Container Apps authentication overview and Entra configuration: https://learn.microsoft.com/azure/container-apps/authentication
- Managed identities in Azure Container Apps: https://learn.microsoft.com/azure/container-apps/managed-identity
- Networking in Azure Container Apps (VNet integration/private endpoints): https://learn.microsoft.com/azure/container-apps/networking
- Private endpoint guidance for Container Apps environments: https://learn.microsoft.com/azure/container-apps/how-to-use-private-endpoint
- Observability in Azure Container Apps: https://learn.microsoft.com/azure/container-apps/observability
