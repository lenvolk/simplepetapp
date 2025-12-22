---

description: "Task list for 001-aca-modernization implementation"
---

# Tasks: Modernize MyPetVenues for Azure Container Apps

**Input**: Design documents from `/specs/001-aca-modernization/`

- Required: `plan.md`, `spec.md`
- Available: `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

**Tests**: No automated test work is requested in `spec.md`; tasks focus on repeatable deployment + independently testable acceptance scenarios.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: User story label (US1..US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add repo structure for infra/containerization and prepare the solution for a server-hosted deployment.

- [ ] T001 Create infra scaffold folder `infra/` and baseline docs in `infra/README.md`
- [ ] T002 Create root IaC entrypoint in `infra/main.bicep`
- [ ] T003 [P] Create non-prod parameters in `infra/parameters/nonprod.bicepparam`
- [ ] T004 [P] Create repeatable deploy script in `scripts/deploy-nonprod.ps1`
- [ ] T005 [P] Add container ignore rules in `.dockerignore`
- [ ] T006 Add multi-stage container build in `Dockerfile`
- [ ] T007 Create ASP.NET Core host/API project in `MyPetVenues.Api/MyPetVenues.Api.csproj`
- [ ] T008 Add API project to solution in `simkplepetapp.sln`
- [ ] T009 [P] Add local debug profile in `MyPetVenues.Api/Properties/launchSettings.json`
- [ ] T010 [P] Resolve spec/plan contradiction by updating assumptions in `specs/001-aca-modernization/spec.md` (document that a server-side API is introduced to keep secrets out of the browser)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Authentication, shared contracts, and Cosmos/HTTP plumbing needed before any user story work.

- [ ] T011 Create shared contracts project in `MyPetVenues.Shared/MyPetVenues.Shared.csproj`
- [ ] T012 Add shared project to solution in `simkplepetapp.sln`
- [ ] T013 [P] Define typed options for auth + Cosmos in `MyPetVenues.Api/Options/AuthOptions.cs` and `MyPetVenues.Api/Options/CosmosOptions.cs`
- [ ] T014 Implement Entra JWT validation in `MyPetVenues.Api/Program.cs` (no client secrets; configure authority/audience via config)
- [ ] T015 [P] Add MSAL auth to UI in `MyPetVenues/Program.cs` (public client only)
- [ ] T016 [P] Require authenticated UI routing in `MyPetVenues/App.razor` and `MyPetVenues/_Imports.razor`
- [ ] T017 Serve Blazor WASM static assets from the API host in `MyPetVenues.Api/Program.cs` and add a project reference in `MyPetVenues.Api/MyPetVenues.Api.csproj` to `MyPetVenues/MyPetVenues.csproj`
- [ ] T018 Configure UI-to-API HttpClient wiring in `MyPetVenues/Program.cs` (token-attaching message handler + base URL)
- [ ] T019 [P] Add consistent API error responses via ProblemDetails in `MyPetVenues.Api/Infrastructure/ProblemDetailsExtensions.cs`
- [ ] T020 [P] Add basic health endpoints in `MyPetVenues.Api/Program.cs` (e.g., `/health`, `/ready`)
- [ ] T021 [P] Implement Cosmos client factory in `MyPetVenues.Api/Data/Cosmos/CosmosClientFactory.cs` using managed identity
- [ ] T022 Create repository skeletons in `MyPetVenues.Api/Data/Repositories/` (`VenueRepository.cs`, `ReviewRepository.cs`, `BookingRepository.cs`, `UserRepository.cs`)
- [ ] T023 [P] Add user claim helpers in `MyPetVenues.Api/Auth/UserClaims.cs` (extract `oid`/`sub` and enforce per-user access)

**Checkpoint**: Foundation ready — US1–US4 can proceed.

---

## Phase 3: User Story 1 — Deploy to ACA with Entra-secured HTTPS (Priority: P1) 🎯 MVP

**Goal**: A maintainer can deploy the app to Azure Container Apps and access it securely over HTTPS.

**Independent Test**: Deploy to non-prod and verify: (1) app reachable via HTTPS, (2) unauthenticated access is blocked, (3) Home/Venues/VenueDetail navigation works.

- [ ] T024 [US1] Create ACA environment + container app module in `infra/modules/containerapps.bicep`
- [ ] T025 [P] [US1] Create VNet integration module in `infra/modules/networking.bicep`
- [ ] T026 [P] [US1] Create monitoring baseline module in `infra/modules/monitoring.bicep` (Log Analytics + workspace-based App Insights)
- [ ] T027 [US1] Wire modules/outputs in `infra/main.bicep` (FQDN, resource IDs, monitoring connection info)
- [ ] T028 [US1] Add deployment runbook in `specs/001-aca-modernization/runbook-deploy.md`
- [ ] T029 [US1] Extend `scripts/deploy-nonprod.ps1` to build/push container image and deploy `infra/main.bicep`
- [ ] T030 [US1] Enforce auth for all HTTP routes (API + static files) in `MyPetVenues.Api/Program.cs`
- [ ] T031 [US1] Add protected ping endpoint in `MyPetVenues.Api/Endpoints/PingEndpoints.cs`
- [ ] T032 [US1] Update local/dev guidance for the new host in `specs/001-aca-modernization/quickstart.md`
- [ ] T033 [P] [US1] Add optional CI deploy pipeline (OIDC, no secrets) in `.github/workflows/deploy-nonprod.yml`

**Checkpoint**: US1 MVP deployed and usable.

---

## Phase 4: User Story 2 — Persist Venues/Reviews/Bookings/Profile via Cosmos (Priority: P2)

**Goal**: A user can create/update venues, reviews, bookings, and profile data; it persists across restarts and deployments.

**Independent Test**: Create venue/review/booking + update profile; reload + redeploy; verify the data is retained.

- [ ] T034 [US2] Create Cosmos account/db/containers module in `infra/modules/cosmos.bicep` (containers: `venues`, `reviews`, `bookings`, `users`; partition keys from `data-model.md`)
- [ ] T035 [US2] Wire Cosmos module outputs (endpoint/db/container names) in `infra/main.bicep`
- [ ] T036 [US2] Add API configuration for Cosmos in `MyPetVenues.Api/appsettings.json` and bind in `MyPetVenues.Api/Program.cs`
- [ ] T037 [P] [US2] Add venues contract types in `MyPetVenues.Shared/Contracts/Venues/` and mapping in `MyPetVenues.Api/Mappers/VenueMapper.cs`
- [ ] T038 [US2] Implement venues data access in `MyPetVenues.Api/Data/Repositories/VenueRepository.cs`
- [ ] T039 [US2] Implement venues endpoints in `MyPetVenues.Api/Endpoints/VenueEndpoints.cs` (matches `contracts/openapi.yaml`)
- [ ] T040 [P] [US2] Add reviews contract types in `MyPetVenues.Shared/Contracts/Reviews/` and mapping in `MyPetVenues.Api/Mappers/ReviewMapper.cs`
- [ ] T041 [US2] Implement reviews data access in `MyPetVenues.Api/Data/Repositories/ReviewRepository.cs`
- [ ] T042 [US2] Implement reviews endpoints in `MyPetVenues.Api/Endpoints/ReviewEndpoints.cs`
- [ ] T043 [P] [US2] Add bookings contract types in `MyPetVenues.Shared/Contracts/Bookings/` and mapping in `MyPetVenues.Api/Mappers/BookingMapper.cs`
- [ ] T044 [US2] Implement bookings data access in `MyPetVenues.Api/Data/Repositories/BookingRepository.cs`
- [ ] T045 [US2] Implement bookings endpoints in `MyPetVenues.Api/Endpoints/BookingEndpoints.cs`
- [ ] T046 [P] [US2] Add user profile contract types in `MyPetVenues.Shared/Contracts/Me/` and mapping in `MyPetVenues.Api/Mappers/UserProfileMapper.cs`
- [ ] T047 [US2] Implement user profile data access in `MyPetVenues.Api/Data/Repositories/UserRepository.cs`
- [ ] T048 [US2] Implement current-user endpoints in `MyPetVenues.Api/Endpoints/MeEndpoints.cs`
- [ ] T049 [US2] Enforce ownership rules in endpoints using `MyPetVenues.Api/Auth/UserClaims.cs` (bookings/users per-user; venues policy documented)
- [ ] T050 [US2] Add API-backed service implementations in `MyPetVenues/Services/` (e.g., `ApiVenueService.cs`, `ApiBookingService.cs`, `ApiUserService.cs`) and switch DI in `MyPetVenues/Program.cs`
- [ ] T051 [US2] Update UI pages to use API-backed services and handle auth/loading/errors in `MyPetVenues/Pages/Venues.razor`, `MyPetVenues/Pages/VenueDetail.razor`, `MyPetVenues/Pages/BookVenue.razor`, `MyPetVenues/Pages/Profile.razor`
- [ ] T052 [US2] Add non-prod seed helper (optional) in `MyPetVenues.Api/Data/Seed/SeedData.cs` and wire behind a config flag

**Checkpoint**: US2 persistence works end-to-end.

---

## Phase 5: User Story 3 — Observability with App Insights + Logs (Priority: P3)

**Goal**: Maintainers can monitor health and troubleshoot using logs/metrics/traces.

**Independent Test**: Trigger a handled error and confirm logs/traces are visible and correlated.

- [ ] T053 [US3] Add telemetry packages to `MyPetVenues.Api/MyPetVenues.Api.csproj` (App Insights workspace-based via OpenTelemetry)
- [ ] T054 [US3] Configure tracing/logging/export in `MyPetVenues.Api/Program.cs`
- [ ] T055 [P] [US3] Add request logging + correlation helpers in `MyPetVenues.Api/Infrastructure/LoggingExtensions.cs`
- [ ] T056 [US3] Log Cosmos diagnostics (slow/failure) in `MyPetVenues.Api/Data/Repositories/*.cs`
- [ ] T057 [US3] Add observability runbook in `specs/001-aca-modernization/runbook-observability.md`
- [ ] T058 [US3] Add Cosmos readiness check in `MyPetVenues.Api/Health/CosmosHealthCheck.cs` and register in `MyPetVenues.Api/Program.cs`
- [ ] T059 [US3] Update operational troubleshooting section in `specs/001-aca-modernization/quickstart.md` (where to find logs/traces)

**Checkpoint**: Maintainers can diagnose incidents quickly.

---

## Phase 6: User Story 4 — Secretless operation (Priority: P4)

**Goal**: Operate the app without storing credentials/secrets in repo or runtime configuration.

**Independent Test**: Deploy from clean checkout without secrets; confirm Cosmos access uses managed identity and no keys/connection strings are required.

- [ ] T060 [US4] Ensure Cosmos access uses managed identity only in `MyPetVenues.Api/Data/Cosmos/CosmosClientFactory.cs` (no keys)
- [ ] T061 [US4] Disable Cosmos local auth and avoid key outputs in `infra/modules/cosmos.bicep`
- [ ] T062 [US4] Enable system-assigned identity and least-privilege role assignment in `infra/modules/containerapps.bicep`
- [ ] T063 [US4] Add security runbook (what is/isn’t a secret) in `specs/001-aca-modernization/runbook-security.md`
- [ ] T064 [US4] Remove/avoid any connection string settings in `MyPetVenues.Api/appsettings.json` (document required non-secret values only)
- [ ] T065 [US4] Document “no secrets” policy in `how2.md`

**Checkpoint**: Secretless requirements satisfied.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T066 [P] Replace placeholder story titles in `specs/001-aca-modernization/spec.md` (fill the [Brief Title] fields)
- [ ] T067 Update build/run commands for the new host in `specs/001-aca-modernization/quickstart.md`
- [ ] T068 [P] Add a basic smoke test script in `scripts/smoke-test.ps1` (calls `/api/ping` and a couple of read endpoints)
- [ ] T069 Update quickstart smoke checks for persistence flows in `specs/001-aca-modernization/quickstart.md`
- [ ] T070 [P] Expand infra docs (parameters/outputs) in `infra/README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) → Foundational (Phase 2) → User stories (Phases 3–6) → Polish (Phase 7)

### User Story Dependency Graph

- US1 (Deploy + HTTPS + Entra) is the MVP slice and the base for verifying hosting.
- US2 (Cosmos persistence) depends on Foundational and requires Cosmos IaC.
- US3 (Observability) depends on having the API host running and monitoring resources provisioned.
- US4 (Secretless) is cross-cutting but should be validated after US1/US2 wiring is in place.

### Parallel Opportunities (Examples)

- Phase 1: T003, T004, T005 can run in parallel.
- Phase 2: T013, T015, T016, T019, T020, T021, T023 can run in parallel.
- US1: T025 and T026 can run in parallel while T024 is being authored.
- US2: Contract DTO creation tasks (T037, T040, T043, T046) can be parallelized once `MyPetVenues.Shared` exists.
- US3: T055 can run in parallel with T053/T054.

## Parallel Execution Example: US2

- In parallel (after T011–T012):
  - T037 in `MyPetVenues.Shared/Contracts/Venues/`
  - T040 in `MyPetVenues.Shared/Contracts/Reviews/`
  - T043 in `MyPetVenues.Shared/Contracts/Bookings/`
  - T046 in `MyPetVenues.Shared/Contracts/Me/`

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2
2. Implement US1 (Phase 3) and validate against its independent test
3. Then proceed with US2 → US3 → US4

### Incremental Delivery

- Each user story phase should end with a deploy + manual acceptance run using the scenarios in `spec.md`.
