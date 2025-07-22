using CatalogService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatalogService.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    }
}
