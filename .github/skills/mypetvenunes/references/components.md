# MyPetVenues Component Reference

## Component Location

All reusable components: `MyPetVenues/Components/`

## Component Catalog

### VenueCard
**File:** `Components/VenueCard.razor`
**Purpose:** Display venue in grid/list layouts

```razor
<VenueCard 
    Venue="@venue" 
    IsFeatured="true" 
    OnClick="() => NavigateToVenue(venue.Id)" />
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Venue | Venue | Yes | Venue data object |
| IsFeatured | bool | No | Show featured badge |
| OnClick | EventCallback | No | Click handler |

### StarRating
**File:** `Components/StarRating.razor`
**Purpose:** Display 5-star rating

```razor
<StarRating Rating="@Venue.Rating" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| Rating | double | Yes |

### PetBadge
**File:** `Components/PetBadge.razor`
**Purpose:** Show accepted pet type icon

```razor
<PetBadge Type="@PetType.Dog" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| Type | PetType | Yes |

### VenueTypeBadge
**File:** `Components/VenueTypeBadge.razor`
**Purpose:** Show venue category badge

```razor
<VenueTypeBadge Type="@VenueType.Park" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| Type | VenueType | Yes |

### AmenityTag
**File:** `Components/AmenityTag.razor`
**Purpose:** Display individual amenity pill

```razor
<AmenityTag Amenity="@amenity" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| Amenity | string | Yes |

### ReviewCard
**File:** `Components/ReviewCard.razor`
**Purpose:** Display user review with rating

```razor
<ReviewCard Review="@review" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| Review | Review | Yes |

### SearchFilters
**File:** `Components/SearchFilters.razor`
**Purpose:** Search form with filters

```razor
<SearchFilters OnSearch="HandleSearch" />
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| OnSearch | EventCallback<(string?, VenueType?, PetType?)> | Yes |

## Layout Components

**Location:** `MyPetVenues/Layout/`

### MainLayout
**File:** `Layout/MainLayout.razor`
**Purpose:** App shell with theme support

Key features:
- Theme-aware container (`.app-container.dark-mode` or `.light-mode`)
- Includes Header and Footer
- Wraps `@Body` content

### Header
**File:** `Layout/Header.razor`
**Purpose:** Navigation bar with theme toggle

Features:
- Logo/brand link
- Navigation links (Home, Venues, Profile)
- Theme toggle button (sun/moon)

### Footer
**File:** `Layout/Footer.razor`
**Purpose:** Site footer with links

## Component Creation Pattern

New components should follow this structure:

```razor
@* ComponentName.razor *@
@using MyPetVenues.Models

<div class="component-name">
    @* Content *@
</div>

@code {
    [Parameter, EditorRequired]
    public RequiredType RequiredProp { get; set; } = default!;

    [Parameter]
    public OptionalType? OptionalProp { get; set; }

    [Parameter]
    public EventCallback OnEvent { get; set; }
}
```

**Scoped CSS file:** `ComponentName.razor.css`

## Component CSS Conventions

Each component has a scoped CSS file using CSS variables from `app.css`:

```css
.component-name {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    box-shadow: 0 4px 20px var(--shadow-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.component-name:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px var(--shadow-hover);
}
```

## Common Component Patterns

**Iterating with index limit:**
```razor
@foreach (var amenity in Venue.Amenities.Take(3))
{
    <AmenityTag Amenity="@amenity" />
}
@if (Venue.Amenities.Count > 3)
{
    <span class="more">+@(Venue.Amenities.Count - 3) more</span>
}
```

**Conditional rendering:**
```razor
@if (IsFeatured)
{
    <div class="featured-badge">⭐ Featured</div>
}
```

**Click handlers:**
```razor
<div class="card" @onclick="OnClick">
```
