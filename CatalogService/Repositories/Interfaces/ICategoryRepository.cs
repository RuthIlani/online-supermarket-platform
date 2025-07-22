using CatalogService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatalogService.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category?> GetWithProductsAsync(int id);
    }
}
