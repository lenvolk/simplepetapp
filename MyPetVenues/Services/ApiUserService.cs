using MyPetVenues.Shared.Contracts.Me;
using System.Net.Http.Json;

namespace MyPetVenues.Services;

public class ApiUserService
{
    private readonly HttpClient _http;

    public ApiUserService(HttpClient http)
    {
        _http = http;
    }

    public async Task<UserProfileDto?> GetMyProfileAsync()
    {
        return await _http.GetFromJsonAsync<UserProfileDto>("/api/me");
    }

    public async Task<UserProfileDto?> UpdateMyProfileAsync(UpdateProfileRequest request)
    {
        var response = await _http.PutAsJsonAsync("/api/me", request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<UserProfileDto>();
    }
}
