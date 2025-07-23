using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Text.Json;

namespace CatalogService.Extensions
{
    /// <summary>
    /// Extension methods for configuring health check endpoints
    /// </summary>
    public static class HealthCheckEndpointExtensions
    {
        /// <summary>
        /// Maps all health check endpoints with custom response writers
        /// </summary>
        public static WebApplication MapHealthCheckEndpoints(this WebApplication app)
        {
            // Basic health check (simple response for load balancers)
            app.MapHealthChecks("/health", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = WriteBasicHealthCheckResponse
            });

            // Readiness check (for Kubernetes readiness probes)
            app.MapHealthChecks("/health/ready", new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains("ready"),
                ResponseWriter = WriteDetailedHealthCheckResponse
            });

            // Liveness check (for Kubernetes liveness probes)
            app.MapHealthChecks("/health/live", new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains("live"),
                ResponseWriter = WriteDetailedHealthCheckResponse
            });

            // Detailed health check (for monitoring and debugging)
            app.MapHealthChecks("/health/detailed", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = WriteComprehensiveHealthCheckResponse
            });

            return app;
        }

        /// <summary>
        /// Writes a basic health check response with minimal information
        /// </summary>
        private static async Task WriteBasicHealthCheckResponse(HttpContext context, HealthReport report)
        {
            context.Response.ContentType = "application/json";
            var response = new
            {
                status = report.Status.ToString(),
                timestamp = DateTime.UtcNow,
                duration = report.TotalDuration
            };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }

        /// <summary>
        /// Writes a detailed health check response with individual check results
        /// </summary>
        private static async Task WriteDetailedHealthCheckResponse(HttpContext context, HealthReport report)
        {
            context.Response.ContentType = "application/json";
            var response = new
            {
                status = report.Status.ToString(),
                checks = report.Entries.Select(entry => new
                {
                    name = entry.Key,
                    status = entry.Value.Status.ToString(),
                    description = entry.Value.Description,
                    duration = entry.Value.Duration,
                    data = entry.Value.Data
                }),
                timestamp = DateTime.UtcNow,
                duration = report.TotalDuration
            };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            }));
        }

        /// <summary>
        /// Writes a comprehensive health check response with full system information
        /// </summary>
        private static async Task WriteComprehensiveHealthCheckResponse(HttpContext context, HealthReport report)
        {
            context.Response.ContentType = "application/json";
            var response = new
            {
                status = report.Status.ToString(),
                checks = report.Entries.Select(entry => new
                {
                    name = entry.Key,
                    status = entry.Value.Status.ToString(),
                    description = entry.Value.Description,
                    duration = entry.Value.Duration,
                    tags = entry.Value.Tags,
                    data = entry.Value.Data,
                    exception = entry.Value.Exception?.Message
                }),
                timestamp = DateTime.UtcNow,
                duration = report.TotalDuration,
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown",
                version = typeof(HealthCheckEndpointExtensions).Assembly.GetName().Version?.ToString(),
                machineName = Environment.MachineName,
                processId = Environment.ProcessId
            };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            }));
        }
    }
}