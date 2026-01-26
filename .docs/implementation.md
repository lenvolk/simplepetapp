# MyPetVenues - Full Build Implementation Plan

> 🎯 **Purpose**: Build the complete MyPetVenues Blazor WebAssembly app from scratch using multi-agent orchestration
> ⏱️ **Estimated Time**: 25-35 minutes total (with parallel execution)
> 🎓 **Difficulty**: Intermediate (L300)
> 🤖 **Mode**: Fully Autonomous - No User Interaction Required

---

## 📋 Overview

This implementation plan guides an **orchestrator agent** to build the entire MyPetVenues application using **parallel Background CLI Agents**. Each wave contains independent tasks that execute simultaneously, maximizing efficiency.

**Optimization**: Between waves, use **subagent research** to analyze completed work and enrich prompts for the next wave. This reduces errors and improves agent accuracy.

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        BUILD ARCHITECTURE                                   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   WAVE 0: Foundation (Parallel)                                            │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │
│   │   Agent 1    │  │   Agent 2    │  │   Agent 3    │                    │
│   │  Project +   │  │   Models &   │  │  Global CSS  │                    │
│   │  Structure   │  │    Enums     │  │  & Tokens    │                    │
│   └──────────────┘  └──────────────┘  └──────────────┘                    │
│          │                 │                 │                             │
│          └─────────────────┴─────────────────┘                             │
│                            │                                               │
│   WAVE 1: Services & Layout (Parallel)                                     │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │
│   │   Agent 4    │  │   Agent 5    │  │   Agent 6    │                    │
│   │   Services   │  │   Layout     │  │   Theme      │                    │
│   │  (Venue,etc) │  │  (H/F/Main)  │  │   Service    │                    │
│   └──────────────┘  └──────────────┘  └──────────────┘                    │
│          │                 │                 │                             │
│          └─────────────────┴─────────────────┘                             │
│                            │                                               │
│   WAVE 2: Components (Parallel)                                            │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                  │
│   │Agent 7 │ │Agent 8 │ │Agent 9 │ │Agent10 │ │Agent11 │                  │
│   │Venue   │ │Star    │ │Review  │ │Search  │ │Badges  │                  │
│   │Card    │ │Rating  │ │Card    │ │Filters │ │& Tags  │                  │
│   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘                  │
│          │         │         │         │         │                         │
│          └─────────┴─────────┴─────────┴─────────┘                         │
│                            │                                               │
│   WAVE 3: Pages (Parallel)                                                 │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                  │
│   │Agent12 │ │Agent13 │ │Agent14 │ │Agent15 │ │Agent16 │                  │
│   │ Home   │ │Venues  │ │Detail  │ │Profile │ │Booking │                  │
│   │ Page   │ │ Page   │ │ Page   │ │ Page   │ │ Page   │                  │
│   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘                  │
│          │         │         │         │         │                         │
│          └─────────┴─────────┴─────────┴─────────┘                         │
│                            │                                               │
│   WAVE 4: Integration & Polish                                             │
│   ┌──────────────────────────────────────────────┐                        │
│   │              Agent 17 (Single)                │                        │
│   │  Wire up App.razor, Program.cs, final test   │                        │
│   └──────────────────────────────────────────────┘                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Requirements

> **CRITICAL**: Follow `.github/instructions/frontend-design.instructions.md`

- **Font**: Plus Jakarta Sans (beautiful, not generic)
- **Theme**: Pink gradient with purple accents (`--accent-primary: #db2777`)
- **Animations**: Smooth hover effects, staggered reveals, micro-interactions
- **Backgrounds**: Layered gradients, not flat colors
- **Both Modes**: Light and dark themes with CSS variables

---

## 🚀 Pre-Flight Check

Before starting, the orchestrator must verify:

```powershell
# 1. Copilot CLI installed
copilot --version

# 2. .NET 9 SDK available
dotnet --version

# 3. Git initialized
git status

# 4. Clean workspace (run cleanup.ps1 if needed)
# Only MyPetVenues.Api/, MyPetVenues.Shared/, .docs/, .github/, .vscode/ should exist

# 5. CRITICAL: Initialize report.xlsx from template
# Either run cleanup.ps1 OR manually copy:
Copy-Item ".docs/report-template.xlsx" ".docs/report.xlsx"
```

---

## ⚠️ KNOWN ISSUES & FIXES (From Previous Builds)

> **CRITICAL**: The orchestrator MUST apply these fixes after each wave merge to prevent build failures.

### Wave 0 Common Issues

#### Issue 0.1: _Imports.razor Forward References
**Problem**: Agent creates `_Imports.razor` with `@using MyPetVenues.Components` and `@using MyPetVenues.Layout` before those namespaces exist.

**Fix**: After Wave 0 merge, edit `_Imports.razor` to only include:
```razor
@using System.Net.Http
@using System.Net.Http.Json
@using Microsoft.AspNetCore.Components.Forms
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.Web
@using Microsoft.AspNetCore.Components.Web.Virtualization
@using Microsoft.AspNetCore.Components.WebAssembly.Http
@using Microsoft.JSInterop
@using MyPetVenues
@using MyPetVenues.Models
```

Then after Wave 1, add:
```razor
@using MyPetVenues.Services
@using MyPetVenues.Layout
```

And after Wave 2, add:
```razor
@using MyPetVenues.Components
```

