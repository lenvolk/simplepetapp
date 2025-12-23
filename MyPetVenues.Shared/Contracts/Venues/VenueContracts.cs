namespace MyPetVenues.Shared.Contracts.Venues;

public class VenueDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public List<string> Amenities { get; set; } = new();
    public string Description { get; set; } = string.Empty;
    public List<string> Photos { get; set; } = new();
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
}

public class CreateVenueRequest
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public List<string> Amenities { get; set; } = new();
    public string Description { get; set; } = string.Empty;
}
