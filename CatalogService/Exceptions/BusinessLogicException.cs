using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using CatalogService.Exceptions;

namespace CatalogService.Exceptions
{
    /// <summary>
    /// Base exception class for all business logic related exceptions
    /// </summary>
    [Serializable]
    public class BusinessLogicException : Exception
    {
        /// <summary>
        /// Gets the error code associated with this exception
        /// </summary>
        public ErrorCode ErrorCode { get; }

        /// <summary>
        /// Gets additional context properties for this exception
        /// </summary>
        public Dictionary<string, object> Context { get; }

        /// <summary>
        /// Gets the timestamp when this exception was created
        /// </summary>
        public DateTime Timestamp { get; }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class
        /// </summary>
        public BusinessLogicException()
            : this(ErrorCode.Unknown, "An unknown business logic error occurred.")
        {
        }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class with a specified error message
        /// </summary>
        /// <param name="message">The error message</param>
        public BusinessLogicException(string message)
            : this(ErrorCode.Unknown, message)
        {
        }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class with a specified error message and inner exception
        /// </summary>
        /// <param name="message">The error message</param>
        /// <param name="innerException">The inner exception</param>
        public BusinessLogicException(string message, Exception innerException)
            : this(ErrorCode.Unknown, message, innerException)
        {
        }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class with an error code and message
        /// </summary>
        /// <param name="errorCode">The error code</param>
        /// <param name="message">The error message</param>
        public BusinessLogicException(ErrorCode errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
            Context = new Dictionary<string, object>();
            Timestamp = DateTime.UtcNow;
        }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class with an error code, message, and inner exception
        /// </summary>
        /// <param name="errorCode">The error code</param>
        /// <param name="message">The error message</param>
        /// <param name="innerException">The inner exception</param>
        public BusinessLogicException(ErrorCode errorCode, string message, Exception innerException)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
            Context = new Dictionary<string, object>();
            Timestamp = DateTime.UtcNow;
        }

