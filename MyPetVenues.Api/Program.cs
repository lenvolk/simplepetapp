using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MyPetVenues.Api.Options;

var builder = WebApplication.CreateBuilder(args);

// Configure authentication
var authOptions = builder.Configuration.GetSection(AuthOptions.SectionName).Get<AuthOptions>() ?? new AuthOptions();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = authOptions.Authority;
        options.Audience = authOptions.Audience;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy; // Require auth by default for all endpoints
});
builder.Services.AddRouting();
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Serve Blazor WASM static files (auth enforced via fallback policy)
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.MapHealthChecks("/health").AllowAnonymous(); // Allow health checks without auth
app.MapGet("/ready", () => Results.Ok(new { status = "ready" })).AllowAnonymous();

app.MapGet("/api/ping", () => Results.Ok(new { status = "ok", time = DateTimeOffset.UtcNow }))
   .RequireAuthorization();

// Fallback to index.html for Blazor routing (auth enforced)
app.MapFallbackToFile("index.html");

app.Run();
