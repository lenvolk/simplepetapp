namespace MyPetVenues.Api.Models;

public class UserProfile
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<string> FavoriteVenues { get; set; } = new();
}
