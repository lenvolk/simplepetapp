using System.Security.Claims;

namespace MyPetVenues.Api.Auth;

public static class UserClaims
{
    public static string? GetUserId(this ClaimsPrincipal user)
    {
        return user.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value
               ?? user.FindFirst("sub")?.Value;
    }

    public static Guid? GetUserIdAsGuid(this ClaimsPrincipal user)
    {
        var userId = user.GetUserId();
        return string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId);
    }

    public static bool IsOwner(this ClaimsPrincipal user, Guid resourceOwnerId)
    {
        var userId = user.GetUserIdAsGuid();
        return userId.HasValue && userId.Value == resourceOwnerId;
    }
}
