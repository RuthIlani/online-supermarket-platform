using CatalogService.Services.Interfaces;
using CatalogService.DTOs;
using CatalogService.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static CatalogService.Exceptions.ProblemDetailsFactory;

namespace CatalogService.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService productService, ILogger<ProductsController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            try
            {
                var product = await _productService.GetByIdAsync(id);
                return Ok(product);
            }            catch (BusinessLogicException ex)
            {
                _logger.LogWarning(ex, "Error getting product {ProductId}: {Message}", id, ex.Message);
                var problemDetails = CreateProblemDetails(ex, HttpContext);
                return StatusCode(problemDetails.Status.Value, problemDetails);
            }
        }
    }
}
