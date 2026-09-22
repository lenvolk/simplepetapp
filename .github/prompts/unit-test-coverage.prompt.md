---
agent: agent
description: "Achieve 80% code coverage through automated unit tests for MyPetVenues"
tools: ['search/codebase', 'edit/editFiles', 'execute/runTask']
model: 'Claude Sonnet 4.5'
---

# Unit Test Coverage - MyPetVenues

## Objective

Achieve and maintain **80% code coverage** across the MyPetVenues application through comprehensive unit testing.

## Coverage Goals

### Overall Target
- **Minimum:** 80% overall code coverage
- **Ideal:** 85%+ overall coverage
- **Critical paths:** 90%+ coverage for business logic

### Component-Level Targets
| Component Type | Target Coverage | Priority |
|---------------|-----------------|----------|
| Services | 90% | High |
| Models | 85% | High |
| Blazor Components | 75% | Medium |
| Pages | 70% | Medium |
| Utility/Helper Classes | 95% | High |

## Testing Framework

MyPetVenues is a **.NET 9 Blazor WebAssembly** application. Use:
- **xUnit** or **NUnit** for unit testing
- **bUnit** for Blazor component testing
- **Moq** or **NSubstitute** for mocking
- **FluentAssertions** for assertion syntax
- **Coverlet** for code coverage reporting

## Workflow

### Step 1: Analyze Current Coverage

1. Check if test projects exist:
   - Look for `*.Tests` projects in solution
   - If none exist, create test projects

2. Run coverage analysis:
   ```bash
   dotnet test --collect:"XPlat Code Coverage"
   ```

3. Generate coverage report:
   ```bash
   dotnet tool install -g dotnet-reportgenerator-globaltool
   reportgenerator -reports:**/coverage.cobertura.xml -targetdir:coverage-report -reporttypes:Html
   ```

4. Identify gaps:
   - Services with <80% coverage
   - Models with missing test cases
   - Components with no tests
   - Untested code paths

### Step 2: Prioritize Testing

Focus on **high-value, high-risk** code first:

1. **Business Logic (Priority 1)**
   - Services in `/Services` directory
   - Model validation and business rules
   - Data transformation logic

2. **Utility Functions (Priority 2)**
   - Helper methods
   - Extension methods
   - Shared utilities

3. **Blazor Components (Priority 3)**
   - Component rendering
   - Event handlers
   - State management
   - Parameter validation

4. **Pages (Priority 4)**
   - Navigation logic
   - Page-level state
   - Initialization logic

### Step 3: Create Test Projects (if needed)

If test projects don't exist, create them:

```bash
# Create test project for main app
dotnet new xunit -n MyPetVenues.Tests
cd MyPetVenues.Tests

# Add references
dotnet add reference ../MyPetVenues/MyPetVenues.csproj

# Add required packages
dotnet add package bUnit
dotnet add package bUnit.web
dotnet add package Moq
dotnet add package FluentAssertions
dotnet add package coverlet.collector

# Add to solution
dotnet sln ../simkplepetapp.sln add MyPetVenues.Tests.csproj
```

Repeat for API and Shared projects if they exist.

### Step 4: Generate Unit Tests

Follow these patterns for each component type:

#### Service Tests Pattern
```csharp
public class VenueServiceTests
{
    private readonly VenueService _sut;
    private readonly Mock<IDependency> _mockDependency;

    public VenueServiceTests()
    {
        _mockDependency = new Mock<IDependency>();
        _sut = new VenueService(_mockDependency.Object);
    }

    [Fact]
    public void GetVenues_ShouldReturnAllVenues()
    {
        // Arrange
        var expectedVenues = TestData.GetSampleVenues();
        _mockDependency.Setup(x => x.GetData()).Returns(expectedVenues);

        // Act
        var result = _sut.GetVenues();

        // Assert
        result.Should().HaveCount(expectedVenues.Count);
        result.Should().BeEquivalentTo(expectedVenues);
    }

    [Theory]
    [InlineData("dog")]
    [InlineData("cat")]
    public void SearchVenues_WithPetType_ShouldFilterCorrectly(string petType)
    {
        // Arrange & Act & Assert
    }
}
```

#### Blazor Component Tests Pattern
```csharp
public class VenueCardTests : TestContext
{
    [Fact]
    public void VenueCard_RendersCorrectly()
    {
        // Arrange
        var venue = new Venue { Name = "Test Venue", Rating = 4.5 };

        // Act
        var cut = RenderComponent<VenueCard>(parameters => parameters
            .Add(p => p.Venue, venue));

        // Assert
        cut.Find("h3").TextContent.Should().Be("Test Venue");
        cut.Find(".rating").TextContent.Should().Contain("4.5");
    }

    [Fact]
    public void VenueCard_OnClick_NavigatesToDetail()
    {
        // Test click behavior
    }
}
```

#### Model Tests Pattern
```csharp
public class VenueTests
{
    [Fact]
    public void Venue_WithValidData_ShouldCreateSuccessfully()
    {
        // Arrange & Act
        var venue = new Venue
        {
            Name = "Test",
            Location = "Test City"
        };

        // Assert
        venue.Should().NotBeNull();
        venue.Name.Should().Be("Test");
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void Venue_WithInvalidName_ShouldThrowException(string invalidName)
    {
        // Test validation
    }
}
```

### Step 5: Test Critical Paths

Ensure these business-critical flows have 90%+ coverage:

#### VenueService
- ✅ GetAllVenues
- ✅ SearchVenues (with filters)
- ✅ GetVenueById
- ✅ FilterByPetType
- ✅ FilterByAmenities
- ✅ SortVenues

#### BookingService
- ✅ CreateBooking (valid/invalid)
- ✅ GetUserBookings
- ✅ ValidateBookingDates
- ✅ CalculateBookingCost
- ✅ CancelBooking

