using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using CatalogService.Exceptions;

namespace CatalogService.Exceptions
{
    /// <summary>
    /// Utility class for converting business logic exceptions to Problem Details (RFC 7807)
    /// </summary>
    public static class ProblemDetailsFactory
    {
        private static readonly Dictionary<ErrorCode, ErrorDetails> ErrorMappings = new()
        {
            // Validation errors
            { ErrorCode.ValidationError, (HttpStatusCode.BadRequest, "validation-error", "One or more validation errors occurred") },
            { ErrorCode.CategoryNameRequired, (HttpStatusCode.BadRequest, "validation-error", "Category name is required") },
            { ErrorCode.CategoryNameTooLong, (HttpStatusCode.BadRequest, "validation-error", "Category name is too long") },
            { ErrorCode.ProductNameRequired, (HttpStatusCode.BadRequest, "validation-error", "Product name is required") },
            { ErrorCode.ProductPriceInvalid, (HttpStatusCode.BadRequest, "validation-error", "Product price is invalid") },
            { ErrorCode.ProductCategoryRequired, (HttpStatusCode.BadRequest, "validation-error", "Product category is required") },
            { ErrorCode.ProductOutOfStock, (HttpStatusCode.BadRequest, "validation-error", "Product is out of stock") },

            // Not found errors
            { ErrorCode.NotFound, (HttpStatusCode.NotFound, "resource-not-found", "The requested resource was not found") },
            { ErrorCode.CategoryNotFound, (HttpStatusCode.NotFound, "category-not-found", "The requested category was not found") },
            { ErrorCode.ProductNotFound, (HttpStatusCode.NotFound, "product-not-found", "The requested product was not found") },

            // Duplicate resource errors
            { ErrorCode.DuplicateResource, (HttpStatusCode.Conflict, "duplicate-resource", "The resource already exists") },
            { ErrorCode.CategoryAlreadyExists, (HttpStatusCode.Conflict, "category-exists", "A category with this name already exists") },
            { ErrorCode.ProductAlreadyExists, (HttpStatusCode.Conflict, "product-exists", "A product with this name already exists") },

            // Unauthorized operation errors
            { ErrorCode.UnauthorizedOperation, (HttpStatusCode.Forbidden, "unauthorized-operation", "The operation is not authorized") },
            { ErrorCode.CannotDeleteCategoryWithProducts, (HttpStatusCode.Forbidden, "cannot-delete-category", "Cannot delete category with existing products") },
            { ErrorCode.CannotModifyArchivedProduct, (HttpStatusCode.Forbidden, "cannot-modify-archived", "Cannot modify archived product") },
            { ErrorCode.InsufficientPermissions, (HttpStatusCode.Forbidden, "insufficient-permissions", "Insufficient permissions to perform this operation") },

            // Unknown errors
            { ErrorCode.Unknown, (HttpStatusCode.InternalServerError, "internal-error", "An internal error occurred") }
        };

        /// <summary>
        /// Creates a ProblemDetails object from a BusinessLogicException
        /// </summary>
        /// <param name="exception">The business logic exception</param>
        /// <param name="httpContext">The HTTP context</param>
        /// <returns>A ProblemDetails object</returns>
        public static ProblemDetails CreateProblemDetails(BusinessLogicException exception, HttpContext httpContext = null)
        {
            var mapping = ErrorMappings.GetValueOrDefault(exception.ErrorCode, 
                (HttpStatusCode.InternalServerError, "internal-error", "An internal error occurred"));

            var problemDetails = new ProblemDetails
            {
                //Type = $"https://api.ecommerce.com/errors/{mapping.Type}",
                Title = mapping.Title,
                Status = (int)mapping.StatusCode,
                Detail = exception.Message,
                Instance = httpContext?.Request?.Path.Value
            };

            // Add error code
            problemDetails.Extensions["errorCode"] = exception.ErrorCode.ToString();
            problemDetails.Extensions["timestamp"] = exception.Timestamp;

            // Add specific properties based on exception type
            switch (exception)
            {
                case NotFoundException notFoundEx:
                    problemDetails.Extensions["resourceName"] = notFoundEx.ResourceName;
                    problemDetails.Extensions["resourceId"] = notFoundEx.ResourceId;
                    break;

                case ValidationException validationEx:
                    problemDetails.Extensions["validationErrors"] = validationEx.ValidationErrors;
                    break;

                case DuplicateResourceException duplicateEx:
                    problemDetails.Extensions["resourceName"] = duplicateEx.ResourceName;
                    problemDetails.Extensions["resourceId"] = duplicateEx.ResourceId;
                    problemDetails.Extensions["conflictField"] = duplicateEx.ConflictField;
                    break;

                case UnauthorizedBusinessOperationException unauthorizedEx:
                    problemDetails.Extensions["operation"] = unauthorizedEx.Operation;
                    problemDetails.Extensions["resource"] = unauthorizedEx.Resource;
                    problemDetails.Extensions["reason"] = unauthorizedEx.Reason;
                    break;
            }

            // Add context information
            if (exception.Context.Count > 0)
            {
                problemDetails.Extensions["context"] = exception.Context;
            }

            // Add trace ID if available
            if (httpContext?.TraceIdentifier != null)
            {
                problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;
            }

            return problemDetails;
        }

