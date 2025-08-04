import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BottomNav from './BottomNav';

const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('BottomNav', () => {
  it('renders all navigation items', () => {
    renderWithRouter(<BottomNav />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/rodadas');
    expect(links[2]).toHaveAttribute('href', '/classificacao');
    expect(links[3]).toHaveAttribute('href', '/artilheiros');
    expect(links[4]).toHaveAttribute('href', '/meu-time');
  });

  it('has correct navigation links', () => {
    renderWithRouter(<BottomNav />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/rodadas');
    expect(links[2]).toHaveAttribute('href', '/classificacao');
    expect(links[3]).toHaveAttribute('href', '/artilheiros');
    expect(links[4]).toHaveAttribute('href', '/meu-time');
  });

  it('applies active class to current route', () => {
    renderWithRouter(<BottomNav />, ['/classificacao']);
    
    const links = screen.getAllByRole('link');
    const classificacaoLink = links.find(link => link.getAttribute('href') === '/classificacao');
    expect(classificacaoLink).toHaveClass('active');
  });

  it('does not apply active class to non-current routes', () => {
    renderWithRouter(<BottomNav />, ['/classificacao']);
    
    const links = screen.getAllByRole('link');
    const homeLink = links.find(link => link.getAttribute('href') === '/');
    const rodadasLink = links.find(link => link.getAttribute('href') === '/rodadas');
    
    expect(homeLink).not.toHaveClass('active');
    expect(rodadasLink).not.toHaveClass('active');
  });

  it('has fixed positioning style', () => {
    const { container } = renderWithRouter(<BottomNav />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveStyle({
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      right: '10px',
      zIndex: '9999'
    });
  });

  it('has proper styling', () => {
    const { container } = renderWithRouter(<BottomNav />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveStyle({
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    });
  });
});