# PRD: MyPetVenues

## 1. Product overview

### 1.1 Document title and version

- PRD: MyPetVenues
- Version: 2.0

### 1.2 Product summary

MyPetVenues is a community-driven platform for discovering, contributing, and reviewing pet-friendly locations and experiences. It offers rich search, amenity tagging, map and list views, and social proof tailored for pet owners. The platform extends beyond discovery to include user profiles, pet profiles, favorites, reviews, and optional bookings and events.

## 2. Goals

### 2.1 Business goals

- Become the trusted destination for pet-friendly venue discovery and reviews
- Grow verified venue inventory and engaged contributors
- Enable future monetization via premium listings, ads, and affiliate/booking revenue

### 2.2 User goals

- Find trustworthy pet-friendly locations quickly with relevant amenities
- Share experiences and photos to help the community
- Save favorites, manage pets, and plan outings or trips with confidence

### 2.3 Non-goals

- Full-scale community moderation tooling (advanced ML moderation) in v2
- Native mobile apps (responsive web only for v2)
- Payments processing for bookings (handled by partner links in v2)

## 3. User personas

### 3.1 Key user types

- **Pet parent**: Owns pets, seeks venues, shares reviews, saves favorites
- **Venue owner**: Claims or submits venues, responds to reviews, updates amenity info
- **Moderator/admin**: Reviews submissions, handles reports, curates featured content

### 3.2 Persona details

- **Pet parent**: Busy, mobile-first, seeks trustworthy reviews and amenity details; values quick filters and photos
- **Venue owner**: Business-focused, wants visibility and accurate representation; needs simple claim/update flows

### 3.3 Role-based access

- **Guest**: Browse, search, view reviews
- **Registered user**: All guest actions + add venues, write reviews, save favorites, manage pets
- **Moderator/admin**: Approve/reject venues/reviews, edit or remove content, feature venues

## 4. Functional requirements

### 4.1 Location discovery (High)

- Search by text, city, and venue type
- Filters: pet type, amenities, rating, distance
- Map and list views; "near me" geolocation
- Venue details: policies, amenities, hours, contact, photos, reviews

### 4.2 Add locations (High)

- Submit new venue with required fields (name, address, type, pets accepted, amenities, policies)
- Upload photos; tag amenities with curated taxonomy
- Moderation queue and status updates for submitter

### 4.3 Reviews and ratings (High)

- Star rating and structured tags (cleanliness, staff, space)
- Text reviews with photos; edit/delete own review
- Helpful votes and report abuse

### 4.4 User and pet profiles (Medium)

- User profile: avatar, bio, location, preferences
- Pet profiles: name, type, breed, age, photo
- Favorites and review history

### 4.5 Bookings and events (Medium)

- Link out to partner booking sites or embedded booking widget (no payments in v2)
- Events/meetups listing and RSVP (optional, behind feature flag)

### 4.6 Moderation and admin (Medium)

- Approve/reject venues and reviews; edit key fields
- View reports; soft-delete content
- Feature venues on homepage

### 4.7 Notifications (Medium)

- Email/onsite notifications: submission status, review responses, featured placements

### 4.8 Accessibility and localization (Low)

- WCAG AA basics; support US English (extendable)

## 5. User experience

### 5.1 Key flows

- Discover: Search → Filter → Map/List → Venue detail → Reviews → Save/Book
- Contribute: Add venue → Submit → Status updates
- Review: Write review → Attach photos → Submit → Edit/Delete
- Profile: Manage user and pet profiles → Favorites → History

### 5.2 Navigation

- Primary nav: Venues, Add place, Profile, Bookings/Events (conditional)
- Venue detail highlights: hero with rating, pets accepted badges, amenity tags, call-to-action

## 6. Narrative

Julia wants a dog-friendly brunch spot nearby. She searches "brunch" with dog filter, sees a map and list, opens a venue, checks pet policy and amenities, reads reviews with dog photos, saves it, and later leaves her own review with photos.

## 7. Success metrics

- MAU and search-to-click-through rate
- Venue submissions approved per week and time-to-approve
- Reviews per venue and helpful votes
- Favorites saved per user and return visits

## 8. Technical considerations

- Frontend: Blazor WebAssembly (existing), responsive design
- Backend: .NET minimal APIs; authentication via OAuth (Google/Apple) + email magic link
- Data: Azure Cosmos DB (venues, reviews, users, pets) with hierarchical partition keys (e.g., tenant/region → city → venueId)
- Search: Azure Cognitive Search or Cosmos integrated indexing for geo + text; consider Azure Maps for map tiles/geocoding
- Media: Blob Storage for images with CDN
- Observability: App Insights telemetry; structured logging

## 9. Milestones and sequencing

### 9.1 Estimate and team

