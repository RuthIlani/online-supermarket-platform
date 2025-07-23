using Microsoft.Extensions.Diagnostics.HealthChecks;
using CatalogService.Services.Interfaces;

namespace CatalogService.HealthChecks
{
    /// <summary>
    /// Custom health check to verify the catalog service is functioning properly
    /// </summary>
    public class CatalogServiceHealthCheck : IHealthCheck
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly ILogger<CatalogServiceHealthCheck> _logger;

        public CatalogServiceHealthCheck(
            ICategoryService categoryService, 
            IProductService productService,
            ILogger<CatalogServiceHealthCheck> logger)
        {
            _categoryService = categoryService;
            _productService = productService;
            _logger = logger;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context, 
            CancellationToken cancellationToken = default)
        {
            try
            {
                // Test basic service functionality
                var categories = await _categoryService.GetAllAsync();
                var products = await _productService.GetAllAsync();

                var categoryCount = categories.Count();
                var productCount = products.Count();

                var data = new Dictionary<string, object>
                {
                    ["categories_count"] = categoryCount,
                    ["products_count"] = productCount,
                    ["check_time"] = DateTime.UtcNow
                };

                // Determine health status based on data availability
                if (categoryCount == 0 && productCount == 0)
                {
                    _logger.LogWarning("No categories or products found in the catalog");
                    return HealthCheckResult.Degraded("Catalog service is running but contains no data", data: data);
                }

                _logger.LogDebug("Catalog service health check passed");
                return HealthCheckResult.Healthy("Catalog service is functioning properly", data: data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Catalog service health check failed");
                return HealthCheckResult.Unhealthy("Catalog service is not functioning properly", ex);
            }
        }
    }
}