#### Issue 0.2: Missing MainLayout Reference
**Problem**: `App.razor` references `MainLayout` before it exists.

**Fix**: Create placeholder `Layout/MainLayout.razor` in Wave 0:
```razor
@inherits LayoutComponentBase
<main>@Body</main>
```

---

### Wave 1 Common Issues

#### Issue 1.1: Service/Model Property Mismatch
**Problem**: Agents creating services may invent properties not in the actual models.

**Common mismatches**:
| Agent Invents | Actual Model Has |
|---------------|------------------|
| `Venue.Photos` | `Venue.ImageUrl` (single string) |
| `Venue.Location` | `Venue.Address` + `Venue.City` |
| `Venue.Types` | `Venue.Type` (single VenueType) |
| `Review.Date` | `Review.VisitDate` |
| `User.Avatar` | `User.ProfileImageUrl` |

**Fix**: After Wave 0, use subagent research to get exact model properties, then include them in Wave 1 agent prompts:
```
EXACT MODEL PROPERTIES (use these, not invented ones):
- Venue: Id, Name, Description, Address, City, ImageUrl, Rating, ReviewCount, Type, AllowedPets, Amenities, OpeningHours, IsFeatured, ContactPhone, Website
- Review: Id, VenueId, UserId, UserName, Rating, Comment, VisitDate, PetName
- User: Id, Name, Email, ProfileImageUrl, Pets, FavoriteVenueIds, Bookings
```

#### Issue 1.2: Missing Service Interfaces
**Problem**: Agent creates implementation but forgets interface, or vice versa.

**Fix**: Explicitly require both in agent prompt:
```
Create BOTH:
1. IVenueService interface with method signatures
2. MockVenueService class implementing IVenueService
```

---

### Wave 2 Common Issues

#### Issue 2.1: Incorrect Enum Values
**Problem**: Agents use wrong enum values (e.g., `PetType.Small` instead of `PetType.SmallPet`).

**Exact enum values to use**:
```csharp
// VenueType enum values:
Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic

// PetType enum values:
Dog, Cat, Bird, Rabbit, SmallPet, All  // NOT "Small"!

// BookingStatus enum values:
Pending, Confirmed, Cancelled, Completed
```

**Fix**: Include exact enum values in Wave 2 agent prompts:
```
CRITICAL - Use these EXACT enum values:
- VenueType: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- PetType: Dog, Cat, Bird, Rabbit, SmallPet, All (NOT "Small"!)
```

#### Issue 2.2: Component Parameter Type Mismatches
**Problem**: Components expect `List<PetType>` but receive `PetType[]`, or similar.

**Fix**: Use consistent types in agent prompts:
```
Parameter types to use:
- AllowedPets: List<PetType> (use .ToList() if needed)
- Amenities: List<string>
- Rating: double (not float, not decimal)
```

---

### Wave 3 Common Issues

#### Issue 3.1: Escaped Quotes in Razor Lambda Expressions
**Problem**: Agents generate escaped quotes in Razor files causing CS1646/CS1525 errors.

**Bad code**:
```razor
<button @onclick="() => SetActiveTab(\"pets\")">  <!-- WRONG! -->
```

**Good code**:
```razor
<button @onclick='() => SetActiveTab("pets")'>   <!-- Correct: outer single quotes -->
<!-- OR -->
<button @onclick="@(() => SetActiveTab("pets"))">  <!-- Correct: @() wrapper -->
```

**Fix**: Add to Wave 3 agent prompts:
```
RAZOR SYNTAX RULES:
- For lambdas with string literals, use SINGLE QUOTES for outer attribute:
  @onclick='() => Method("value")'
- OR use @() wrapper:
  @onclick="@(() => Method("value"))"
- NEVER escape quotes inside Razor attributes!
```

#### Issue 3.2: Missing Service Injections
**Problem**: Pages use services without `@inject` directive.

**Fix**: Include required injections in agent prompts:
```
REQUIRED INJECTIONS for this page:
@inject IVenueService VenueService
@inject IUserService UserService
@inject NavigationManager NavigationManager
```

#### Issue 3.3: Null Reference in Async Loading
**Problem**: Pages render before async data loads, causing null reference.

**Fix**: Always include loading state pattern:
```razor
@if (venues == null)
{
    <p>Loading...</p>
}
else if (!venues.Any())
{
    <p>No venues found.</p>
}
else
{
    @foreach (var venue in venues) { ... }
}
```

---

### Wave 4 Common Issues

#### Issue 4.1: Missing Service Registrations
**Problem**: Services created but not registered in `Program.cs`.

**Required registrations**:
```csharp
builder.Services.AddSingleton<IThemeService, ThemeService>();
builder.Services.AddSingleton<IVenueService, MockVenueService>();
builder.Services.AddSingleton<IBookingService, MockBookingService>();
builder.Services.AddScoped<IUserService, MockUserService>();
```

#### Issue 4.2: Router NotFound Missing Layout
**Problem**: `NotFound` section doesn't use layout, causing blank page.

**Fix**:
```razor
<NotFound>
    <LayoutView Layout="typeof(MainLayout)">
        <p>Sorry, this page doesn't exist.</p>
    </LayoutView>
</NotFound>
```

---

### 🔧 Orchestrator Build Verification Checklist

After EACH wave merge, run:
```powershell
# 1. Build check
dotnet build MyPetVenues/MyPetVenues.csproj 2>&1

# 2. If errors, check for common issues above

# 3. Fix errors BEFORE starting next wave

# 4. Commit fixes
git add -A; git commit -m "Fix Wave N build errors"
```

