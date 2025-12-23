using Microsoft.AspNetCore.Http;

namespace MyPetVenues.Api.Endpoints;

public static class PingEndpoints
{
    public static void MapPingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/ping", () => Results.Ok(new { status = "ok", time = DateTimeOffset.UtcNow }))
           .RequireAuthorization()
           .WithName("Ping")
           .WithTags("Health");
    }
}
