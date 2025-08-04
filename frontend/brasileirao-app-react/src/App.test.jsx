import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./pages/Home', () => ({
  default: () => <div>Home Page</div>
}));

vi.mock('./pages/Artilheiros', () => ({
  default: () => <div>Artilheiros Page</div>
}));

vi.mock('./pages/Rodadas', () => ({
  default: () => <div>Rodadas Page</div>
}));

vi.mock('./pages/Classificacao', () => ({
  default: () => <div>Classificacao Page</div>
}));

vi.mock('./pages/MeuTime', () => ({
  default: () => <div>MeuTime Page</div>
}));

const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('App', () => {
  it('renders header with logo and title', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByAltText('Logo Série B')).toBeInTheDocument();
    expect(screen.getByText('Brasileirão Série B')).toBeInTheDocument();
  });

  it('renders Home page by default', () => {
    renderWithRouter(<App />);
    
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Artilheiros page when route is /artilheiros', () => {
    renderWithRouter(<App />, ['/artilheiros']);
    
    expect(screen.getByText('Artilheiros Page')).toBeInTheDocument();
  });

  it('renders Rodadas page when route is /rodadas', () => {
    renderWithRouter(<App />, ['/rodadas']);
    
    expect(screen.getByText('Rodadas Page')).toBeInTheDocument();
  });

  it('renders Classificacao page when route is /classificacao', () => {
    renderWithRouter(<App />, ['/classificacao']);
    
    expect(screen.getByText('Classificacao Page')).toBeInTheDocument();
  });

  it('renders MeuTime page when route is /meu-time', () => {
    renderWithRouter(<App />, ['/meu-time']);
    
    expect(screen.getByText('MeuTime Page')).toBeInTheDocument();
  });

  it('has correct header styling', () => {
    const { container } = renderWithRouter(<App />);
    
    const header = container.querySelector('header');
    expect(header).toHaveStyle({
      textAlign: 'center',
      marginBottom: '20px'
    });
  });

  it('has correct logo styling', () => {
    const { container } = renderWithRouter(<App />);
    
    const logo = container.querySelector('img');
    expect(logo).toHaveStyle({
      width: '70px',
      marginTop: '5px'
    });
  });

  it('has correct title styling', () => {
    const { container } = renderWithRouter(<App />);
    
    const title = container.querySelector('h1');
    expect(title).toHaveStyle({
      margin: '1px',
      fontSize: '24px'
    });
  });

  it('has bottom padding for navigation', () => {
    const { container } = renderWithRouter(<App />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveStyle({
      paddingBottom: '80px',
      height: '100%'
    });
  });

  it('renders BottomNav component', () => {
    renderWithRouter(<App />);
    
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});