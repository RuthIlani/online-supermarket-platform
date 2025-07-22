namespace CatalogService.Exceptions
{
    /// <summary>
    /// Enumeration of error codes for business logic exceptions
    /// </summary>
    public enum ErrorCode
    {
        // Generic errors
        Unknown = 0,
        ValidationError = 1000,
        NotFound = 2000,
        DuplicateResource = 3000,
        UnauthorizedOperation = 4000,

        // Category specific errors
        CategoryNotFound = 2001,
        CategoryNameRequired = 1001,
        CategoryNameTooLong = 1002,
        CategoryAlreadyExists = 3001,

        // Product specific errors
        ProductNotFound = 2002,
        ProductNameRequired = 1003,
        ProductPriceInvalid = 1004,
        ProductCategoryRequired = 1005,
        ProductAlreadyExists = 3002,
        ProductOutOfStock = 1006,

        // Business operation errors
        CannotDeleteCategoryWithProducts = 4001,
        CannotModifyArchivedProduct = 4002,
        InsufficientPermissions = 4003
    }
}
