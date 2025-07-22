using AutoMapper;
using CatalogService.DTOs;
using CatalogService.Exceptions;
using CatalogService.Models;
using CatalogService.Repositories.Interfaces;
using CatalogService.Services.Interfaces;

namespace CatalogService.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;

        public ProductService(IProductRepository productRepository, IMapper mapper, ILogger<ProductService> logger)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
        public async Task<ProductDto> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                _logger.LogWarning($"Product not found: {id}");
                throw BusinessLogicExceptionExtensions.ProductNotFound(id);
            }
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<IEnumerable<ProductDto>> GetByCategoryAsync(int categoryId)
        {
            var products = await _productRepository.GetByCategoryAsync(categoryId);
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        public async Task<ProductDto> CreateAsync(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _productRepository.AddAsync(product);
            _logger.LogInformation($"Product created: {product.Id}");
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductDto productDto)
        {
            var existingProduct = await _productRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                _logger.LogWarning($"Product not found for update: {id}");
                throw BusinessLogicExceptionExtensions.ProductNotFound(id);
            }

            _mapper.Map(productDto, existingProduct);
            await _productRepository.UpdateAsync(existingProduct);
            _logger.LogInformation($"Product updated: {id}");
            return _mapper.Map<ProductDto>(existingProduct);
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                _logger.LogWarning($"Product not found for deletion: {id}");
                throw BusinessLogicExceptionExtensions.ProductNotFound(id);
            }

            await _productRepository.DeleteAsync(id);
            _logger.LogInformation($"Product deleted: {id}");
        }
    }
}
