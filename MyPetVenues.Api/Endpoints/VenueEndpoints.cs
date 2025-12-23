using MyPetVenues.Api.Data.Repositories;
using MyPetVenues.Api.Mappers;
using MyPetVenues.Api.Models;
using MyPetVenues.Shared.Contracts.Venues;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyPetVenues.Api.Endpoints;

public static class VenueEndpoints
{
    public static void MapVenueEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/venues")
            .WithTags("Venues")
            .RequireAuthorization();

        group.MapGet("", GetAllVenues)
            .AllowAnonymous()
            .WithName("GetAllVenues");

        group.MapGet("{id:guid}", GetVenueById)
            .AllowAnonymous()
            .WithName("GetVenueById");

        group.MapPost("", CreateVenue)
            .WithName("CreateVenue");
    }

    private static async Task<IResult> GetAllVenues(
        [FromServices] VenueRepository repo,
        [FromQuery] string? search = null,
        [FromQuery] string? type = null,
        [FromQuery] string? area = null,
        CancellationToken ct = default)
    {
        var venues = await repo.SearchAsync(search, type, area, ct);
        var dtos = venues.Select(VenueMapper.ToDto).ToList();
        return Results.Ok(dtos);
    }

    private static async Task<IResult> GetVenueById(
        [FromRoute] Guid id,
        [FromServices] VenueRepository repo,
        CancellationToken ct = default)
    {
        var venue = await repo.GetByIdAsync(id, ct);
        if (venue is null)
            return Results.NotFound();

        return Results.Ok(VenueMapper.ToDto(venue));
    }

    private static async Task<IResult> CreateVenue(
        [FromBody] CreateVenueRequest request,
        [FromServices] VenueRepository repo,
        CancellationToken ct = default)
    {
        var venue = new Venue
        {
            Name = request.Name,
            Type = request.Type,
            Area = request.Area,
            Amenities = request.Amenities,
            Description = request.Description,
            Photos = request.Photos,
            Rating = 0,
            ReviewCount = 0
        };

        var created = await repo.CreateAsync(venue, ct);
        var dto = VenueMapper.ToDto(created);

        return Results.CreatedAtRoute("GetVenueById", new { id = dto.Id }, dto);
    }
}
