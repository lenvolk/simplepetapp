using Microsoft.AspNetCore.Http;

namespace MyPetVenues.Api.Infrastructure;

public static class ProblemDetailsExtensions
{
    public static IResult ToProblemDetails(this Exception exception, int statusCode = 500)
    {
        return Results.Problem(
            title: "An error occurred",
            detail: exception.Message,
            statusCode: statusCode
        );
    }

    public static IResult NotFound(string detail = "Resource not found")
    {
        return Results.Problem(
            title: "Not Found",
            detail: detail,
            statusCode: 404
        );
    }

    public static IResult BadRequest(string detail)
    {
        return Results.Problem(
            title: "Bad Request",
            detail: detail,
            statusCode: 400
        );
    }

    public static IResult Unauthorized(string detail = "Unauthorized")
    {
        return Results.Problem(
            title: "Unauthorized",
            detail: detail,
            statusCode: 401
        );
    }
}
