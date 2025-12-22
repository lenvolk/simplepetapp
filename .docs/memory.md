# MyPetVenues Project Memory

## Project Summary
A pet-friendly location discovery platform ("Yelp/Meetup for pets") - Blazor WebAssembly app.

## Progress
- [x] Created PRD (prd.md) - high-level product requirements
- [x] Full Blazor WebAssembly application implementation
- [x] Modern pink gradient theme with light/dark mode
- [x] All core pages: Home, Venues, Venue Detail, Profile, Booking
- [x] Reusable components: VenueCard, ReviewCard, StarRating, SearchFilters, etc.
- [x] Mock data services for venues, users, and bookings
- [x] Responsive design for mobile and desktop
- [x] Speckit clarify/plan started for `specs/001-aca-modernization` (ACA + Entra + Cosmos + App Insights)

## Implementation Summary

### Pages
- **Home.razor**: Hero section, quick search, venue categories, featured venues, testimonials, CTA
- **Venues.razor**: Search/filter results page with grid layout
- **VenueDetail.razor**: Full venue info with reviews, amenities, booking CTA
- **Profile.razor**: User profile with tabs for pets, favorites, bookings, settings
- **BookVenue.razor**: Multi-step booking wizard

### Components
- VenueCard, VenueTypeBadge, PetBadge, AmenityTag, StarRating, ReviewCard, SearchFilters

### Services (SOLID principles)
- IVenueService / MockVenueService
- IUserService / MockUserService  
- IBookingService / MockBookingService
- IThemeService / ThemeService

### Styling
- CSS Variables for light/dark themes
- Scoped CSS for each component
- Plus Jakarta Sans font
- Pink gradient accent colors

## Dev Notes
- Added repo-local NuGet.config to restore packages from nuget.org
- Images available in wwwroot/images/pets and wwwroot/images/venues

## Key Decisions
- Named the product "MyPetVenues"
- Blazor WebAssembly for SPA experience
- Mock services for demo data
- Dark pink gradient theme

## Modernization: 001-aca-modernization
- Target hosting: Azure Container Apps (non-prod scope for this feature)
- Auth: Microsoft Entra ID required for all access
- App-to-Azure: system-assigned managed identity
- Persistence: Azure Cosmos DB (SQL API)
- Observability: Application Insights (workspace-based)
- Planning artifacts created in `specs/001-aca-modernization/`:
	- `plan.md`, `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

## Agent Orchestration
- Added an ACA orchestration agent: `.github/agents/aca.orchestrator.agent.md`
- Added sub-agents in `.github/agents/sub-agents/` for wave planning, parallel runs, sequential runs, and wave checks
- Added a scratchpad log file: `.docs/orchestrator-runlog.md`

