using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Models;
using MyPetVenues.Api.Options;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Options;

namespace MyPetVenues.Api.Data.Repositories;

public class VenueRepository
{
    private readonly Container _container;

    public VenueRepository(CosmosClientFactory factory)
    {
        _container = factory.GetContainer("venues");
    }

    public async Task<Venue?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReadItemAsync<Venue>(
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

    public async Task<IReadOnlyList<Venue>> SearchAsync(
        string? searchTerm = null,
        string? venueType = null,
        string? area = null,
        CancellationToken ct = default)
    {
        var queryText = "SELECT * FROM c";
        var conditions = new List<string>();

        if (!string.IsNullOrWhiteSpace(searchTerm))
            conditions.Add("(CONTAINS(LOWER(c.Name), LOWER(@searchTerm)) OR CONTAINS(LOWER(c.Description), LOWER(@searchTerm)))");
        if (!string.IsNullOrWhiteSpace(venueType))
            conditions.Add("c.Type = @venueType");
        if (!string.IsNullOrWhiteSpace(area))
            conditions.Add("c.Area = @area");

        if (conditions.Any())
            queryText += " WHERE " + string.Join(" AND ", conditions);

        var queryDef = new QueryDefinition(queryText);
        if (!string.IsNullOrWhiteSpace(searchTerm))
            queryDef = queryDef.WithParameter("@searchTerm", searchTerm);
        if (!string.IsNullOrWhiteSpace(venueType))
            queryDef = queryDef.WithParameter("@venueType", venueType);
        if (!string.IsNullOrWhiteSpace(area))
            queryDef = queryDef.WithParameter("@area", area);

        var results = new List<Venue>();
        using var iterator = _container.GetItemQueryIterator<Venue>(queryDef);
        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync(ct);
            results.AddRange(response);
        }
        return results;
    }

    public async Task<Venue> CreateAsync(Venue venue, CancellationToken ct = default)
    {
        venue.Id = Guid.NewGuid().ToString();
        var response = await _container.CreateItemAsync(venue, new PartitionKey(venue.Id), cancellationToken: ct);
        return response.Resource;
    }

    public async Task<Venue?> UpdateAsync(Venue venue, CancellationToken ct = default)
    {
        try
        {
            var response = await _container.ReplaceItemAsync(
                venue,
                venue.Id,
                new PartitionKey(venue.Id),
                cancellationToken: ct
            );
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken ct = default)
    {
        try
        {
            await _container.DeleteItemAsync<Venue>(
                id,
                new PartitionKey(id),
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
