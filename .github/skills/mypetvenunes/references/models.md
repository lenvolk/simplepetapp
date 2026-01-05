# MyPetVenues Data Models Reference

## Model Location

All models: `MyPetVenues/Models/`

## Core Models

### Venue

```csharp
public class Venue
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public VenueType Type { get; set; }
    public List<PetType> AcceptedPets { get; set; } = new();
    public List<string> Amenities { get; set; } = new();
    public string PetPolicy { get; set; } = string.Empty;
    public string Hours { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public bool IsFeatured { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal PricePerHour { get; set; }
}
```

### User

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime JoinedDate { get; set; }
    public List<Pet> Pets { get; set; } = new();
    public List<int> FavoriteVenueIds { get; set; } = new();
    public UserPreferences Preferences { get; set; } = new();
}
```

### Pet

```csharp
public class Pet
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public PetType Type { get; set; }
    public string Breed { get; set; } = string.Empty;
    public int Age { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
```

### UserPreferences

```csharp
public class UserPreferences
{
    public bool EmailNotifications { get; set; } = true;
    public bool PushNotifications { get; set; } = true;
    public int SearchRadius { get; set; } = 25;
    public List<PetType> PreferredPetTypes { get; set; } = new();
    public List<VenueType> PreferredVenueTypes { get; set; } = new();
}
```

### Booking

```csharp
public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int VenueId { get; set; }
    public string VenueName { get; set; } = string.Empty;
    public string VenueImage { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int NumberOfPets { get; set; }
    public List<string> PetNames { get; set; } = new();
    public string SpecialRequests { get; set; } = string.Empty;
    public BookingStatus Status { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

### Review

```csharp
public class Review
{
    public int Id { get; set; }
    public int VenueId { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserAvatar { get; set; } = string.Empty;
    public string PetName { get; set; } = string.Empty;
    public PetType PetType { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime DatePosted { get; set; }
    public List<string> Photos { get; set; } = new();
    public int HelpfulCount { get; set; }
}
```

## Enums

### VenueType

```csharp
public enum VenueType
{
    Park,
    Restaurant,
    Cafe,
    Hotel,
    Store,
    Beach,
    DayCare,
    Grooming,
    VetClinic
}
```

### PetType

```csharp
public enum PetType
{
    Dog,
    Cat,
    Bird,
    Rabbit,
    SmallPet,
    All
}
```

### BookingStatus

```csharp
public enum BookingStatus
{
    Pending,
    Confirmed,
    Cancelled,
    Completed
}
```

## Model Relationships

```
User
├── List<Pet> Pets
├── List<int> FavoriteVenueIds → Venue.Id
└── UserPreferences Preferences
    ├── List<PetType> PreferredPetTypes
    └── List<VenueType> PreferredVenueTypes

Venue
├── VenueType Type
├── List<PetType> AcceptedPets
└── List<string> Amenities

Booking
├── int UserId → User.Id
├── int VenueId → Venue.Id
├── List<string> PetNames
└── BookingStatus Status

Review
├── int VenueId → Venue.Id
├── int UserId → User.Id
└── PetType PetType
```

## Default Initialization Pattern

All string properties initialize to `string.Empty`:
```csharp
public string Name { get; set; } = string.Empty;
```

All list properties initialize to `new()`:
```csharp
public List<string> Amenities { get; set; } = new();
```

## Mock Data Conventions

Images are stored in:
- `images/venues/` - Venue photos
- `images/pets/` - Pet photos

Image URL format:
```csharp
ImageUrl = "images/venues/park1.jpg"
ImageUrl = "images/pets/dog1.png"
```
