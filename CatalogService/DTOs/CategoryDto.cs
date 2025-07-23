using System.Collections.Generic;

namespace CatalogService.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = String.Empty;
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }
}
