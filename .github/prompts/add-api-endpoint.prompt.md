---
description: "Scaffold a new API endpoint in MyPetVenues.Api with controller, service interface, DI registration, and shared DTO"
agent: "agent"
argument-hint: "Describe the endpoint (e.g., GET /api/venues/search with query params)"
---
Scaffold a new API endpoint for **MyPetVenues.Api**:

1. Create or update a controller in `MyPetVenues.Api/Controllers/`
2. Add a DTO in `MyPetVenues.Shared/` if the endpoint needs a request/response model
3. Add or extend the service interface in `MyPetVenues/Services/` and wire it into `Program.cs`
4. Follow existing conventions:
   - Interface-based DI, `Task<T>` return types
   - Nullable reference types enabled
   - Use `[ApiController]` and `[Route("api/[controller]")]`
   - Return `ActionResult<T>` with proper status codes

Endpoint to create: {{ input }}
