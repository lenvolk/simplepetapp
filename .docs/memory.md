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

## Current Task: Playwright Testing
**Started:** February 1, 2026
**Status:** In Progress

### Tests Planned
- [ ] Home page navigation and layout
- [ ] Venue search and filtering
- [ ] Venue detail page navigation
- [ ] Pet profile viewing
- [ ] Booking flow interaction
- [ ] Navigation menu functionality
- [ ] Responsive design elements

### Progress
- App URL: http://localhost:5050
- Status: Starting application and browser testing
