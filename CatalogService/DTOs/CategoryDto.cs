using System.Collections.Generic;

namespace CatalogService.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
