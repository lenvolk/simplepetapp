using MyPetVenues.Api.Data.Cosmos;

namespace MyPetVenues.Api.Data.Repositories;

public class VenueRepository
{
    private readonly CosmosClientFactory _cosmosFactory;

    public VenueRepository(CosmosClientFactory cosmosFactory)
    {
        _cosmosFactory = cosmosFactory;
    }

    // Repository methods will be implemented in US2 tasks
}
