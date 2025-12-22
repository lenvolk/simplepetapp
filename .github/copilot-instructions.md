# Copilot Coding Agent Instructions for simkplepetapp

## Project Overview
This is a .NET Blazor application for pet venue management. The main project is located in `MyPetVenues/`, with a clear separation of concerns:
- **Components**: Reusable UI elements (e.g., `VenueCard.razor`, `PetBadge.razor`)
- **Pages**: Route-based views (e.g., `Venues.razor`, `BookVenue.razor`)
- **Services**: Business logic and data access (e.g., `VenueService.cs`, `BookingService.cs`)
- **Models**: Core data structures (`Venue.cs`, `Booking.cs`, `User.cs`, `Review.cs`)
- **Layout**: Shared UI structure (`MainLayout.razor`, `Header.razor`, `Footer.razor`)

## Build & Run
- **Build**: Use `dotnet build MyPetVenues/MyPetVenues.csproj` from the workspace root.
- **Run**: Use `dotnet run --project MyPetVenues/MyPetVenues.csproj` from the workspace root.
- **Solution file**: `simkplepetapp.sln` ties together all projects (currently only `MyPetVenues`).

## Key Patterns & Conventions
- **Component CSS**: Each `.razor` file may have a matching `.razor.css` for scoped styles.
- **Service Injection**: Services are registered in `Program.cs` and injected via DI in components/pages.
- **Routing**: Page files in `Pages/` use Blazor routing (`@page` directive).
- **Data Flow**: UI components receive data via parameters and interact with services for business logic.
- **Static Assets**: Use `wwwroot/` for images and CSS. Reference assets with relative paths in components/pages.

## Integration Points
- **No external database detected**: Data is likely in-memory or stubbed; update instructions if persistent storage is added.
- **No test project detected**: Add test instructions if/when tests are introduced.
- **NuGet dependencies**: Managed via `NuGet.config` and `.csproj` files.

## Examples
- To add a new venue type badge, create a new `.razor` and `.razor.css` in `Components/`, then update relevant pages/services.
- To add a new page, create a `.razor` in `Pages/` with an `@page` directive and link it in navigation.

## Recommendations for AI Agents
- Prefer updating or creating files in the correct subfolder (`Components`, `Pages`, `Services`, etc.)
- Follow existing naming conventions for files and classes.
- Reference and reuse existing components and services where possible.
- When introducing new features, update navigation and service registration as needed.
- If unsure about a pattern, check for similar implementations in the relevant folder.

---
If any section is unclear or missing, please provide feedback or specify what needs to be improved.