#### UserService
- ✅ GetCurrentUser
- ✅ UpdateUserProfile
- ✅ ValidateUserData

#### ThemeService
- ✅ ToggleTheme
- ✅ GetCurrentTheme
- ✅ PersistTheme

### Step 6: Test Edge Cases

For each method, test:
- ✅ **Happy path** - normal, expected input
- ✅ **Null/empty** - null parameters, empty collections
- ✅ **Boundaries** - min/max values, edge cases
- ✅ **Invalid input** - malformed data, wrong types
- ✅ **Error conditions** - exceptions, failures
- ✅ **State changes** - before/after verification

### Step 7: Run and Verify Coverage

After generating tests:

```bash
# Run all tests
dotnet test

# Generate coverage report
dotnet test --collect:"XPlat Code Coverage"
reportgenerator -reports:**/coverage.cobertura.xml -targetdir:coverage-report -reporttypes:Html

# Open report
start coverage-report/index.html
```

**Verification checklist:**
- [ ] All tests pass
- [ ] Overall coverage ≥ 80%
- [ ] Services coverage ≥ 90%
- [ ] Models coverage ≥ 85%
- [ ] No regression in existing tests
- [ ] Coverage report generated successfully

### Step 8: Document Coverage

Create/update `TESTING.md` in project root:

```markdown
# Testing Documentation - MyPetVenues

## Current Coverage

**Overall:** [X]%
**Last Updated:** [Date]

| Project | Coverage | Status |
|---------|----------|--------|
| MyPetVenues | [X]% | ✅/⚠️/❌ |
| MyPetVenues.Api | [X]% | ✅/⚠️/❌ |
| MyPetVenues.Shared | [X]% | ✅/⚠️/❌ |

## Running Tests

\`\`\`bash
# Run all tests
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"

# Generate HTML report
reportgenerator -reports:**/coverage.cobertura.xml -targetdir:coverage-report -reporttypes:Html
\`\`\`

## Test Organization

- `/MyPetVenues.Tests` - Main application tests
  - `/Services` - Service layer tests
  - `/Components` - Blazor component tests
  - `/Models` - Model/entity tests
  - `/Pages` - Page tests

## Coverage Goals

- Overall: 80%+
- Services: 90%+
- Models: 85%+
- Components: 75%+
```

## Testing Best Practices

### DO ✅
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names: `MethodName_Scenario_ExpectedResult`
- Test one thing per test
- Use test data builders for complex objects
- Mock external dependencies
- Test both success and failure paths
- Use `[Theory]` for parameterized tests
- Keep tests fast and independent
- Use FluentAssertions for readable assertions
- Group related tests in nested classes

### DON'T ❌
- Test framework code (built-in Blazor/ASP.NET functionality)
- Test trivial getters/setters without logic
- Create tests that depend on test execution order
- Use hardcoded dates or random values without seeding
- Test implementation details instead of behavior
- Copy-paste test code (use helper methods)
- Ignore failing tests
- Mock everything (test real logic when possible)

## Common Patterns for MyPetVenues

### Testing Blazor Components with Parameters
```csharp
var cut = RenderComponent<VenueCard>(parameters => parameters
    .Add(p => p.Venue, testVenue)
    .Add(p => p.OnClick, EventCallback.Factory.Create(this, HandleClick)));
```

### Testing Services with Dependencies
```csharp
var mockRepo = new Mock<IVenueRepository>();
mockRepo.Setup(r => r.GetAll()).Returns(testData);
var service = new VenueService(mockRepo.Object);
```

### Testing Async Methods
```csharp
[Fact]
public async Task GetVenuesAsync_ShouldReturnVenues()
{
    // Arrange
    var service = new VenueService();
    
    // Act
    var result = await service.GetVenuesAsync();
    
    // Assert
    result.Should().NotBeEmpty();
}
```

## Autonomous Operation

When running this prompt:

1. **Analyze** current state without asking
2. **Create** missing test projects if needed
3. **Generate** tests systematically
4. **Run** tests and verify they pass
5. **Check** coverage and identify gaps
6. **Continue** iterating until 80% is reached
7. **Report** progress at each milestone (every 10% gained)

## Progress Reporting Template

After each batch of tests:

```
✅ Coverage Update: [X]% → [Y]% (+[Z]%)

Recently Tested:
- VenueService.SearchVenues - 8 tests added
- BookingService.CreateBooking - 6 tests added
- Venue model validation - 4 tests added

Remaining Gaps:
- UserService.UpdateProfile (0% coverage)
- ThemeService (40% coverage)
- Review model (55% coverage)

Next Focus: UserService.UpdateProfile
```

## Completion Criteria

Stop when:
- ✅ Overall coverage ≥ 80%
- ✅ All critical services ≥ 90%
- ✅ All tests pass
- ✅ Coverage report generated
- ✅ TESTING.md updated
- ✅ No obvious gaps in business logic

## Troubleshooting

### Tests won't run
- Ensure test project references main project
- Check all required NuGet packages installed
- Verify .NET SDK version compatibility

### Coverage not generating
- Install coverlet.collector package
- Use `--collect:"XPlat Code Coverage"` flag
- Check for reportgenerator tool installation

### bUnit tests failing
- Ensure bUnit and bUnit.web packages installed
- Inherit from `TestContext` base class
- Use `RenderComponent<T>()` for rendering

### Low coverage on Blazor components
- Focus on logic/event handlers, not markup
- Test parameter validation
- Test callback invocations
- Mock JavaScript interop if needed

---

**Remember:** The goal is not just 80% coverage, but **meaningful tests** that catch real bugs and document expected behavior. Quality over quantity!
