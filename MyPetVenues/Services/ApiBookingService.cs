using MyPetVenues.Shared.Contracts.Bookings;
using System.Net.Http.Json;

namespace MyPetVenues.Services;

public class ApiBookingService
{
    private readonly HttpClient _http;

    public ApiBookingService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<BookingDto>> GetMyBookingsAsync()
    {
        return await _http.GetFromJsonAsync<List<BookingDto>>("/api/bookings") ?? new();
    }

    public async Task<BookingDto?> CreateBookingAsync(CreateBookingRequest request)
    {
        var response = await _http.PostAsJsonAsync("/api/bookings", request);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<BookingDto>();
    }

    public async Task CancelBookingAsync(string id)
    {
        var response = await _http.DeleteAsync($"/api/bookings/{id}");
        response.EnsureSuccessStatusCode();
    }
}
