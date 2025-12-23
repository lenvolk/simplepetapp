using MyPetVenues.Shared.Contracts.Me;
using MyPetVenues.Api.Models;

namespace MyPetVenues.Api.Mappers;

public static class UserProfileMapper
{
    public static UserProfileDto ToDto(UserProfile user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        FavoriteVenues = user.FavoriteVenues
    };
}
