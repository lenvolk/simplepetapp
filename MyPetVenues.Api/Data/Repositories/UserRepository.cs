using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Models;
using Microsoft.Azure.Cosmos;

namespace MyPetVenues.Api.Data.Repositories;

public class UserRepository
{
    private readonly Container _container;

    public UserRepository(CosmosClientFactory factory)
    {
        _container = factory.GetContainer("users");
    }

    public async Task<UserProfile?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReadItemAsync<UserProfile>(
                id,
                new PartitionKey(id),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<UserProfile> UpsertAsync(UserProfile user, CancellationToken ct = default)
    {
        var response = await _container.UpsertItemAsync(user, new PartitionKey(user.Id), cancellationToken: ct);
        return response.Resource;
    }
}
