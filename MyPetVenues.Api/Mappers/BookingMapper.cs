using MyPetVenues.Shared.Contracts.Bookings;
using MyPetVenues.Api.Models;

namespace MyPetVenues.Api.Mappers;

public static class BookingMapper
{
    public static BookingDto ToDto(Booking booking) => new()
    {
        Id = booking.Id,
        VenueId = booking.VenueId,
        UserId = booking.UserId,
        Date = booking.Date,
        Status = booking.Status
    };
}