- Size: Medium (3-6 weeks)
- Team: 1 PM, 2-3 engineers (full-stack), 1 designer, shared QA

### 9.2 Phases

- **Phase 1 - Core (3 weeks)**: Search, venue detail, reviews, add venue, profiles, moderation basics
- **Phase 2 - Enhancements (2 weeks)**: Map view, geolocation, notifications, favorites, amenity taxonomy
- **Phase 3 - Growth (1 week)**: Bookings/events links, featured venues, analytics dashboards

## 10. User stories

### 10.1 Discovery

- **GH-001**: As a guest, I can search venues by city/text to find relevant pet-friendly places.
  - Given I am on the venues page, when I search by city/text, then I see a list of matching venues with pets accepted and ratings.
- **GH-002**: As a user, I can filter by pet type, amenity, and distance to narrow results.
  - Given search results are shown, when I apply filters, then results update and filters are clearly indicated.
- **GH-003**: As a user, I can view venues on a map and list simultaneously.
  - Given I toggle map view, when I pan/zoom, then the list syncs to shown map bounds.
- **GH-004**: As a user, I can view venue details with policies, amenities, photos, and reviews.
  - Given I open a venue, when details load, then I see policies, amenities, hours, contact, and reviews.

### 10.2 Contribution

- **GH-005**: As a registered user, I can submit a new venue with required fields and amenities.
  - Given I fill required fields, when I submit, then I see a success state and the venue enters moderation.
- **GH-006**: As a moderator, I can approve/reject venue submissions with notes.
  - Given a pending submission, when I approve or reject, then the submitter is notified and the venue appears (if approved).

### 10.3 Reviews

- **GH-007**: As a user, I can post a star rating, structured tags, text, and photos.
  - Given I complete required fields, when I submit, then my review appears and updates aggregate rating.
- **GH-008**: As a user, I can edit or delete my review.
  - Given my existing review, when I edit or delete, then changes persist and audit trail retains history.
- **GH-009**: As a user, I can mark reviews as helpful or report abuse.
  - Given a review, when I click helpful or report, then the system records my vote and updates state.

### 10.4 Profiles and pets

- **GH-010**: As a user, I can create and update my profile.
  - Given profile fields, when I save, then the profile persists and is shown on my reviews.
- **GH-011**: As a user, I can add and manage pet profiles.
  - Given pet fields, when I add/edit, then pets appear in my profile and can be referenced in reviews/bookings.
- **GH-012**: As a user, I can favorite venues.
  - Given a venue, when I favorite/unfavorite, then it appears in my favorites list and persists.

### 10.5 Bookings and events

- **GH-013**: As a user, I can follow a booking link or widget from a venue.
  - Given a venue with booking info, when I click book, then I am taken to the partner flow or widget loads.
- **GH-014**: As a user, I can browse events/meetups and RSVP.
  - Given events are enabled, when I RSVP, then my RSVP is stored and visible on the event.

### 10.6 Moderation

- **GH-015**: As a moderator, I can review reported content and take action.
  - Given reported content, when I review and act, then the content is removed/retained and reporter is acknowledged.

### 10.7 Authentication and security

- **GH-016**: As a user, I can sign up/sign in via OAuth or magic link.
  - Given auth is available, when I authenticate, then I gain registered capabilities and my session is secured.

## 11. Non-functional requirements

- **Performance**: P95 venue search < 1s server-side; map interactions under 200ms client updates
- **Availability**: 99.5% for core APIs
- **Security**: OAuth 2.0, TLS, rate limiting, content safety checks
- **Privacy/compliance**: GDPR basics (export/delete account), COPPA not targeted
- **Accessibility**: WCAG 2.1 AA basics

## 12. Data model (conceptual)

- Venue: id, name, address, geo (lat/lng), type, petsAccepted[], amenities[], policies, hours, contact, images[], rating, reviewCount, featured
- Review: id, venueId, userId, rating, tags{}, text, photos[], helpfulCount, reports[], createdAt
- User: id, name, email, avatar, bio, location, preferences, pets[], favorites[], roles
- Pet: id, name, type, breed, age, image
- Event (optional): id, venueId, title, description, datetime, capacity, attendees[]

## 13. Analytics and experimentation

- Track search queries, filter usage, venue detail views, review submissions, favorites
- Funnel: search → detail → favorite/review
- A/B tests: homepage hero, featured venues ordering

## 14. Risks and open questions

- Risk: Geocoding/map provider costs and rate limits
- Risk: Moderation burden for UGC; need tooling
- Open: Which map provider (Azure Maps vs Mapbox)?
- Open: Booking partners and events scope in v2?

## 15. Validation checklist

- User stories testable with Given-When-Then ✓
- Acceptance criteria specific ✓
- Auth requirements included ✓
- Non-functional requirements captured ✓
- Title case only in main title; no horizontal rules ✓
