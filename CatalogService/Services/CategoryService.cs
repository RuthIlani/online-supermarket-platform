using AutoMapper;
using CatalogService.DTOs;
using CatalogService.Exceptions;
using CatalogService.Models;
using CatalogService.Repositories.Interfaces;
using CatalogService.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace CatalogService.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryService> _logger;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, ILogger<CategoryService> logger)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }        
        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                _logger.LogWarning($"Category not found: {id}");
                throw BusinessLogicExceptionExtensions.CategoryNotFound(id);
            }
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> GetWithProductsAsync(int id)
        {
            var category = await _categoryRepository.GetWithProductsAsync(id);
            if (category == null)
            {
                _logger.LogWarning($"Category with products not found: {id}");
                throw BusinessLogicExceptionExtensions.CategoryNotFound(id);
            }
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
