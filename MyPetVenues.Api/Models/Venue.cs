namespace MyPetVenues.Api.Models;

public class Venue
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public List<string> Amenities { get; set; } = new();
    public string Description { get; set; } = string.Empty;
    public List<string> Photos { get; set; } = new();
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
}
