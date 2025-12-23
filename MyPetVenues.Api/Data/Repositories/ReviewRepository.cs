using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Models;
using Microsoft.Azure.Cosmos;

namespace MyPetVenues.Api.Data.Repositories;

public class ReviewRepository
{
    private readonly Container _container;

    public ReviewRepository(CosmosClientFactory factory)
    {
        _container = factory.GetContainer("reviews");
    }

    public async Task<Review?> GetByIdAsync(string id, string venueId, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReadItemAsync<Review>(
                id,
                new PartitionKey(venueId),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<IReadOnlyList<Review>> GetByVenueIdAsync(string venueId, CancellationToken ct = default)
    {
        var queryDef = new QueryDefinition("SELECT * FROM c WHERE c.VenueId = @venueId ORDER BY c.CreatedAt DESC")
            .WithParameter("@venueId", venueId);

        var results = new List<Review>();
        using var iterator = _container.GetItemQueryIterator<Review>(queryDef);
        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(ct);
            results.AddRange(response);
        }
        return results;
    }

    public async Task<IReadOnlyList<Review>> GetByUserIdAsync(string userId, CancellationToken ct = default)
    {
        var queryDef = new QueryDefinition("SELECT * FROM c WHERE c.UserId = @userId ORDER BY c.CreatedAt DESC")
            .WithParameter("@userId", userId);

        var results = new List<Review>();
        using var iterator = _container.GetItemQueryIterator<Review>(queryDef);
        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(ct);
            results.AddRange(response);
        }
        return results;
    }

    public async Task<Review> CreateAsync(Review review, CancellationToken ct = default)
    {
        review.Id = Guid.NewGuid().ToString();
        review.CreatedAt = DateTime.UtcNow;
        var response = await _container.CreateItemAsync(review, new PartitionKey(review.VenueId), cancellationToken: ct);
        return response.Resource;
    }

    public async Task<Review?> UpdateAsync(Review review, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReplaceItemAsync(
                review,
                review.Id,
                new PartitionKey(review.VenueId),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<bool> DeleteAsync(string id, string venueId, CancellationToken ct = default)
    {
        try
        {
            await _container.DeleteItemAsync<Review>(
                id,
                new PartitionKey(venueId),
                cancellationToken: ct
            );
            return true;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return false;
        }
    }
}