**DO NOT proceed to next wave until build passes!**

### 📊 Report Tracking Setup

The orchestrator MUST use `.docs/report.xlsx` to track all agent activity. Use the **xlsx skill** (`.github/skills/xlsx/SKILL.md`) to update it.

| Sheet | What to Track | When to Update |
|-------|--------------|----------------|
| **Tasks** | All tasks with Type="Background CLI" or "Subagent" | After each task completes |
| **Waves** | Wave timing and agent count | After each wave completes |
| **Research** | Subagent research calls | After each subagent analysis |
| **Agents** | Background CLI Agent performance | After each agent completes |
| **Timeline** | All events chronologically | As events happen |

**Important for Demo**: The `Type` column distinguishes:
- `Background CLI` - Parallel worker agents in worktrees
- `Subagent` - Synchronous research within Copilot chat

This helps students understand **when each agent type is used** and their different purposes.

---

## 🌊 WAVE 0: Foundation (3 Parallel Agents)

### Task 0.1: Project Structure & Configuration

**Agent**: `agent-foundation`  
**Dependencies**: None  
**Estimated Time**: 3-4 minutes

**Deliverables**:
- Create `MyPetVenues/MyPetVenues.csproj` (.NET 9 Blazor WASM)
- Create `MyPetVenues/Program.cs` (minimal bootstrap)
- Create `MyPetVenues/App.razor` (router placeholder)
- Create `MyPetVenues/_Imports.razor` (common usings)
- Create `MyPetVenues/wwwroot/index.html` (SPA entry)
- Create folder structure: `Pages/`, `Components/`, `Layout/`, `Models/`, `Services/`

**Acceptance Criteria**:
- [ ] `dotnet build MyPetVenues/MyPetVenues.csproj` succeeds
- [ ] Project targets .NET 9 with Blazor WebAssembly
- [ ] Nullable and implicit usings enabled

**Agent Prompt**:
```
Create the MyPetVenues Blazor WebAssembly project structure.

Files to create:
1. MyPetVenues/MyPetVenues.csproj - .NET 9 Blazor WASM project
2. MyPetVenues/Program.cs - Minimal WebAssembly host builder
3. MyPetVenues/App.razor - Router with MainLayout reference
4. MyPetVenues/_Imports.razor - Common using statements
5. MyPetVenues/wwwroot/index.html - HTML host page with loading indicator
6. Create empty folders: Pages/, Components/, Layout/, Models/, Services/
7. MyPetVenues/Layout/MainLayout.razor - PLACEHOLDER (just @inherits LayoutComponentBase and <main>@Body</main>)

Requirements:
- Target net9.0
- Enable <Nullable>enable</Nullable>
- Enable <ImplicitUsings>enable</ImplicitUsings>
- Add Microsoft.AspNetCore.Components.WebAssembly package

⚠️ CRITICAL FOR _Imports.razor - ONLY include these namespaces (Components/Layout don't exist yet!):
@using System.Net.Http
@using System.Net.Http.Json
@using Microsoft.AspNetCore.Components.Forms
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Components.Web
@using Microsoft.AspNetCore.Components.Web.Virtualization
@using Microsoft.AspNetCore.Components.WebAssembly.Http
@using Microsoft.JSInterop
@using MyPetVenues
@using MyPetVenues.Models

DO NOT add @using MyPetVenues.Components or @using MyPetVenues.Layout yet!

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 0.2: Domain Models & Enums

**Agent**: `agent-models`  
**Dependencies**: None  
**Estimated Time**: 2-3 minutes

**Deliverables**:
- Create `MyPetVenues/Models/Venue.cs` (Venue class + VenueType, PetType enums)
- Create `MyPetVenues/Models/Review.cs` (Review class)
- Create `MyPetVenues/Models/Booking.cs` (Booking class + BookingStatus enum)
- Create `MyPetVenues/Models/User.cs` (User class + Pet class)

**Acceptance Criteria**:
- [ ] All models have proper nullable annotations
- [ ] VenueType enum includes: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- [ ] PetType enum includes: Dog, Cat, Bird, Rabbit, SmallPet, All

**Agent Prompt**:
```
Create domain models for MyPetVenues.

Files:
1. MyPetVenues/Models/Venue.cs
   - Id, Name, Description, Address, City, ImageUrl, Rating, ReviewCount
   - VenueType enum, List<PetType> AllowedPets, List<string> Amenities
   - OpeningHours dictionary, IsFeatured, ContactPhone, Website

2. MyPetVenues/Models/Review.cs
   - Id, VenueId, UserId, UserName, Rating, Comment, VisitDate, PetName

3. MyPetVenues/Models/Booking.cs
   - Id, UserId, VenueId, BookingDate, TimeSlot, NumberOfPets, Notes
   - BookingStatus enum (Pending, Confirmed, Cancelled, Completed)

4. MyPetVenues/Models/User.cs
   - Id, Name, Email, ProfileImageUrl, List<Pet> Pets
   - List<int> FavoriteVenueIds, List<Booking> Bookings
   - Pet class: Name, Type, Breed, Age, ImageUrl

Namespace: MyPetVenues.Models
Use nullable reference types properly.

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 0.3: Global Styles & Design Tokens

