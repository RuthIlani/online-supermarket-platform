import React from 'react';

const CategoriesBar = ({ categories, selectedCategory, onCategorySelect }) => {
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    if (categoryId === 'all') {
      onCategorySelect(null);
    } else {
      const category = categories.find(cat => cat.id.toString() === categoryId);
      onCategorySelect(category);
    }
  };

  return (
    <div className="categories-bar">
      <label htmlFor="category-select" className="category-label">
        בחר קטגוריה:
      </label>
      <select 
        id="category-select"
        className="category-select"
        value={selectedCategory ? selectedCategory.id.toString() : 'all'}
        onChange={handleCategoryChange}
      >
        <option value="all">כל המוצרים</option>
        {categories.map(category => (
          <option key={category.id} value={category.id.toString()}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesBar;