        /// <summary>
        /// Creates a ValidationProblemDetails object from a ValidationException
        /// </summary>
        /// <param name="validationException">The validation exception</param>
        /// <param name="httpContext">The HTTP context</param>
        /// <returns>A ValidationProblemDetails object</returns>
        public static ValidationProblemDetails CreateValidationProblemDetails(ValidationException validationException, HttpContext httpContext = null)
        {
            var validationProblemDetails = new ValidationProblemDetails
            {
                Type = "https://api.ecommerce.com/errors/validation-error",
                Title = "One or more validation errors occurred",
                Status = (int)HttpStatusCode.BadRequest,
                Detail = "Please refer to the errors property for additional details.",
                Instance = httpContext?.Request?.Path.Value
            };

            // Add validation errors to the Errors dictionary
            foreach (var error in validationException.ValidationErrors)
            {
                var field = string.IsNullOrEmpty(error.Field) ? "general" : error.Field;
                
                if (validationProblemDetails.Errors.ContainsKey(field))
                {
                    var existingErrors = validationProblemDetails.Errors[field];
                    var newErrors = new string[existingErrors.Length + 1];
                    existingErrors.CopyTo(newErrors, 0);
                    newErrors[existingErrors.Length] = error.Message;
                    validationProblemDetails.Errors[field] = newErrors;
                }
                else
                {
                    validationProblemDetails.Errors[field] = new[] { error.Message };
                }
            }

            // Add additional extensions
            validationProblemDetails.Extensions["errorCode"] = validationException.ErrorCode.ToString();
            validationProblemDetails.Extensions["timestamp"] = validationException.Timestamp;

            if (httpContext?.TraceIdentifier != null)
            {
                validationProblemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;
            }

            return validationProblemDetails;
        }

        /// <summary>
        /// Gets the appropriate HTTP status code for a business logic exception
        /// </summary>
        /// <param name="exception">The business logic exception</param>
        /// <returns>The HTTP status code</returns>
        public static HttpStatusCode GetStatusCode(BusinessLogicException exception)
        {
            return ErrorMappings.GetValueOrDefault(exception.ErrorCode, 
                (HttpStatusCode.InternalServerError, "", "")).StatusCode;
        }

        /// <summary>
        /// Gets the problem type URI for a business logic exception
        /// </summary>
        /// <param name="exception">The business logic exception</param>
        /// <returns>The problem type URI</returns>
        public static string GetProblemType(BusinessLogicException exception)
        {
            var mapping = ErrorMappings.GetValueOrDefault(exception.ErrorCode, 
                (HttpStatusCode.InternalServerError, "internal-error", ""));
            return $"https://api.ecommerce.com/errors/{mapping.Type}";
        }
    }

    internal record struct ErrorDetails(HttpStatusCode StatusCode, string Type, string Title)
    {
        public static implicit operator (HttpStatusCode StatusCode, string Type, string Title)(ErrorDetails value)
        {
            return (value.StatusCode, value.Type, value.Title);
        }

        public static implicit operator ErrorDetails((HttpStatusCode StatusCode, string Type, string Title) value)
        {
            return new ErrorDetails(value.StatusCode, value.Type, value.Title);
        }
    }
}