**Agent**: `agent-styles`  
**Dependencies**: None  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Create `MyPetVenues/wwwroot/css/app.css` with complete design system

**Design System Requirements** (from frontend-design.instructions.md):
- Plus Jakarta Sans font (Google Fonts import)
- CSS variables for all colors, spacing, radii, shadows
- Light mode (default) and dark mode tokens
- Animation keyframes (fadeIn, pulse, float, shimmer)
- Button styles (.btn-primary, .btn-secondary, .btn-outline)
- Focus states with 2px outlines and accent glow
- Reduced motion media query support
- Custom scrollbar styling
- Skip link for accessibility

**Acceptance Criteria**:
- [ ] Pink gradient theme (`--accent-primary: #db2777`)
- [ ] Complete dark mode with `.dark-mode` class
- [ ] All spacing uses `--space-*` variables
- [ ] Animations respect `prefers-reduced-motion`

**Agent Prompt**:
```
Create the complete design system in MyPetVenues/wwwroot/css/app.css.

CRITICAL: Follow .github/instructions/frontend-design.instructions.md
- Font: Plus Jakarta Sans (import from Google Fonts)
- Theme: Pink gradient with purple accents
- NOT generic - make it beautiful and unique!

Include:
1. CSS Variables (:root and .dark-mode)
   - Brand: --accent-primary (#db2777), --accent-secondary (#9333ea)
   - Surfaces: --bg-primary, --bg-secondary, --bg-gradient, --card-bg
   - Typography: --text-primary, --text-secondary, --text-muted
   - Spacing: --space-1 through --space-16
   - Radii: --radius-sm through --radius-full
   - Shadows: --shadow-xs through --shadow-xl
   - Transitions: --transition-fast, --transition-base, --transition-slow

2. Base styles
   - Reset (* { margin: 0; padding: 0; box-sizing: border-box; })
   - Body with gradient background
   - Typography (h1-h6, p, a)
   - Skip link for accessibility
   - Focus states with glow effect

3. Button system
   - .btn base styles
   - .btn-primary (gradient background)
   - .btn-secondary (border style)
   - .btn-outline (transparent with border)
   - Hover animations (translateY, shadow)

4. Animations
   - @keyframes fadeIn, pulse, float, shimmer
   - .animate-* utility classes
   - prefers-reduced-motion support

5. Utilities
   - .text-gradient, .text-center
   - Margin utilities (.mt-1, .mb-1, etc.)
   - Custom scrollbars
   - ::selection styling

When done: Update .docs/memory.md with status, commit changes.
```

---

### 🔬 Subagent Research Checkpoint (After Wave 0)

**Before spawning Wave 1 agents**, ask the orchestrator to use a subagent for research:

```
You: "Use a subagent to analyze MyPetVenues/Models/*.cs and summarize:
     1. All class properties with their types
     2. All enum values (VenueType, PetType, BookingStatus)
     3. Any relationships between models"
```

**Use the findings to enrich Wave 1 prompts** with actual property names and enum values.

---

## 🌊 WAVE 1: Services & Layout (3 Parallel Agents)

> **Requires**: Wave 0 complete

### Task 1.1: Mock Services

**Agent**: `agent-services`  
**Dependencies**: Task 0.1, Task 0.2  
**Estimated Time**: 5-6 minutes

**Deliverables**:
- Create `MyPetVenues/Services/VenueService.cs` (IVenueService + MockVenueService)
- Create `MyPetVenues/Services/UserService.cs` (IUserService + MockUserService)
- Create `MyPetVenues/Services/BookingService.cs` (IBookingService + MockBookingService)

**Mock Data Requirements**:
- 6 venues across different VenueTypes with varied ratings (4.5-4.9)
- 8 reviews with realistic comments and dates
- 1 mock user with 2 pets and some favorites/bookings

**Acceptance Criteria**:
- [ ] All services use interface + implementation pattern
- [ ] Mock data is realistic and varied
- [ ] Async methods return Task<T>

