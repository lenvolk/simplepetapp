using MyPetVenues.Shared.Contracts.Venues;
using System.Net.Http.Json;

namespace MyPetVenues.Services;

public class ApiVenueService
{
    private readonly HttpClient _http;

    public ApiVenueService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<VenueDto>> GetVenuesAsync(string? search = null, string? type = null, string? area = null)
    {
        var query = $"/api/venues?search={search}&type={type}&area={area}";
        return await _http.GetFromJsonAsync<List<VenueDto>>(query) ?? new();
    }

    public async Task<VenueDto?> GetVenueByIdAsync(string id)
    {
        return await _http.GetFromJsonAsync<VenueDto>($"/api/venues/{id}");
    }

    public async Task<VenueDto?> CreateVenueAsync(CreateVenueRequest request)
    {
        var response = await _http.PostAsJsonAsync("/api/venues", request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<VenueDto>();
    }
}
