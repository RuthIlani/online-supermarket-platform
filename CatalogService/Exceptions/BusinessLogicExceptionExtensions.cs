using System.Collections.Generic;
using System.Linq;

namespace CatalogService.Exceptions
{
    /// <summary>
    /// Extension methods for working with business logic exceptions
    /// </summary>
    public static class BusinessLogicExceptionExtensions
    {
        /// <summary>
        /// Creates a NotFoundException for a Category resource
        /// </summary>
        /// <param name="categoryId">The category identifier</param>
        /// <returns>A new NotFoundException</returns>
        public static NotFoundException CategoryNotFound(int categoryId)
        {
            return new NotFoundException("Category", categoryId)
                .AddContext("ErrorCode", ErrorCode.CategoryNotFound) as NotFoundException;
        }

        /// <summary>
        /// Creates a NotFoundException for a Product resource
        /// </summary>
        /// <param name="productId">The product identifier</param>
        /// <returns>A new NotFoundException</returns>
        public static NotFoundException ProductNotFound(int productId)
        {
            return new NotFoundException("Product", productId)
                .AddContext("ErrorCode", ErrorCode.ProductNotFound) as NotFoundException;
        }

        /// <summary>
        /// Creates a ValidationException for a required field
        /// </summary>
        /// <param name="fieldName">The field name</param>
        /// <returns>A new ValidationException</returns>
        public static ValidationException RequiredField(string fieldName)
        {
            return new ValidationException(fieldName, $"The {fieldName} field is required.");
        }

        /// <summary>
        /// Creates a ValidationException for an invalid price
        /// </summary>
        /// <param name="price">The invalid price value</param>
        /// <returns>A new ValidationException</returns>
        public static ValidationException InvalidPrice(decimal price)
        {
            var error = new ValidationError("Price", "Price must be greater than zero.", price, "INVALID_PRICE");
            return new ValidationException("Price validation failed.", new[] { error });
        }

        /// <summary>
        /// Creates a DuplicateResourceException for a Category name
        /// </summary>
        /// <param name="categoryName">The duplicate category name</param>
        /// <returns>A new DuplicateResourceException</returns>
        public static DuplicateResourceException DuplicateCategoryName(string categoryName)
        {
            return new DuplicateResourceException("Category", "Name", categoryName);
        }

        /// <summary>
        /// Creates a DuplicateResourceException for a Product name
        /// </summary>
        /// <param name="productName">The duplicate product name</param>
        /// <returns>A new DuplicateResourceException</returns>
        public static DuplicateResourceException DuplicateProductName(string productName)
        {
            return new DuplicateResourceException("Product", "Name", productName);
        }

        /// <summary>
        /// Creates an UnauthorizedBusinessOperationException for deleting a category with products
        /// </summary>
        /// <param name="categoryId">The category identifier</param>
        /// <param name="productCount">The number of products in the category</param>
        /// <returns>A new UnauthorizedBusinessOperationException</returns>
        public static UnauthorizedBusinessOperationException CannotDeleteCategoryWithProducts(int categoryId, int productCount)
        {
            return new UnauthorizedBusinessOperationException(
                "Delete", 
                $"Category {categoryId}", 
                $"Category contains {productCount} product(s). Remove products before deleting the category.")
                .AddContext("ProductCount", productCount) as UnauthorizedBusinessOperationException;
        }

        /// <summary>
        /// Determines if the exception represents a validation error
        /// </summary>
        /// <param name="exception">The exception to check</param>
        /// <returns>True if the exception is a validation error</returns>
        public static bool IsValidationError(this BusinessLogicException exception)
        {
            return exception is ValidationException || 
                   exception.ErrorCode >= ErrorCode.ValidationError && exception.ErrorCode < ErrorCode.NotFound;
        }

        /// <summary>
        /// Determines if the exception represents a not found error
        /// </summary>
        /// <param name="exception">The exception to check</param>
        /// <returns>True if the exception is a not found error</returns>
        public static bool IsNotFoundError(this BusinessLogicException exception)
        {
            return exception is NotFoundException || 
                   exception.ErrorCode >= ErrorCode.NotFound && exception.ErrorCode < ErrorCode.DuplicateResource;
        }

        /// <summary>
        /// Determines if the exception represents a duplicate resource error
        /// </summary>
        /// <param name="exception">The exception to check</param>
        /// <returns>True if the exception is a duplicate resource error</returns>
        public static bool IsDuplicateError(this BusinessLogicException exception)
        {
            return exception is DuplicateResourceException || 
                   exception.ErrorCode >= ErrorCode.DuplicateResource && exception.ErrorCode < ErrorCode.UnauthorizedOperation;
        }

        /// <summary>
        /// Determines if the exception represents an unauthorized operation error
        /// </summary>
        /// <param name="exception">The exception to check</param>
        /// <returns>True if the exception is an unauthorized operation error</returns>
        public static bool IsUnauthorizedError(this BusinessLogicException exception)
        {
            return exception is UnauthorizedBusinessOperationException || 
                   exception.ErrorCode >= ErrorCode.UnauthorizedOperation;
        }

        /// <summary>
        /// Gets all validation error messages as a single string
        /// </summary>
        /// <param name="exception">The validation exception</param>
        /// <param name="separator">The separator between error messages</param>
        /// <returns>A concatenated string of validation errors</returns>
        public static string GetValidationErrorsAsString(this ValidationException exception, string separator = "; ")
        {
            return string.Join(separator, exception.ValidationErrors.Select(e => $"{e.Field}: {e.Message}"));
        }

        /// <summary>
        /// Gets validation errors grouped by field name
        /// </summary>
        /// <param name="exception">The validation exception</param>
        /// <returns>A dictionary of field names and their error messages</returns>
        public static Dictionary<string, List<string>> GetValidationErrorsByField(this ValidationException exception)
        {
            return exception.ValidationErrors
                .GroupBy(e => e.Field)
                .ToDictionary(g => g.Key, g => g.Select(e => e.Message).ToList());
        }
    }
}
