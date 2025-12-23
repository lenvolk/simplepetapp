using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using MyPetVenues;
using MyPetVenues.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Add MSAL authentication
builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);
    options.ProviderOptions.DefaultAccessTokenScopes.Add("api://YOUR_API_CLIENT_ID/access_as_user");
});

// Register services
builder.Services.AddScoped<VenueService>();
builder.Services.AddScoped<BookingService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ThemeService>();

await builder.Build().RunAsync();
