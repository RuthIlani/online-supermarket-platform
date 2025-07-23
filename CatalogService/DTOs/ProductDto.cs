namespace CatalogService.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = String.Empty;
        public decimal Price { get; set; }
        public string Unit { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
    }
}
