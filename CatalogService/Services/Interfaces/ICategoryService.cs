using CatalogService.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatalogService.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto> GetByIdAsync(int id);
        Task<CategoryDto> GetWithProductsAsync(int id);
    }
}
