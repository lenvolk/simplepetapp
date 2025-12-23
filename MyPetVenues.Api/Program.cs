using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MyPetVenues.Api.Options;
using MyPetVenues.Api.Data.Cosmos;
using MyPetVenues.Api.Data.Repositories;
using MyPetVenues.Api.Endpoints;
using Azure.Monitor.OpenTelemetry.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Configure options
var authOptions = builder.Configuration.GetSection(AuthOptions.SectionName).Get<AuthOptions>() ?? new AuthOptions();
var cosmosOptions = builder.Configuration.GetSection(CosmosOptions.SectionName).Get<CosmosOptions>() ?? new CosmosOptions();
var monitoringOptions = builder.Configuration.GetSection(MonitoringOptions.SectionName).Get<MonitoringOptions>() ?? new MonitoringOptions();

// Add OpenTelemetry with Application Insights
builder.Services.AddOpenTelemetry()
    .UseAzureMonitor(options =>
    {
        options.ConnectionString = monitoringOptions.ApplicationInsightsConnectionString;
    });

// Configure authentication
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
    options.FallbackPolicy = options.DefaultPolicy;
});

// Register Cosmos client factory and repositories
builder.Services.AddSingleton(cosmosOptions);
builder.Services.AddSingleton(monitoringOptions);
builder.Services.AddSingleton<CosmosClientFactory>();
builder.Services.AddScoped<VenueRepository>();
builder.Services.AddScoped<ReviewRepository>();
builder.Services.AddScoped<BookingRepository>();
builder.Services.AddScoped<UserRepository>();

builder.Services.AddRouting();
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.MapHealthChecks("/health").AllowAnonymous();
app.MapGet("/ready", () => Results.Ok(new { status = "ready" })).AllowAnonymous();

// Map API endpoints
app.MapVenueEndpoints();
app.MapReviewEndpoints();
app.MapBookingEndpoints();
app.MapMeEndpoints();

app.MapFallbackToFile("index.html");

app.Run();