        /// <summary>
        /// Initializes a new instance of the BusinessLogicException class with serialization data
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        protected BusinessLogicException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            ErrorCode = (ErrorCode)info.GetValue(nameof(ErrorCode), typeof(ErrorCode));
            Context = (Dictionary<string, object>)info.GetValue(nameof(Context), typeof(Dictionary<string, object>)) 
                     ?? new Dictionary<string, object>();
            Timestamp = info.GetDateTime(nameof(Timestamp));
        }

        /// <summary>
        /// Adds context information to the exception
        /// </summary>
        /// <param name="key">The context key</param>
        /// <param name="value">The context value</param>
        /// <returns>The current exception instance for method chaining</returns>
        public BusinessLogicException AddContext(string key, object value)
        {
            Context[key] = value;
            return this;
        }

        /// <summary>
        /// Sets the object data for serialization
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(nameof(ErrorCode), ErrorCode);
            info.AddValue(nameof(Context), Context);
            info.AddValue(nameof(Timestamp), Timestamp);
        }
    }

    /// <summary>
    /// Exception thrown when a requested resource is not found
    /// </summary>
    [Serializable]
    public class NotFoundException : BusinessLogicException
    {
        /// <summary>
        /// Gets the name of the resource that was not found
        /// </summary>
        public string ResourceName { get; }

        /// <summary>
        /// Gets the identifier of the resource that was not found
        /// </summary>
        public object ResourceId { get; }

        /// <summary>
        /// Initializes a new instance of the NotFoundException class
        /// </summary>
        /// <param name="resourceName">The name of the resource</param>
        /// <param name="resourceId">The identifier of the resource</param>
        public NotFoundException(string resourceName, object resourceId)
            : base(ErrorCode.NotFound, $"{resourceName} with identifier '{resourceId}' was not found.")
        {
            ResourceName = resourceName;
            ResourceId = resourceId;
            AddContext("ResourceName", resourceName);
            AddContext("ResourceId", resourceId);
        }

        /// <summary>
        /// Initializes a new instance of the NotFoundException class with a custom message
        /// </summary>
        /// <param name="resourceName">The name of the resource</param>
        /// <param name="resourceId">The identifier of the resource</param>
        /// <param name="message">The custom error message</param>
        public NotFoundException(string resourceName, object resourceId, string message)
            : base(ErrorCode.NotFound, message)
        {
            ResourceName = resourceName;
            ResourceId = resourceId;
            AddContext("ResourceName", resourceName);
            AddContext("ResourceId", resourceId);
        }

        /// <summary>
        /// Initializes a new instance of the NotFoundException class with serialization data
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        protected NotFoundException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            ResourceName = info.GetString(nameof(ResourceName));
            ResourceId = info.GetValue(nameof(ResourceId), typeof(object));
        }

        /// <summary>
        /// Sets the object data for serialization
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(nameof(ResourceName), ResourceName);
            info.AddValue(nameof(ResourceId), ResourceId);
        }
    }

    /// <summary>
    /// Exception thrown when validation errors occur
    /// </summary>
    [Serializable]
    public class ValidationException : BusinessLogicException
    {
        /// <summary>
        /// Gets the collection of validation errors
        /// </summary>
        public IReadOnlyList<ValidationError> ValidationErrors { get; }

        /// <summary>
        /// Initializes a new instance of the ValidationException class with a single validation error
        /// </summary>
        /// <param name="field">The field that failed validation</param>
        /// <param name="message">The validation error message</param>
        public ValidationException(string field, string message)
            : base(ErrorCode.ValidationError, $"Validation failed for field '{field}': {message}")
        {
            ValidationErrors = new List<ValidationError> { new ValidationError(field, message) };
            AddContext("ValidationErrors", ValidationErrors);
        }

        /// <summary>
        /// Initializes a new instance of the ValidationException class with multiple validation errors
        /// </summary>
        /// <param name="validationErrors">The collection of validation errors</param>
        public ValidationException(IEnumerable<ValidationError> validationErrors)
            : base(ErrorCode.ValidationError, "One or more validation errors occurred.")
        {
            ValidationErrors = validationErrors?.ToList() ?? new List<ValidationError>();
            AddContext("ValidationErrors", ValidationErrors);
        }

        /// <summary>
        /// Initializes a new instance of the ValidationException class with custom message and validation errors
        /// </summary>
        /// <param name="message">The custom error message</param>
        /// <param name="validationErrors">The collection of validation errors</param>
        public ValidationException(string message, IEnumerable<ValidationError> validationErrors)
            : base(ErrorCode.ValidationError, message)
        {
            ValidationErrors = validationErrors?.ToList() ?? new List<ValidationError>();
            AddContext("ValidationErrors", ValidationErrors);
        }

        /// <summary>
        /// Initializes a new instance of the ValidationException class with serialization data
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        protected ValidationException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            ValidationErrors = (List<ValidationError>)info.GetValue(nameof(ValidationErrors), typeof(List<ValidationError>))
                              ?? new List<ValidationError>();
        }

        /// <summary>
        /// Sets the object data for serialization
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(nameof(ValidationErrors), ValidationErrors);
        }
    }

    /// <summary>
    /// Exception thrown when attempting to create a resource that already exists
    /// </summary>
    [Serializable]
    public class DuplicateResourceException : BusinessLogicException
    {
        /// <summary>
        /// Gets the name of the resource that already exists
        /// </summary>
        public string ResourceName { get; }

        /// <summary>
        /// Gets the identifier of the duplicate resource
        /// </summary>
        public object ResourceId { get; }

        /// <summary>
        /// Gets the field that caused the duplicate conflict
        /// </summary>
        public string ConflictField { get; }

        /// <summary>
        /// Initializes a new instance of the DuplicateResourceException class
        /// </summary>
        /// <param name="resourceName">The name of the resource</param>
        /// <param name="conflictField">The field that caused the conflict</param>
        /// <param name="resourceId">The identifier of the duplicate resource</param>
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

        /// <summary>
        /// Initializes a new instance of the DuplicateResourceException class with serialization data
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        protected DuplicateResourceException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            ResourceName = info.GetString(nameof(ResourceName));
            ResourceId = info.GetValue(nameof(ResourceId), typeof(object));
            ConflictField = info.GetString(nameof(ConflictField));
        }

        /// <summary>
        /// Sets the object data for serialization
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(nameof(ResourceName), ResourceName);
            info.AddValue(nameof(ResourceId), ResourceId);
            info.AddValue(nameof(ConflictField), ConflictField);
        }
    }

    /// <summary>
    /// Exception thrown when a business operation is not authorized
    /// </summary>
    [Serializable]
    public class UnauthorizedBusinessOperationException : BusinessLogicException
    {
        /// <summary>
        /// Gets the operation that was attempted
        /// </summary>
        public string Operation { get; }

        /// <summary>
        /// Gets the resource on which the operation was attempted
        /// </summary>
        public string Resource { get; }

        /// <summary>
        /// Gets the reason why the operation was not authorized
        /// </summary>
        public string Reason { get; }

        /// <summary>
        /// Initializes a new instance of the UnauthorizedBusinessOperationException class
        /// </summary>
        /// <param name="operation">The operation that was attempted</param>
        /// <param name="resource">The resource on which the operation was attempted</param>
        /// <param name="reason">The reason why the operation was not authorized</param>
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

        /// <summary>
        /// Initializes a new instance of the UnauthorizedBusinessOperationException class with serialization data
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        protected UnauthorizedBusinessOperationException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            Operation = info.GetString(nameof(Operation));
            Resource = info.GetString(nameof(Resource));
            Reason = info.GetString(nameof(Reason));
        }

        /// <summary>
        /// Sets the object data for serialization
        /// </summary>
        /// <param name="info">The serialization info</param>
        /// <param name="context">The streaming context</param>
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue(nameof(Operation), Operation);
            info.AddValue(nameof(Resource), Resource);
            info.AddValue(nameof(Reason), Reason);
        }
    }
}
