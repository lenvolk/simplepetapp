---
description: "Use when building or modifying the MyPetVenues REST API: controller patterns, error handling, DTOs, and service wiring."
applyTo: "MyPetVenues.Api/**"
---
# API Conventions

## Controllers

- One controller per domain: `VenuesController`, `BookingsController`, `UsersController`
- Use `[ApiController]` + `[Route("api/[controller]")]`
- Return `ActionResult<T>` — use `Ok()`, `NotFound()`, `BadRequest()` explicitly
- Inject services via constructor, never `@inject`

## DTOs & Shared Models

- Request/response DTOs live in `MyPetVenues.Shared/`
- Domain models stay in `MyPetVenues/Models/` — don't expose them directly from API
- Map between domain models and DTOs in the controller or a mapping service

## Error Handling

- Use `ProblemDetails` for error responses (built into `[ApiController]`)
- Validate inputs with data annotations on DTOs
- Never return raw exceptions to clients

## Service Layer

- Reuse `IVenueService`, `IBookingService`, `IUserService` interfaces from `MyPetVenues/Services/`
- Real implementations replace `Mock*` classes — same interface, different registration in API `Program.cs`
- All methods remain `Task<T>` (async all the way)
