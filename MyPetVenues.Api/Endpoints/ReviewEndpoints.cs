using MyPetVenues.Api.Data.Repositories;
using MyPetVenues.Api.Mappers;
using MyPetVenues.Api.Models;
using MyPetVenues.Shared.Contracts.Reviews;
using Microsoft.AspNetCore.Mvc;

namespace MyPetVenues.Api.Endpoints;

public static class ReviewEndpoints
{
    public static void MapReviewEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/reviews")
            .WithTags("Reviews")
            .RequireAuthorization();

        group.MapGet("venue/{venueId:guid}", GetReviewsByVenue)
            .AllowAnonymous()
            .WithName("GetReviewsByVenue");

        group.MapPost("", CreateReview)
            .WithName("CreateReview");
    }

    private static async Task<IResult> GetReviewsByVenue(
        [FromRoute] Guid venueId,
        [FromServices] ReviewRepository repo,
        CancellationToken ct = default)
    {
        var reviews = await repo.GetByVenueIdAsync(venueId, ct);
        var dtos = reviews.Select(ReviewMapper.ToDto).ToList();
        return Results.Ok(dtos);
    }

    private static async Task<IResult> CreateReview(
        [FromBody] CreateReviewRequest request,
        [FromServices] ReviewRepository repo,
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

        var review = new Review
        {
            VenueId = request.VenueId,
            UserId = Guid.Parse(userId),
            Rating = request.Rating,
            Comment = request.Comment,
            UserName = httpContext.User.Identity?.Name ?? "Anonymous"
        };

        var created = await repo.CreateAsync(review, ct);
        var dto = ReviewMapper.ToDto(created);

        return Results.Created($"/api/reviews/venue/{dto.VenueId}", dto);
    }
}
