import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDisplay } from './ProductDisplay';
import type { Product } from '../../types';
import { describe, it, expect, vi } from 'vitest';

describe('ProductDisplay Component', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    imageUrl: 'https://example.com/headphones.jpg',
    inStock: true
  };

  it('renders product name and price', () => {
    render(<ProductDisplay product={mockProduct} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
  });

  it('renders description when showDescription is true', () => {
    render(<ProductDisplay product={mockProduct} showDescription={true} />);
    expect(screen.getByText('High-quality wireless headphones with noise cancellation.')).toBeInTheDocument();
  });

  it('does not render description when showDescription is false', () => {
    render(<ProductDisplay product={mockProduct} showDescription={false} />);
    expect(screen.queryByText('High-quality wireless headphones with noise cancellation.')).not.toBeInTheDocument();
  });

  it('renders stock status when showStockStatus is true and product is in stock', () => {
    render(<ProductDisplay product={mockProduct} showStockStatus={true} />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('renders out of stock status when showStockStatus is true and product is out of stock', () => {
    const outOfStockProduct: Product = { ...mockProduct, inStock: false };
    render(<ProductDisplay product={outOfStockProduct} showStockStatus={true} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('does not render stock status when showStockStatus is false', () => {
    render(<ProductDisplay product={mockProduct} showStockStatus={false} />);
    expect(screen.queryByText('In Stock')).not.toBeInTheDocument();
  });

  it('renders product image when imageUrl is provided', () => {
    render(<ProductDisplay product={mockProduct} />);
    const image = screen.getByAltText('Wireless Headphones') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/headphones.jpg');
  });

  it('does not render image when imageUrl is not provided', () => {
    const productWithoutImage: Product = { ...mockProduct, imageUrl: undefined };
    render(<ProductDisplay product={productWithoutImage} />);
    expect(screen.queryByAltText('Wireless Headphones')).not.toBeInTheDocument();
  });

  it('renders "Add to Cart" button when onAddToCart is provided', () => {
    render(<ProductDisplay product={mockProduct} onAddToCart={() => {}} />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('does not render "Add to Cart" button when onAddToCart is not provided', () => {
    render(<ProductDisplay product={mockProduct} />);
    expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument();
  });

  it('calls onAddToCart with product id when button is clicked', () => {
    const handleAddToCart = vi.fn();
    render(<ProductDisplay product={mockProduct} onAddToCart={handleAddToCart} />);
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);
    expect(handleAddToCart).toHaveBeenCalledWith('1');
  });

  it('renders children content', () => {
    render(
      <ProductDisplay product={mockProduct}>
        <div>Free shipping available</div>
      </ProductDisplay>
    );
    expect(screen.getByText('Free shipping available')).toBeInTheDocument();
  });

  it('renders with all props combined', () => {
    const handleAddToCart = vi.fn();
    render(
      <ProductDisplay
        product={mockProduct}
        showDescription={true}
        showStockStatus={true}
        onAddToCart={handleAddToCart}
      >
        <span>Special offer</span>
      </ProductDisplay>
    );
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('High-quality wireless headphones with noise cancellation.')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByText('Special offer')).toBeInTheDocument();
  });
});
