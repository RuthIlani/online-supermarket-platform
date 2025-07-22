using System;

namespace CatalogService.Exceptions
{
    /// <summary>
    /// Represents a validation error for a specific field or property
    /// </summary>
    [Serializable]
    public class ValidationError
    {
        /// <summary>
        /// Gets or sets the name of the field that failed validation
        /// </summary>
        public string Field { get; set; }

        /// <summary>
        /// Gets or sets the validation error message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets the attempted value that failed validation
        /// </summary>
        public object AttemptedValue { get; set; }

        /// <summary>
        /// Gets or sets the validation error code
        /// </summary>
        public string ErrorCode { get; set; }

        /// <summary>
        /// Initializes a new instance of the ValidationError class
        /// </summary>
        public ValidationError() { }

        /// <summary>
        /// Initializes a new instance of the ValidationError class with field and message
        /// </summary>
        /// <param name="field">The field name</param>
        /// <param name="message">The error message</param>
        public ValidationError(string field, string message)
        {
            Field = field;
            Message = message;
        }

        /// <summary>
        /// Initializes a new instance of the ValidationError class with all properties
        /// </summary>
        /// <param name="field">The field name</param>
        /// <param name="message">The error message</param>
        /// <param name="attemptedValue">The attempted value</param>
        /// <param name="errorCode">The error code</param>
        public ValidationError(string field, string message, object attemptedValue, string errorCode = null)
        {
            Field = field;
            Message = message;
            AttemptedValue = attemptedValue;
            ErrorCode = errorCode;
        }
    }
}
