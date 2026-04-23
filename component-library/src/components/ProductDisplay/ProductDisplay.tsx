import React from 'react';
import type { ProductDisplayProps } from '../../types';

/**
 * ProductDisplay Component
 * 
 * A reusable component for displaying product information.
 * 
 * @param product - The product object containing id, name, price, description, imageUrl, and inStock
 * @param showDescription - Whether to display the product description (optional)
 * @param showStockStatus - Whether to display the stock status (optional)
 * @param onAddToCart - Callback function when "Add to Cart" button is clicked (optional)
 * @param children - Additional content to render within the component (optional)
 */
export const ProductDisplay: React.FC<ProductDisplayProps> = ({
  product,
  showDescription,
  showStockStatus,
  onAddToCart,
  children
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          {showDescription && <p className="text-gray-500">{product.description}</p>}
          {showStockStatus && (
            <p className={`text-sm font-semibold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          )}
          {children}
        </div>
      </div>
      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product.id)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};