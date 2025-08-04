import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    const { container } = render(<LoadingSpinner />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('has correct stroke color', () => {
    const { container } = render(<LoadingSpinner />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', '#007bff');
  });

  it('has rotation animation', () => {
    const { container } = render(<LoadingSpinner />);
    
    const animateTransform = container.querySelector('animateTransform');
    expect(animateTransform).toBeInTheDocument();
    expect(animateTransform).toHaveAttribute('attributeName', 'transform');
    expect(animateTransform).toHaveAttribute('type', 'rotate');
    expect(animateTransform).toHaveAttribute('repeatCount', 'indefinite');
  });

  it('is centered', () => {
    const { container } = render(<LoadingSpinner />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({
      textAlign: 'center',
      marginTop: '30px'
    });
  });
});