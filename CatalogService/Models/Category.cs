using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CatalogService.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
