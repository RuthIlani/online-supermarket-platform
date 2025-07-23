using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace CatalogService.HealthChecks
{
    /// <summary>
    /// Health check to monitor system memory usage
    /// </summary>
    public class MemoryHealthCheck : IHealthCheck
    {
        private readonly ILogger<MemoryHealthCheck> _logger;
        private readonly long _thresholdInBytes;

        public MemoryHealthCheck(ILogger<MemoryHealthCheck> logger)
        {
            _logger = logger;
            // Set threshold to 1GB (adjustable based on your system requirements)
            _thresholdInBytes = 1024L * 1024L * 1024L;
        }

        public Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context, 
            CancellationToken cancellationToken = default)
        {
            try
            {
                var allocated = GC.GetTotalMemory(false);
                var workingSet = Environment.WorkingSet;
                
                var data = new Dictionary<string, object>
                {
                    ["allocated_bytes"] = allocated,
                    ["working_set_bytes"] = workingSet,
                    ["allocated_mb"] = allocated / 1024 / 1024,
                    ["working_set_mb"] = workingSet / 1024 / 1024,
                    ["threshold_mb"] = _thresholdInBytes / 1024 / 1024,
                    ["check_time"] = DateTime.UtcNow
                };

                if (allocated > _thresholdInBytes)
                {
                    _logger.LogWarning("High memory usage detected: {AllocatedMB} MB", allocated / 1024 / 1024);
                    return Task.FromResult(HealthCheckResult.Degraded("High memory usage detected", data: data));
                }

                _logger.LogDebug("Memory usage is within acceptable limits");
                return Task.FromResult(HealthCheckResult.Healthy("Memory usage is normal", data: data));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Memory health check failed");
                return Task.FromResult(HealthCheckResult.Unhealthy("Unable to check memory usage", ex));
            }
        }
    }
}