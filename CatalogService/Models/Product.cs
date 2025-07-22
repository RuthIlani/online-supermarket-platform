using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CatalogService.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }

        [Required]
        public required int CategoryId { get; set; }
        [Required]
        public Category? Category { get; set; }
    }
}