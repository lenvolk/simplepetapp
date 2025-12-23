using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Models;
using Microsoft.Azure.Cosmos;

namespace MyPetVenues.Api.Data.Seed;

public static class SeedData
{
    public static async Task SeedVenuesAsync(CosmosClientFactory factory)
    {
        var container = factory.GetContainer("venues");
        
        var venues = new List<Venue>
        {
            new Venue
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Paws & Play Dog Park",
                Type = "Park",
                Area = "Downtown",
                Amenities = new List<string> { "Fenced Area", "Water Fountain", "Agility Equipment" },
                Description = "Large fenced dog park with separate areas for small and large dogs",
                Photos = new List<string>(),
                Rating = 4.5,
                ReviewCount = 23
            },
            new Venue
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Pet Paradise Hotel",
                Type = "Hotel",
                Area = "Suburb",
                Amenities = new List<string> { "Climate Control", "Webcam", "Grooming" },
                Description = "Luxury pet boarding facility with 24/7 care",
                Photos = new List<string>(),
                Rating = 4.8,
                ReviewCount = 45
            }
        };

        foreach (var venue in venues)
        {
            try
            {
                await container.CreateItemAsync(venue, new PartitionKey(venue.Id));
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.Conflict)
            {
                // Item already exists, skip
            }
        }
    }
}
