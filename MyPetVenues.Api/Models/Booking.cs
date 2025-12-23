namespace MyPetVenues.Api.Models;

public class Booking
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string VenueId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Status { get; set; } = "pending";
}
