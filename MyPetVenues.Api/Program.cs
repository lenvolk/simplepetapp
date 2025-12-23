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

builder.Services.AddAuthorization();
builder.Services.AddRouting();
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Serve Blazor WASM static files
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.MapHealthChecks("/health");
app.MapGet("/ready", () => Results.Ok(new { status = "ready" }));

app.MapGet("/api/ping", () => Results.Ok(new { status = "ok", time = DateTimeOffset.UtcNow }))
   .RequireAuthorization();

// Fallback to index.html for Blazor routing
app.MapFallbackToFile("index.html");

app.Run();
