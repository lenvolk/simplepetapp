using MyPetVenues.Api.Data.Repositories;
using MyPetVenues.Api.Mappers;
using MyPetVenues.Api.Models;
using MyPetVenues.Shared.Contracts.Bookings;
using Microsoft.AspNetCore.Mvc;

namespace MyPetVenues.Api.Endpoints;

public static class BookingEndpoints
{
    public static void MapBookingEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/bookings")
            .WithTags("Bookings")
            .RequireAuthorization();

        group.MapGet("", GetMyBookings)
            .WithName("GetMyBookings");

        group.MapPost("", CreateBooking)
            .WithName("CreateBooking");

        group.MapDelete("{id:guid}", CancelBooking)
            .WithName("CancelBooking");
    }

    private static async Task<IResult> GetMyBookings(
        [FromServices] BookingRepository repo,
        HttpContext httpContext,
        CancellationToken ct = default)
    {
        var userId = httpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                     ?? httpContext.User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();

        var bookings = await repo.GetByUserIdAsync(Guid.Parse(userId), ct);
        var dtos = bookings.Select(BookingMapper.ToDto).ToList();
        return Results.Ok(dtos);
    }

    private static async Task<IResult> CreateBooking(
        [FromBody] CreateBookingRequest request,
        [FromServices] BookingRepository repo,
        [FromServices] VenueRepository venueRepo,
        HttpContext httpContext,
        CancellationToken ct = default)
    {
        var userId = httpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                     ?? httpContext.User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();

        // Verify venue exists
        var venue = await venueRepo.GetByIdAsync(request.VenueId, ct);
        if (venue is null)
            return Results.NotFound("Venue not found");

        var booking = new Booking
        {
            VenueId = request.VenueId,
            UserId = Guid.Parse(userId),
            Date = request.Date,
            Status = "Pending"
        };

        var created = await repo.CreateAsync(booking, ct);
        var dto = BookingMapper.ToDto(created);

        return Results.Created($"/api/bookings/{dto.Id}", dto);
    }

    private static async Task<IResult> CancelBooking(
        [FromRoute] Guid id,
        [FromServices] BookingRepository repo,
        HttpContext httpContext,
        CancellationToken ct = default)
    {
        var userId = httpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                     ?? httpContext.User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();

        var booking = await repo.GetByIdAsync(id, Guid.Parse(userId), ct);
        if (booking is null)
            return Results.NotFound();

        // Verify ownership
        if (booking.UserId.ToString() != userId)
            return Results.Forbid();

        await repo.DeleteAsync(id, Guid.Parse(userId), ct);
        return Results.NoContent();
    }
}
