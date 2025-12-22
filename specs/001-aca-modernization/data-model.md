# Phase 1 Data Model (Cosmos DB)

## Overview
Core entities come from the existing in-app models:
- `Venue`
- `Review`
- `Booking`
- `User`

This feature introduces durable storage using Azure Cosmos DB (SQL API). Because Cosmos DB item IDs are strings and Entra-authenticated user identity is naturally a GUID/string (`oid`), the persisted model should use string identifiers at the storage boundary (even if UI keeps `int` IDs initially).

## Container strategy
Prefer separate containers per aggregate to keep partitioning aligned to access patterns and avoid heterogeneous indexing surprises.

### Container: `venues`
**Partition key:** `/city`

**Why:** Venue listing is commonly filtered by city; `/city` is higher-cardinality than `type` and aligns to query patterns.

**Item shape:**
- `id`: string (unique)
- `name`: string
- `description`: string
- `address`: string
- `city`: string
- `phone`, `email`, `website`: string
- `imageUrl`: string
- `type`: string (enum serialized)
- `acceptedPets`: string[]
- `amenities`: string[]
- `petPolicy`: string
- `hours`: string
- `rating`: number
- `reviewCount`: number
- `isFeatured`: boolean
- `latitude`, `longitude`: number
- `pricePerHour`: number
- `createdAt`, `updatedAt`: ISO 8601 strings

**Indexes/queries to support:**
- List venues by `city` (partition-scoped)
- Filter by `type`, `isFeatured`
- Fetch by `id` (cross-partition lookup unless `city` is known; UI should include `city` in links or resolve via point-read by `id` if necessary)

### Container: `reviews`
**Partition key:** `/venueId`

**Why:** Reviews are viewed by venue; partitioning by venue keeps reads/write localized.

**Item shape:**
- `id`: string
- `venueId`: string
- `userId`: string (Entra `oid`)
- `userName`: string
- `userAvatar`: string
- `petName`: string
- `petType`: string
- `rating`: number
- `comment`: string
- `datePosted`: ISO 8601
- `photos`: string[]
- `helpfulCount`: number

### Container: `bookings`
**Partition key:** `/userId`

**Why:** Bookings are primarily accessed in “My bookings”; partitioning by user enables efficient user-scoped queries.

**Item shape:**
- `id`: string
- `userId`: string (Entra `oid`)
- `venueId`: string
- `venueName`, `venueImage`: string
- `bookingDate`: ISO 8601 date
- `startTime`, `endTime`: strings (or minutes since midnight)
- `numberOfPets`: number
- `petNames`: string[]
- `specialRequests`: string
- `status`: string
- `totalPrice`: number
- `createdAt`: ISO 8601

### Container: `users`
**Partition key:** `/id`

**Why:** One user per partition is acceptable; updates and reads are typically per-user.

**Item shape:**
- `id`: string (Entra `oid`)
- `name`, `email`, `avatar`, `bio`, `location`: string
- `joinedDate`: ISO 8601
- `pets`: array of `{ id, name, type, breed, age, imageUrl }`
- `favoriteVenueIds`: string[]
- `preferences`: object

## Validation rules
- `Venue.city` required and non-empty (partition key).
- `Review.venueId` required.
- `Booking.userId` required.
- All writes must enforce ownership rules:
  - `User` updates only by the same authenticated user.
  - `Booking` operations only by the same authenticated user.
  - Venue create/update policy is TBD (operator-only vs any authenticated user).

## State transitions
- `Booking.status`: `Pending → Confirmed|Cancelled → Completed`.

## Cosmos DB security and access
- Use Entra-based RBAC (data plane) for app access.
- Prefer disabling local authentication methods on the Cosmos account to avoid key usage.
