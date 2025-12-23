using System.Diagnostics;

namespace MyPetVenues.Api.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        var requestId = Activity.Current?.Id ?? context.TraceIdentifier;

        _logger.LogInformation("HTTP {Method} {Path} started. RequestId: {RequestId}",
            context.Request.Method, context.Request.Path, requestId);

        try
        {
            await _next(context);
            sw.Stop();

            _logger.LogInformation("HTTP {Method} {Path} responded {StatusCode} in {ElapsedMs}ms. RequestId: {RequestId}",
                context.Request.Method, context.Request.Path, context.Response.StatusCode, sw.ElapsedMilliseconds, requestId);
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "HTTP {Method} {Path} failed after {ElapsedMs}ms. RequestId: {RequestId}",
                context.Request.Method, context.Request.Path, sw.ElapsedMilliseconds, requestId);
            throw;
        }
    }
}
