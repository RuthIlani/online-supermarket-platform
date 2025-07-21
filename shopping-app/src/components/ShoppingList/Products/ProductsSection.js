import React from 'react';
import ProductCard from './ProductCard';
import CategoriesBar from './CategoriesBar';

const ProductsSection = ({ 
  categories, 
  products, 
  selectedCategory, 
  onCategorySelect, 
  onAddToCart 
}) => {
  // Filter products by selected category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.categoryId === selectedCategory.id)
    : products;

  return (
    <div className="products-section">
      <CategoriesBar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