**Agent Prompt**:
```
Create mock services for MyPetVenues.

⚠️ CRITICAL - Use these EXACT model properties (from Wave 0 models):
- Venue: Id, Name, Description, Address, City, ImageUrl, Rating, ReviewCount, Type (VenueType), AllowedPets (List<PetType>), Amenities (List<string>), OpeningHours (Dictionary<string,string>), IsFeatured, ContactPhone, Website
- Review: Id, VenueId, UserId, UserName, Rating (double), Comment, VisitDate (DateTime), PetName
- User: Id, Name, Email, ProfileImageUrl, Pets (List<Pet>), FavoriteVenueIds (List<int>), Bookings (List<Booking>)
- Pet: Name, Type (PetType), Breed, Age (int), ImageUrl
- Booking: Id, UserId, VenueId, BookingDate, TimeSlot, NumberOfPets, Notes, Status (BookingStatus)

⚠️ CRITICAL - Use these EXACT enum values:
- VenueType: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic
- PetType: Dog, Cat, Bird, Rabbit, SmallPet, All  (NOT "Small"!)
- BookingStatus: Pending, Confirmed, Cancelled, Completed

Files (each with BOTH interface AND implementation):

1. MyPetVenues/Services/VenueService.cs
   - IVenueService interface
   - MockVenueService implementation
   Methods:
   - Task<List<Venue>> GetAllVenuesAsync()
   - Task<Venue?> GetVenueByIdAsync(int id)
   - Task<List<Venue>> GetFeaturedVenuesAsync()
   - Task<List<Venue>> SearchVenuesAsync(string? search, VenueType? type, PetType? pet)
   - Task<List<Review>> GetVenueReviewsAsync(int venueId)
   
   Generate 6 realistic venues:
   - Pawsome Park (Park), Bark & Brew Café (Cafe), Furry Friends Hotel (Hotel)
   - Pet Paradise Beach (Beach), Whiskers & Wags Store (Store), Cozy Paws Restaurant (Restaurant)
   Include realistic amenities, hours, ratings (4.5-4.9), reviews

2. MyPetVenues/Services/UserService.cs
   - IUserService interface
   - MockUserService implementation
   Methods:
   - Task<User> GetCurrentUserAsync()
   - Task UpdateUserAsync(User user)
   - Task AddFavoriteVenueAsync(int venueId)
   - Task RemoveFavoriteVenueAsync(int venueId)
   
   Generate 1 mock user with 2 pets

3. MyPetVenues/Services/BookingService.cs
   - IBookingService interface
   - MockBookingService implementation
   Methods:
   - Task<List<Booking>> GetUserBookingsAsync()
   - Task<Booking> CreateBookingAsync(Booking booking)
   - Task CancelBookingAsync(int bookingId)

Namespace: MyPetVenues.Services
Using: MyPetVenues.Models

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 1.2: Layout Components

**Agent**: `agent-layout`  
**Dependencies**: Task 0.1, Task 0.3  
**Estimated Time**: 5-6 minutes

**Deliverables**:
- Create `MyPetVenues/Layout/MainLayout.razor` + `.razor.css`
- Create `MyPetVenues/Layout/Header.razor` + `.razor.css`
- Create `MyPetVenues/Layout/Footer.razor` + `.razor.css`

**Acceptance Criteria**:
- [ ] Header has logo, navigation, theme toggle, mobile menu
- [ ] Footer has brand, social links, newsletter, copyright
- [ ] MainLayout wraps content with theme class
- [ ] All components have ARIA roles and labels

**Agent Prompt**:
```
Create layout components for MyPetVenues.

Files:

1. MyPetVenues/Layout/MainLayout.razor + .razor.css
   - Inject IThemeService
   - Wrap content in .app-container with theme class
   - Include Header, main#main-content, Footer
   - Implement IDisposable for theme subscription

2. MyPetVenues/Layout/Header.razor + .razor.css
   - Skip link for accessibility
   - Logo with 🐾 icon and "MyPetVenues" text
   - Navigation: Home, Venues, Book Now, Profile
   - Theme toggle button (sun/moon icons)
   - Mobile hamburger menu
   - Sticky positioning with backdrop blur
   - Active link highlighting with gradient
   CSS: Hover animations, mobile breakpoint at 900px

3. MyPetVenues/Layout/Footer.razor + .razor.css
   - Brand section with logo and tagline
   - Social links (Facebook, Twitter, Instagram, TikTok)
   - Link columns: Explore, Resources, Company, Legal
   - Newsletter signup form
   - Copyright with pet emojis
   - ARIA roles for navigation sections

Styling:
- Use CSS variables from app.css
- Gradient backgrounds for active states
- Hover lift animations
- Responsive grid layouts

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 1.3: Theme Service

**Agent**: `agent-theme`  
**Dependencies**: Task 0.1  
**Estimated Time**: 2-3 minutes

**Deliverables**:
- Create `MyPetVenues/Services/ThemeService.cs` (IThemeService + ThemeService)

**Acceptance Criteria**:
- [ ] Stores dark/light mode preference
- [ ] OnThemeChanged event for components to react
- [ ] ToggleTheme() method

**Agent Prompt**:
```
Create theme service for MyPetVenues.

File: MyPetVenues/Services/ThemeService.cs

Interface IThemeService:
- bool IsDarkMode { get; }
- event Action? OnThemeChanged;
- void ToggleTheme();
- void SetTheme(bool isDark);

Implementation ThemeService:
- Private _isDarkMode field (default false for light mode)
- ToggleTheme inverts _isDarkMode and fires OnThemeChanged
- SetTheme sets value and fires event

Namespace: MyPetVenues.Services

When done: Update .docs/memory.md with status, commit changes.
```

---

### 🔬 Subagent Research Checkpoint (After Wave 1)

**Before spawning Wave 2 agents**, ask the orchestrator to use a subagent for research:

```
You: "Use a subagent to review MyPetVenues/Services/I*.cs interfaces and list:
     1. All available methods with signatures
     2. Return types (what data components will receive)
     3. Which services components will need to inject"
```

**Use the findings to enrich Wave 2 prompts** with exact service methods and injection requirements.

---

## 🌊 WAVE 2: Components (5 Parallel Agents)

> **Requires**: Wave 1 complete

### Task 2.1: VenueCard Component

**Agent**: `agent-venuecard`  
**Dependencies**: Wave 1  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Create `MyPetVenues/Components/VenueCard.razor` + `.razor.css`

