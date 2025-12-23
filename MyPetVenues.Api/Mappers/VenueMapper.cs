using MyPetVenues.Shared.Contracts.Venues;
using MyPetVenues.Api.Models;

namespace MyPetVenues.Api.Mappers;

public static class VenueMapper
{
    public static VenueDto ToDto(Venue venue) => new()
    {
        Id = venue.Id,
        Name = venue.Name,
        Type = venue.Type,
        Area = venue.Area,
        Amenities = venue.Amenities,
        Description = venue.Description,
        Photos = venue.Photos,
        Rating = venue.Rating,
        ReviewCount = venue.ReviewCount
    };
}
