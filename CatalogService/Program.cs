using CatalogService;
using CatalogService.Services.Interfaces;
using CatalogService.Repositories.Interfaces;
using CatalogService.Services;
using CatalogService.Repositories;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Load configuration for multiple environments
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connection string logic for environments
string? connectionString = null;
if (builder.Environment.IsProduction())
{
    connectionString = Environment.GetEnvironmentVariable("SQL_CONNECTION_STRING");
    if (string.IsNullOrWhiteSpace(connectionString))
    {
        throw new InvalidOperationException("Missing SQL_CONNECTION_STRING environment variable in Production environment.");
    }
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrWhiteSpace(connectionString))
    {
        throw new InvalidOperationException($"Missing DefaultConnection in configuration for {builder.Environment.EnvironmentName} environment.");
    }
}

builder.Services.AddDbContext<CatalogDbContext>(options =>
    options.UseSqlServer(connectionString));

// Health checks with EF Core
builder.Services.AddHealthChecks()
    .AddDbContextCheck<CatalogDbContext>(
        name: "database",
        tags: new [] { "db", "ready" });

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ReactPolicy");
app.MapControllers();

// Health checks endpoint
app.MapHealthChecks("/health");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
