namespace MyPetVenues.Api.Options;

public class MonitoringOptions
{
    public const string SectionName = "Monitoring";
    
    public string ApplicationInsightsConnectionString { get; set; } = string.Empty;
    public string ServiceName { get; set; } = "MyPetVenues.Api";
    public string ServiceVersion { get; set; } = "1.0.0";
}
