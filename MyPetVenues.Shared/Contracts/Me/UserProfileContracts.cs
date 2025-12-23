namespace MyPetVenues.Shared.Contracts.Me;

public class UserProfileDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<string> FavoriteVenues { get; set; } = new();
}

public class UpdateProfileRequest
{
    public string Name { get; set; } = string.Empty;
    public List<string> FavoriteVenues { get; set; } = new();
}
