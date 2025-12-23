using System.Security.Claims;

namespace MyPetVenues.Api.Auth;

public static class UserClaims
{
    public static string GetUserId(ClaimsPrincipal user)
    {
        // Prefer 'oid' (object ID) claim from Entra ID, fallback to 'sub'
        return user.FindFirstValue("oid") 
            ?? user.FindFirstValue(ClaimTypes.NameIdentifier) 
            ?? throw new InvalidOperationException("User ID claim not found");
    }

    public static bool IsOwner(ClaimsPrincipal user, string resourceUserId)
    {
        var userId = GetUserId(user);
        return string.Equals(userId, resourceUserId, StringComparison.OrdinalIgnoreCase);
    }
}
