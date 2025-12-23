namespace MyPetVenues.Shared.Contracts.Bookings;

public class BookingDto
{
    public string Id { get; set; } = string.Empty;
    public string VenueId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class CreateBookingRequest
{
    public string VenueId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
}
