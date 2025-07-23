namespace CatalogService.Exceptions
{
    /// <summary>
    /// Base exception class for all business logic related exceptions
    /// </summary>
    [Serializable]
    public class BusinessLogicException : Exception
    {
        public ErrorCode ErrorCode { get; }
        public Dictionary<string, object> Context { get; }
        public DateTime Timestamp { get; }

        public BusinessLogicException()
            : this(ErrorCode.Unknown, "An unknown business logic error occurred.")
        {
        }

        public BusinessLogicException(string message)
            : this(ErrorCode.Unknown, message)
        {
        }

        public BusinessLogicException(string message, Exception innerException)
            : this(ErrorCode.Unknown, message, innerException)
        {
        }

        public BusinessLogicException(ErrorCode errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
            Context = new Dictionary<string, object>();
            Timestamp = DateTime.UtcNow;
        }

        public BusinessLogicException(ErrorCode errorCode, string message, Exception innerException)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
            Context = new Dictionary<string, object>();
            Timestamp = DateTime.UtcNow;
        }

        public BusinessLogicException AddContext(string key, object value)
        {
            Context[key] = value;
            return this;
        }
    }

    /// <summary>
    /// Exception thrown when a requested resource is not found
    /// </summary>
    [Serializable]
    public class NotFoundException : BusinessLogicException
    {
        public string ResourceName { get; }
        public object ResourceId { get; }

        public NotFoundException(string resourceName, object resourceId)
            : base(ErrorCode.NotFound, $"{resourceName} with identifier '{resourceId}' was not found.")
        {
            ResourceName = resourceName;
            ResourceId = resourceId;
            AddContext("ResourceName", resourceName);
            AddContext("ResourceId", resourceId);
        }

        public NotFoundException(string resourceName, object resourceId, string message)
            : base(ErrorCode.NotFound, message)
        {
            ResourceName = resourceName;
            ResourceId = resourceId;
            AddContext("ResourceName", resourceName);
            AddContext("ResourceId", resourceId);
        }
    }

    /// <summary>
    /// Exception thrown when validation errors occur
    /// </summary>
    [Serializable]
    public class ValidationException : BusinessLogicException
    {
        public IReadOnlyList<ValidationError> ValidationErrors { get; }

        public ValidationException(string field, string message)
            : base(ErrorCode.ValidationError, $"Validation failed for field '{field}': {message}")
        {
            ValidationErrors = new List<ValidationError> { new ValidationError(field, message) };
            AddContext("ValidationErrors", ValidationErrors);
        }

        public ValidationException(IEnumerable<ValidationError> validationErrors)
            : base(ErrorCode.ValidationError, "One or more validation errors occurred.")
        {
            ValidationErrors = validationErrors?.ToList() ?? new List<ValidationError>();
            AddContext("ValidationErrors", ValidationErrors);
        }

        public ValidationException(string message, IEnumerable<ValidationError> validationErrors)
            : base(ErrorCode.ValidationError, message)
        {
            ValidationErrors = validationErrors?.ToList() ?? new List<ValidationError>();
            AddContext("ValidationErrors", ValidationErrors);
        }
    }

    /// <summary>
    /// Exception thrown when attempting to create a resource that already exists
    /// </summary>
    [Serializable]
    public class DuplicateResourceException : BusinessLogicException
    {
        public string ResourceName { get; }
        public object ResourceId { get; }
        public string ConflictField { get; }

        public DuplicateResourceException(string resourceName, string conflictField, object resourceId)
            : base(ErrorCode.DuplicateResource, $"{resourceName} with {conflictField} '{resourceId}' already exists.")
        {
            ResourceName = resourceName;
            ResourceId = resourceId;
            ConflictField = conflictField;
            AddContext("ResourceName", resourceName);
            AddContext("ResourceId", resourceId);
            AddContext("ConflictField", conflictField);
        }
    }

    /// <summary>
    /// Exception thrown when a business operation is not authorized
    /// </summary>
    [Serializable]
    public class UnauthorizedBusinessOperationException : BusinessLogicException
    {
        public string Operation { get; }
        public string Resource { get; }
        public string Reason { get; }

        public UnauthorizedBusinessOperationException(string operation, string resource, string reason)
            : base(ErrorCode.UnauthorizedOperation, $"Operation '{operation}' on '{resource}' is not authorized: {reason}")
        {
            Operation = operation;
            Resource = resource;
            Reason = reason;
            AddContext("Operation", operation);
            AddContext("Resource", resource);
            AddContext("Reason", reason);
        }
    }
}