**Agent Prompt**:
```
Create VenueCard component for MyPetVenues.

Files: MyPetVenues/Components/VenueCard.razor + .razor.css

⚠️ CRITICAL - Use these EXACT enum values when displaying pet types:
- PetType: Dog, Cat, Bird, Rabbit, SmallPet, All  (NOT "Small"!)
- VenueType: Park, Restaurant, Cafe, Hotel, Store, Beach, DayCare, Grooming, VetClinic

⚠️ CRITICAL - Venue model properties to use:
- Venue.ImageUrl (string, not Photos or Images)
- Venue.Address + Venue.City (not Location)
- Venue.Type (VenueType, not Types)
- Venue.AllowedPets (List<PetType>)
- Venue.Rating (double)
- Venue.Amenities (List<string>)

Parameters:
- [Parameter] Venue Venue
- [Parameter] bool IsFeatured = false
- [Parameter] EventCallback OnClick

Structure:
- Card container with click handler
- Featured badge (if IsFeatured)
- Image section with venue photo (use Venue.ImageUrl)
- VenueTypeBadge overlay
- Content section: name, location (Address, City), rating, pets, amenities

Styling (distinctive, not generic!):
- 20px border radius with soft shadow
- Image zoom on hover (scale 1.06)
- Card lift effect (translateY -8px)
- Featured card has gradient border
- Staggered animation on page load

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 2.2: StarRating Component

**Agent**: `agent-starrating`  
**Dependencies**: Wave 1  
**Estimated Time**: 2-3 minutes

**Deliverables**:
- Create `MyPetVenues/Components/StarRating.razor` + `.razor.css`

**Agent Prompt**:
```
Create StarRating component for MyPetVenues.

Files: MyPetVenues/Components/StarRating.razor + .razor.css

Parameters:
- [Parameter] double Rating (0-5)
- [Parameter] bool ShowValue (default true)

Features:
- Display 5 stars (filled ⭐, empty ☆)
- Support half-star display
- Show numeric rating if ShowValue is true

Styling:
- Gold/yellow star color
- Smooth transitions
- Hover glow effect

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 2.3: ReviewCard Component

**Agent**: `agent-reviewcard`  
**Dependencies**: Wave 1  
**Estimated Time**: 3-4 minutes

**Deliverables**:
- Create `MyPetVenues/Components/ReviewCard.razor` + `.razor.css`

**Agent Prompt**:
```
Create ReviewCard component for MyPetVenues.

Files: MyPetVenues/Components/ReviewCard.razor + .razor.css

Parameters:
- [Parameter] Review Review

Structure:
- Header with user avatar, name, date
- Star rating display
- Comment text
- Pet name mention
- "Helpful" button with thumbs up

Styling:
- Card with subtle border
- Hover lift effect
- Profile picture with gradient border on hover
- Readable typography with proper line height

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 2.4: SearchFilters Component

**Agent**: `agent-searchfilters`  
**Dependencies**: Wave 1  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Create `MyPetVenues/Components/SearchFilters.razor` + `.razor.css`

**Agent Prompt**:
```
Create SearchFilters component for MyPetVenues.

Files: MyPetVenues/Components/SearchFilters.razor + .razor.css

Parameters:
- [Parameter] string? SearchTerm
- [Parameter] VenueType? SelectedVenueType
- [Parameter] PetType? SelectedPetType
- [Parameter] EventCallback<(string?, VenueType?, PetType?)> OnSearch

Structure:
- Search input with 🔍 icon
- Clear button when text present
- VenueType dropdown
- PetType dropdown
- Search button

Features:
- Keyboard support (Enter to search, Escape to clear)
- Debounced input
- ARIA labels for accessibility

Styling:
- Card background with shadow
- Gradient border on focus
- Responsive layout (stack on mobile)

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 2.5: Badge & Tag Components

**Agent**: `agent-badges`  
**Dependencies**: Wave 1  
**Estimated Time**: 3-4 minutes

**Deliverables**:
- Create `MyPetVenues/Components/VenueTypeBadge.razor` + `.razor.css`
- Create `MyPetVenues/Components/PetBadge.razor` + `.razor.css`
- Create `MyPetVenues/Components/AmenityTag.razor` + `.razor.css`

**Agent Prompt**:
```
Create badge and tag components for MyPetVenues.

Files:

1. MyPetVenues/Components/VenueTypeBadge.razor + .razor.css
   - [Parameter] VenueType Type
   - Display emoji + type name
   - Color-coded by type (parks green, cafes brown, etc.)

2. MyPetVenues/Components/PetBadge.razor + .razor.css
   - [Parameter] PetType Type
   - Display pet emoji (🐕 🐱 🐦 🐰 🐹)
   - Circular badge style

3. MyPetVenues/Components/AmenityTag.razor + .razor.css
   - [Parameter] string Amenity
   - Pill-shaped tag
   - Subtle background color
   - Hover effect

Styling:
- Consistent border radius
- Subtle shadows
- Smooth hover transitions

When done: Update .docs/memory.md with status, commit changes.
```

---

### 🔬 Subagent Research Checkpoint (After Wave 2)

**Before spawning Wave 3 agents**, ask the orchestrator to use a subagent for research:

```
You: "Use a subagent to list all components in MyPetVenues/Components/*.razor:
     1. Component names and their [Parameter] properties
     2. Required EventCallbacks
     3. Which components pages should use together"
```

**Use the findings to enrich Wave 3 prompts** with exact component usage patterns.

---

## 🌊 WAVE 3: Pages (5 Parallel Agents)

> **Requires**: Wave 2 complete

### Task 3.1: Home Page

**Agent**: `agent-home`  
**Dependencies**: Wave 2  
**Estimated Time**: 5-6 minutes

**Deliverables**:
- Create `MyPetVenues/Pages/Home.razor` + `.razor.css`

