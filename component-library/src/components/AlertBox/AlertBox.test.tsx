import { render, screen, fireEvent } from '@testing-library/react';
import { AlertBox } from './AlertBox';
import { describe, it, expect, vi } from 'vitest';

describe('AlertBox Component', () => {
  it('renders with success type', () => {
    render(<AlertBox type="success" message="Success message" />);
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders with error type', () => {
    render(<AlertBox type="error" message="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders with warning type', () => {
    render(<AlertBox type="warning" message="Warning message" />);
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('renders with info type', () => {
    render(<AlertBox type="info" message="Info message" />);
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('renders close button when onClose callback is provided', () => {
    render(<AlertBox type="success" message="Test" onClose={() => {}} />);
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    render(<AlertBox type="success" message="Test" />);
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('calls onClose callback when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<AlertBox type="success" message="Test" onClose={handleClose} />);
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders children content', () => {
    render(
      <AlertBox type="success" message="Test">
        <p>Child content</p>
      </AlertBox>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders with all props', () => {
    const handleClose = vi.fn();
    render(
      <AlertBox
        type="warning"
        message="Warning message"
        onClose={handleClose}
      >
        <span>Additional info</span>
      </AlertBox>
    );
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Additional info')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
  });
});
