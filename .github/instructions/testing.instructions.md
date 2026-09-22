---
description: "Use when writing or reviewing unit tests, integration tests, or component tests. Covers bUnit patterns for Blazor, xUnit conventions, and mock service setup."
applyTo: "**/*Test*"
---
# Testing Conventions

## Framework

- **xUnit** for test runner, **bUnit** for Blazor component rendering
- Test projects: `MyPetVenues.Tests/` (when created)
- One test class per component or service under test

## Patterns

- **Arrange / Act / Assert** — always use these section comments
- Name tests: `MethodName_Scenario_ExpectedResult` (e.g., `SearchVenuesAsync_WithCafeFilter_ReturnsOnlyCafes`)
- Use `[Fact]` for single cases, `[Theory] + [InlineData]` for parameterized

## Blazor Components (bUnit)

```csharp
// Arrange
using var ctx = new TestContext();
ctx.Services.AddSingleton<IVenueService>(new MockVenueService());
var cut = ctx.RenderComponent<VenueCard>(p => p.Add(x => x.Venue, testVenue));

// Act
cut.Find(".venue-card").Click();

// Assert
cut.Find(".venue-name").TextContent.Should().Be("Test Café");
```

- Register mock services in `TestContext.Services` — same interfaces as `Program.cs`
- Test loading and not-found states by controlling service return values
- Verify `[Parameter, EditorRequired]` props cause render with expected markup

## Service Tests

- Test against the `IVenueService` / `IBookingService` interfaces
- Mock data is already built into `MockVenueService` — reuse it or create minimal test doubles
- All service methods are `Task<T>` — use `await` in tests