**Agent Prompt**:
```
Create Home page for MyPetVenues.

Files: MyPetVenues/Pages/Home.razor + .razor.css

Route: @page "/"

Sections:
1. Hero section
   - Large heading with gradient text
   - Tagline about pet-friendly venues
   - CTA buttons (Explore Venues, Book Now)
   - Animated pet emojis

2. Quick search
   - Embedded SearchFilters component
   - Prominent placement

3. Venue categories
   - Grid of VenueType cards with icons
   - Click navigates to filtered venues

4. Featured venues
   - Grid of VenueCard components (6 featured)
   - "View All" button

5. Testimonials
   - Customer quotes with avatars
   - Carousel or grid layout

6. Final CTA
   - "Join thousands of pet lovers"
   - Sign up encouragement

Inject: IVenueService, NavigationManager

Styling:
- Staggered fade-in animations
- Gradient overlays
- Responsive grid (3 cols → 2 → 1)

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 3.2: Venues List Page

**Agent**: `agent-venues`  
**Dependencies**: Wave 2  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Create `MyPetVenues/Pages/Venues.razor` + `.razor.css`

**Agent Prompt**:
```
Create Venues list page for MyPetVenues.

Files: MyPetVenues/Pages/Venues.razor + .razor.css

Route: @page "/venues"

Features:
- Page header with title and description
- SearchFilters component
- Results count display
- Grid of VenueCard components
- Empty state with illustration
- Loading state

Query Parameters:
- ?search=term
- ?type=VenueType
- ?pet=PetType

Inject: IVenueService, NavigationManager

Styling:
- Responsive grid layout
- Smooth filtering transitions
- Empty state styling

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 3.3: Venue Detail Page

**Agent**: `agent-detail`  
**Dependencies**: Wave 2  
**Estimated Time**: 5-6 minutes

**Deliverables**:
- Create `MyPetVenues/Pages/VenueDetail.razor` + `.razor.css`

**Agent Prompt**:
```
Create Venue Detail page for MyPetVenues.

Files: MyPetVenues/Pages/VenueDetail.razor + .razor.css

Route: @page "/venues/{VenueId:int}"

Structure:
1. Hero section
   - Large venue image
   - Venue name, type badge, rating
   - Location and quick stats
   - Favorite button (heart toggle)

2. Main content grid
   Left column:
   - Description
   - Allowed pets section
   - Amenities grid
   - Reviews list (ReviewCard components)
   
   Right sidebar:
   - Opening hours table
   - Contact info (phone, website)
   - "Book This Venue" CTA button

Inject: IVenueService, IUserService, NavigationManager

Styling:
- Two-column layout (stack on mobile)
- Image with gradient overlay
- Sticky sidebar on desktop

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 3.4: Profile Page

**Agent**: `agent-profile`  
**Dependencies**: Wave 2  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Create `MyPetVenues/Pages/Profile.razor` + `.razor.css`

**Agent Prompt**:
```
Create Profile page for MyPetVenues.

Files: MyPetVenues/Pages/Profile.razor + .razor.css

Route: @page "/profile"

⚠️ CRITICAL RAZOR SYNTAX RULES (prevent CS1646/CS1525 errors):
- For lambdas with string literals, use SINGLE QUOTES for outer attribute:
  @onclick='() => SetActiveTab("pets")'
- OR use @() wrapper with double quotes:
  @onclick="@(() => SetActiveTab("pets"))"
- NEVER escape quotes like this: @onclick="() => SetActiveTab(\"pets\")"  ← WRONG!

⚠️ CRITICAL - User model properties:
- User.ProfileImageUrl (not Avatar)
- User.Pets (List<Pet>)
- User.FavoriteVenueIds (List<int>)
- User.Bookings (List<Booking>)

⚠️ ALWAYS include loading state pattern:
@if (user == null)
{
    <p>Loading...</p>
}
else
{
    // render content
}

Structure:
1. Profile header
   - User avatar (large) - use User.ProfileImageUrl
   - Name and email
   - Edit profile button

2. Tab navigation
   - My Pets | Favorites | Bookings | Settings

3. Tab content:
   My Pets:
   - Grid of pet cards with photo, name, type, breed, age
   - "Add Pet" button
   
   Favorites:
   - Grid of favorite VenueCards
   - Remove from favorites option
   
   Bookings:
   - List of booking cards with status badges
   - Upcoming vs past bookings
   
   Settings:
   - Theme toggle
   - Notification preferences (mock)
   - Account settings (mock)

Inject: IUserService, IBookingService, IVenueService, IThemeService

Styling:
- Tab animations
- Pet card hover effects
- Status badge colors

When done: Update .docs/memory.md with status, commit changes.
```

---

### Task 3.5: Booking Page

**Agent**: `agent-booking`  
**Dependencies**: Wave 2  
**Estimated Time**: 5-6 minutes

**Deliverables**:
- Create `MyPetVenues/Pages/BookVenue.razor` + `.razor.css`

**Agent Prompt**:
```
Create Booking page for MyPetVenues.

Files: MyPetVenues/Pages/BookVenue.razor + .razor.css

Route: @page "/booking"
       @page "/booking/{PreselectedVenueId:int}"

⚠️ CRITICAL RAZOR SYNTAX RULES (prevent CS1646/CS1525 errors):
- For lambdas with string literals, use SINGLE QUOTES for outer attribute:
  @onclick='() => GoToStep(2)'
