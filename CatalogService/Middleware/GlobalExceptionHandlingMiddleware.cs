using CatalogService.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using static CatalogService.Exceptions.ProblemDetailsFactory;

namespace CatalogService.Middleware
{
    /// <summary>
    /// Global exception handling middleware that converts exceptions to proper HTTP responses
    /// </summary>
    public class GlobalExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

        public GlobalExceptionHandlingMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

            ProblemDetails problemDetails;

            switch (exception)
            {
                case BusinessLogicException businessEx:
                    problemDetails = CreateProblemDetails(businessEx, context);
                    _logger.LogWarning(businessEx, "Business logic exception: {ErrorCode} - {Message}", 
                        businessEx.ErrorCode, businessEx.Message);
                    break;

                case ArgumentNullException argNullEx:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Bad Request",
                        Detail = $"Required parameter '{argNullEx.ParamName}' was not provided.",
                        Status = (int)HttpStatusCode.BadRequest,
                        Type = "https://httpstatuses.com/400",
                        Instance = context.Request.Path
                    };
                    break;

                case ArgumentException argEx:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Bad Request",
                        Detail = argEx.Message,
                        Status = (int)HttpStatusCode.BadRequest,
                        Type = "https://httpstatuses.com/400",
                        Instance = context.Request.Path
                    };
                    break;

                case UnauthorizedAccessException:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Unauthorized",
                        Detail = "Access to this resource is not authorized.",
                        Status = (int)HttpStatusCode.Unauthorized,
                        Type = "https://httpstatuses.com/401",
                        Instance = context.Request.Path
                    };
                    break;

                case NotImplementedException:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Not Implemented",
                        Detail = "This functionality is not yet implemented.",
                        Status = (int)HttpStatusCode.NotImplemented,
                        Type = "https://httpstatuses.com/501",
                        Instance = context.Request.Path
                    };
                    break;

                case TimeoutException:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Request Timeout",
                        Detail = "The request timed out. Please try again later.",
                        Status = (int)HttpStatusCode.RequestTimeout,
                        Type = "https://httpstatuses.com/408",
                        Instance = context.Request.Path
                    };
                    break;

                default:
                    problemDetails = new ProblemDetails
                    {
                        Title = "Internal Server Error",
                        Detail = "An unexpected error occurred. Please try again later.",
                        Status = (int)HttpStatusCode.InternalServerError,
                        Type = "https://httpstatuses.com/500",
                        Instance = context.Request.Path
                    };
                    break;
            }

            // Add traceId for debugging
            problemDetails.Extensions["traceId"] = context.TraceIdentifier;

            context.Response.StatusCode = problemDetails.Status ?? (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/problem+json";

            var json = JsonSerializer.Serialize(problemDetails, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });

            await context.Response.WriteAsync(json);
        }
    }
}