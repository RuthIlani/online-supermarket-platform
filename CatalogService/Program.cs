using CatalogService;
using CatalogService.Services.Interfaces;
using CatalogService.Repositories.Interfaces;
using CatalogService.Services;
using CatalogService.Repositories;
using CatalogService.Middleware;
using CatalogService.HealthChecks;
using CatalogService.Extensions;
using CatalogService.Mappings;
using Microsoft.EntityFrameworkCore;
using CatalogService.Data;
using AutoMapper;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

// Load configuration for multiple environments with User Secrets support
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add User Secrets in Development environment
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enhanced connection string logic with multiple fallback options
string? connectionString = null;

// Priority order: Environment Variable > User Secrets > Configuration
connectionString = Environment.GetEnvironmentVariable("SQL_CONNECTION_STRING") 
                   ?? builder.Configuration["ConnectionStrings:DefaultConnection"]
                   ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    var environment = builder.Environment.EnvironmentName;
    var message = environment == "Production" 
        ? "Missing SQL_CONNECTION_STRING environment variable in Production environment."
        : $"Missing connection string. Please set it in User Secrets, appsettings.{environment}.json, or SQL_CONNECTION_STRING environment variable.";
    
    throw new InvalidOperationException(message);
}

builder.Services.AddDbContext<CatalogDbContext>(options =>
    options.UseSqlServer(connectionString));

// Enhanced Health checks for production
builder.Services.AddHealthChecks()
    // Database connectivity check
    .AddDbContextCheck<CatalogDbContext>(
        name: "database",
        failureStatus: HealthStatus.Unhealthy,
        tags: new[] { "db", "ready" })
    
    // SQL Server connection check
    .AddSqlServer(
        connectionString,
        name: "sql-server",
        failureStatus: HealthStatus.Unhealthy,
        tags: new[] { "db", "sql", "ready" })
    
    // Custom application service checks
    .AddCheck<CatalogServiceHealthCheck>(
        name: "catalog-service", 
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "service", "ready" })
    
    // Memory usage check
    .AddCheck<MemoryHealthCheck>(
        name: "memory", 
        failureStatus: HealthStatus.Degraded,
        tags: new[] { "memory", "live" });

// CORS policy for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Dependency Injection for repositories and services
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

var app = builder.Build();

// Global exception handling middleware (should be first in pipeline)
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ReactPolicy");
app.MapControllers();

// Configure health check endpoints
app.MapHealthCheckEndpoints();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