- OR use @() wrapper:
  @onclick="@(() => GoToStep(2))"
- NEVER escape quotes inside Razor attributes!

⚠️ ALWAYS include loading state pattern:
@if (venues == null)
{
    <p>Loading...</p>
}
else
{
    // render content
}

Multi-step wizard:
1. Step 1: Select Venue
   - Search/filter venues
   - Click to select
   
2. Step 2: Choose Date & Time
   - Date picker
   - Time slot selection
   - Number of pets
   
3. Step 3: Your Details
   - Pre-filled from user profile
   - Special requests textarea
   
4. Step 4: Confirmation
   - Summary of booking
   - Confirm button
   
5. Success state
   - Checkmark animation
   - Booking reference
   - "View Bookings" button

Features:
- Step indicator with progress
- Navigation (Back/Next)
- Form validation

Inject: IVenueService, IUserService, IBookingService, NavigationManager

Styling:
- Step indicator with gradient active state
- Form field focus animations
- Success confetti or celebration

When done: Update .docs/memory.md with status, commit changes.
```

---

### 🔬 Subagent Research Checkpoint (After Wave 3)

**Before spawning Wave 4 agent**, ask the orchestrator to use a subagent for research:

```
You: "Use a subagent to:
     1. Run 'dotnet build MyPetVenues/MyPetVenues.csproj' and report any errors
     2. List all services that need registration in Program.cs
     3. List all pages and their routes for router configuration"
```

**Use the findings to ensure Wave 4 integration is complete** with all services and routes.

---

## 🌊 WAVE 4: Integration (1 Agent)

> **Requires**: Wave 3 complete

### Task 4.1: Final Integration & Wiring

**Agent**: `agent-integration`  
**Dependencies**: All previous waves  
**Estimated Time**: 4-5 minutes

**Deliverables**:
- Update `MyPetVenues/Program.cs` with all service registrations
- Update `MyPetVenues/App.razor` with proper router configuration
- Update `MyPetVenues/_Imports.razor` with all namespaces
- Verify build succeeds
- Run smoke test

**Acceptance Criteria**:
- [ ] `dotnet build MyPetVenues/MyPetVenues.csproj` succeeds with no errors
- [ ] All services registered in Program.cs
- [ ] Router properly configured with MainLayout
- [ ] All pages accessible via navigation

**Agent Prompt**:
```
Complete final integration for MyPetVenues.

Tasks:

1. Update MyPetVenues/Program.cs:
   - Register all services:
     builder.Services.AddSingleton<IThemeService, ThemeService>();
     builder.Services.AddSingleton<IVenueService, MockVenueService>();
     builder.Services.AddSingleton<IBookingService, MockBookingService>();
     builder.Services.AddScoped<IUserService, MockUserService>();

2. Update MyPetVenues/App.razor:
   - Proper Router configuration
   - RouteView with MainLayout
   - NotFound with friendly message

3. Update MyPetVenues/_Imports.razor:
   - @using MyPetVenues
   - @using MyPetVenues.Models
   - @using MyPetVenues.Services
   - @using MyPetVenues.Components
   - @using MyPetVenues.Layout
   - @using Microsoft.AspNetCore.Components.Web
   - @using Microsoft.AspNetCore.Components.Routing

4. Verify:
   - Run: dotnet build MyPetVenues/MyPetVenues.csproj
   - Check for any missing references
   - Fix any compilation errors

When done: Update .docs/memory.md with FINAL status, generate report.xlsx
```

---

## 📊 Execution Summary

| Wave | Tasks | Parallel Agents | Estimated Time |
|------|-------|-----------------|----------------|
| 0 | Foundation | 3 | 4-5 min |
| 1 | Services & Layout | 3 | 5-6 min |
| 2 | Components | 5 | 4-5 min |
| 3 | Pages | 5 | 5-6 min |
| 4 | Integration | 1 | 4-5 min |

**Sequential Time (if no parallelization)**: ~60-70 minutes  
**Parallel Time (with waves)**: ~25-35 minutes  
**Time Saved**: ~50-60%!

---

## 🔧 Orchestrator Commands Reference

### Create Worktrees
```powershell
# Wave 0
git worktree add ..\wt-foundation -b task-foundation
git worktree add ..\wt-models -b task-models
git worktree add ..\wt-styles -b task-styles
```

### Spawn Agents
```powershell
Start-Job -Name "agent-foundation" -ScriptBlock {
    Set-Location "C:\Temp\GIT\wt-foundation"
    copilot -p "[AGENT PROMPT HERE]" --allow-all-tools
}
```

### Monitor Progress
```powershell
Get-Job | Format-Table Name, State
Get-Content .docs\memory.md -Tail 20
```

### Merge & Cleanup
```powershell
git checkout main
git merge task-foundation --no-ff
Remove-Item -LiteralPath "..\wt-foundation" -Recurse -Force
git worktree prune
git branch -d task-foundation
```

---

## ✅ Completion Checklist

Before marking complete:
- [ ] All waves executed successfully
- [ ] `dotnet build` passes
- [ ] All pages render without errors
- [ ] Theme toggle works (light/dark)
- [ ] Navigation between pages works
- [ ] `.docs/memory.md` shows all tasks complete
- [ ] `.docs/report.xlsx` generated with metrics

---

**Ready to build?** Run the orchestrator with `swarm-mode.prompt.md` and reference this implementation plan!
