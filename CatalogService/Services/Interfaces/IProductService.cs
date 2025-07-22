using CatalogService.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatalogService.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<ProductDto> GetByIdAsync(int id);
        Task<ProductDto> CreateAsync(ProductDto productDto);
        Task<ProductDto> UpdateAsync(int id, ProductDto productDto);
        Task DeleteAsync(int id);
    }
}
