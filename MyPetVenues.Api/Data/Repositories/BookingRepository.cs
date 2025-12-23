using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Models;
using Microsoft.Azure.Cosmos;

namespace MyPetVenues.Api.Data.Repositories;

public class BookingRepository
{
    private readonly Container _container;

    public BookingRepository(CosmosClientFactory factory)
    {
        _container = factory.GetContainer("bookings");
    }

    public async Task<Booking?> GetByIdAsync(string id, string userId, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReadItemAsync<Booking>(
                id,
                new PartitionKey(userId),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<IReadOnlyList<Booking>> GetByUserIdAsync(string userId, CancellationToken ct = default)
    {
        var queryDef = new QueryDefinition("SELECT * FROM c WHERE c.UserId = @userId ORDER BY c.Date DESC")
            .WithParameter("@userId", userId);

        var results = new List<Booking>();
        using var iterator = _container.GetItemQueryIterator<Booking>(
            queryDef,
            requestOptions: new QueryRequestOptions { PartitionKey = new PartitionKey(userId) }
        );
        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(ct);
            results.AddRange(response);
        }
        return results;
    }

    public async Task<IReadOnlyList<Booking>> GetByVenueIdAsync(string venueId, CancellationToken ct = default)
    {
        var queryDef = new QueryDefinition("SELECT * FROM c WHERE c.VenueId = @venueId ORDER BY c.Date DESC")
            .WithParameter("@venueId", venueId);

        var results = new List<Booking>();
        using var iterator = _container.GetItemQueryIterator<Booking>(queryDef);
        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(ct);
            results.AddRange(response);
        }
        return results;
    }

    public async Task<Booking> CreateAsync(Booking booking, CancellationToken ct = default)
    {
        booking.Id = Guid.NewGuid().ToString();
        var response = await _container.CreateItemAsync(booking, new PartitionKey(booking.UserId), cancellationToken: ct);
        return response.Resource;
    }

    public async Task<Booking?> UpdateAsync(Booking booking, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReplaceItemAsync(
                booking,
                booking.Id,
                new PartitionKey(booking.UserId),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<bool> DeleteAsync(string id, string userId, CancellationToken ct = default)
    {
        try
        {
            await _container.DeleteItemAsync<Booking>(
                id,
                new PartitionKey(userId),
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
