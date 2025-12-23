namespace MyPetVenues.Api.Options;

public class CosmosOptions
{
    public const string SectionName = "Cosmos";

    public string Endpoint { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = "MyPetVenues";
    public string VenuesContainer { get; set; } = "venues";
    public string ReviewsContainer { get; set; } = "reviews";
    public string BookingsContainer { get; set; } = "bookings";
    public string UsersContainer { get; set; } = "users";
}
