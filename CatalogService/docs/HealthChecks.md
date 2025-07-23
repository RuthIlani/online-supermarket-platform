# Health Checks Documentation

This document describes the comprehensive health check system implemented for the Catalog Service API.

## Architecture

The health check system is organized into the following components:

### 1. **Health Check Classes** (`HealthChecks/`)
- `CatalogServiceHealthCheck.cs` - Custom application logic validation
- `MemoryHealthCheck.cs` - System memory usage monitoring

### 2. **Health Check Extensions** (`Extensions/`)
- `HealthCheckEndpointExtensions.cs` - Centralized endpoint configuration and response formatting

### 3. **Program.cs Configuration**
- Health check service registration
- Simple endpoint mapping using extension methods

## Health Check Endpoints

The service provides multiple health check endpoints for different monitoring scenarios:

### 1. `/health` - Basic Health Check
- **Purpose**: Simple health status for load balancers
- **Response**: Basic JSON with status, timestamp, and duration
- **Use Case**: Load balancer health checks, simple monitoring

### 2. `/health/ready` - Readiness Check
- **Purpose**: Kubernetes readiness probes
- **Checks**: Database connectivity, SQL Server connection, catalog service functionality
- **Response**: Detailed JSON with individual check results
- **Use Case**: Container orchestration readiness probes

### 3. `/health/live` - Liveness Check
- **Purpose**: Kubernetes liveness probes
- **Checks**: Memory usage monitoring
- **Response**: Detailed JSON with memory metrics
- **Use Case**: Container orchestration liveness probes

### 4. `/health/detailed` - Comprehensive Health Check
- **Purpose**: Full system monitoring and debugging
- **Checks**: All health checks with full details
- **Response**: Complete JSON with all metrics, exceptions, environment info
- **Use Case**: System monitoring, debugging, operations dashboard

## Health Check Components

### 1. Database Health Checks
- **DbContext Check**: Verifies Entity Framework connectivity
- **SQL Server Check**: Direct SQL Server connection validation
- **Tags**: `db`, `ready`, `sql`

### 2. Application Service Health Check
- **CatalogServiceHealthCheck**: Custom check validating catalog functionality
- **Validation**: Verifies categories and products are accessible
- **Status Logic**:
  - `Healthy`: Service working with data available
  - `Degraded`: Service working but no data found
  - `Unhealthy`: Service errors or exceptions
- **Tags**: `service`, `ready`

### 3. Memory Health Check
- **MemoryHealthCheck**: Monitors system memory usage
- **Threshold**: 1GB allocated memory (configurable)
- **Metrics**: Allocated bytes, working set, memory in MB
- **Status Logic**:
  - `Healthy`: Memory usage within limits
  - `Degraded`: High memory usage detected
  - `Unhealthy`: Unable to check memory
- **Tags**: `memory`, `live`

## Code Organization

### Extension Method Usage
```csharp
// In Program.cs - Clean and simple
app.MapHealthCheckEndpoints();
```

### Adding New Health Checks
1. **Create Health Check Class**:
```csharp
public class CustomHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        // Implementation
    }
}
```

2. **Register in Program.cs**:
```csharp
builder.Services.AddHealthChecks()
    .AddCheck<CustomHealthCheck>(
        name: "custom-check",
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "custom", "ready" });
```

3. **Endpoint automatically included** - no changes needed to extension methods

### Customizing Response Formats
Modify the response writers in `HealthCheckEndpointExtensions.cs`:
- `WriteBasicHealthCheckResponse` - Basic endpoint
- `WriteDetailedHealthCheckResponse` - Ready/Live endpoints  
- `WriteComprehensiveHealthCheckResponse` - Detailed endpoint

## Response Formats

### Basic Response (`/health`)
```json
{
  "status": "Healthy",
  "timestamp": "2025-01-22T13:00:00Z",
  "duration": "00:00:00.123"
}
```

### Detailed Response (`/health/detailed`)
```json
{
  "status": "Healthy",
  "checks": [
    {
      "name": "database",
      "status": "Healthy",
      "description": "Entity Framework Core database connectivity",
      "duration": "00:00:00.050",
      "tags": ["db", "ready"],
      "data": {},
      "exception": null
    }
  ],
  "timestamp": "2025-01-22T13:00:00Z",
  "duration": "00:00:00.200",
  "environment": "Production",
  "version": "1.0.0.0",
  "machineName": "web-server-01",
  "processId": 1234
}
```

## Production Configuration

### Environment Variables
- **SQL_CONNECTION_STRING**: Production database connection string (required in production)
- Health checks automatically use production connection string

### Status Codes
- **200 OK**: All checks healthy
- **200 OK**: Some checks degraded but service operational
- **503 Service Unavailable**: Critical checks unhealthy

### Monitoring Integration
- **Prometheus**: Can scrape health endpoints for metrics
- **Kubernetes**: Use `/health/ready` and `/health/live` for probes
- **Load Balancers**: Use `/health` for simple status checks
- **APM Tools**: Use `/health/detailed` for comprehensive monitoring

## Benefits of This Architecture

### ? **Maintainability**
- Centralized endpoint configuration
- Separation of concerns
- Easy to modify response formats

### ? **Extensibility**
- Simple to add new health checks
- Automatic inclusion in endpoints
- Flexible tagging system

### ? **Clean Code**
- Program.cs stays focused and readable
- Reusable extension methods
- Well-organized file structure

### ? **Production Ready**
- Comprehensive monitoring capabilities
- Multiple endpoint types for different use cases
- Rich diagnostic information

## Security Considerations

- Health check endpoints are public (no authentication required)
- Detailed endpoint should be secured in production environments
- Consider network-level restrictions for sensitive health data
- Monitor for potential information leakage in error messages

## Performance Impact

- Health checks run on-demand (not cached)
- Database checks perform actual connectivity tests
- Memory checks have minimal performance impact
- Consider timeout configuration for external dependencies