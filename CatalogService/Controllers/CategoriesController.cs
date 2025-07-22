using CatalogService.DTOs;
using CatalogService.Exceptions;
using CatalogService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static CatalogService.Exceptions.ProblemDetailsFactory;

namespace CatalogService.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            try
            {
                var category = await _categoryService.GetByIdAsync(id);
                return Ok(category);
            }            
            catch (BusinessLogicException ex)
            {
                _logger.LogWarning(ex, "Error getting category {CategoryId}: {Message}", id, ex.Message);
                var problemDetails = CreateProblemDetails(ex, HttpContext);
                return StatusCode(problemDetails.Status.Value, problemDetails);
            }
        }

        [HttpGet("{id}/products")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByCategory(int id)
        {
            try
            {
                var category = await _categoryService.GetWithProductsAsync(id);
                if (category?.Products == null)
                    return Ok(new List<ProductDto>());
                return Ok(category.Products);
            }            
            catch (BusinessLogicException ex)
            {
                _logger.LogWarning(ex, "Error getting products for category {CategoryId}: {Message}", id, ex.Message);
                var problemDetails = CreateProblemDetails(ex, HttpContext);
                return StatusCode(problemDetails.Status.Value, problemDetails);
            }
        }
    }
}
