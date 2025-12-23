using MyPetVenues.Api.Data.Repositories;
using MyPetVenues.Api.Mappers;
using MyPetVenues.Api.Models;
using MyPetVenues.Shared.Contracts.Me;
using Microsoft.AspNetCore.Mvc;

namespace MyPetVenues.Api.Endpoints;

public static class MeEndpoints
{
    public static void MapMeEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/me")
            .WithTags("Me")
            .RequireAuthorization();

        group.MapGet("", GetMyProfile)
            .WithName("GetMyProfile");

        group.MapPut("", UpdateMyProfile)
            .WithName("UpdateMyProfile");
    }

    private static async Task<IResult> GetMyProfile(
        [FromServices] UserRepository repo,
        HttpContext httpContext,
        CancellationToken ct = default)
    {
        var userId = httpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                     ?? httpContext.User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();

        var profile = await repo.GetByIdAsync(userId, ct);
        if (profile is null)
        {
            // Create default profile on first access
            profile = new UserProfile
            {
                Id = userId,
                Name = httpContext.User.Identity?.Name ?? "Unknown",
                Email = httpContext.User.FindFirst("preferred_username")?.Value ?? "",
                FavoriteVenues = new List<string>()
            };
            profile = await repo.UpsertAsync(profile, ct);
        }

        return Results.Ok(UserProfileMapper.ToDto(profile));
    }

    private static async Task<IResult> UpdateMyProfile(
        [FromBody] UpdateProfileRequest request,
        [FromServices] UserRepository repo,
        HttpContext httpContext,
        CancellationToken ct = default)
    {
        var userId = httpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
                     ?? httpContext.User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();

        var profile = await repo.GetByIdAsync(userId, ct);
        if (profile is null)
        {
            profile = new UserProfile
            {
                Id = userId,
                Name = request.Name,
                Email = httpContext.User.FindFirst("preferred_username")?.Value ?? "",
                FavoriteVenues = request.FavoriteVenues ?? new List<string>()
            };
        }
        else
        {
            profile.Name = request.Name;
            profile.FavoriteVenues = request.FavoriteVenues ?? profile.FavoriteVenues;
        }

        var updated = await repo.UpsertAsync(profile, ct);
        return Results.Ok(UserProfileMapper.ToDto(updated));
    }
}
