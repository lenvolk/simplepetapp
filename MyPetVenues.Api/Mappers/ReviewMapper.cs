using MyPetVenues.Shared.Contracts.Reviews;
using MyPetVenues.Api.Models;

namespace MyPetVenues.Api.Mappers;

public static class ReviewMapper
{
    public static ReviewDto ToDto(Review review) => new()
    {
        Id = review.Id,
        VenueId = review.VenueId,
        UserId = review.UserId,
        UserName = review.UserName,
        Rating = review.Rating,
        Comment = review.Comment,
        CreatedAt = review.CreatedAt
    };
}
