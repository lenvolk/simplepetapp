namespace MyPetVenues.Api.Models;

public class Review
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string VenueId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
