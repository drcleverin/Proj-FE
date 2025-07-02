 
import React from 'react';
 
interface BlogCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}
 
const BlogCategories: React.FC<BlogCategoriesProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 shadow-sm'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
 
export default BlogCategories;
 