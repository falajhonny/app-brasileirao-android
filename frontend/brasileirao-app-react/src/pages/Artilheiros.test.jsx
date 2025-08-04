import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import Artilheiros from './Artilheiros';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

const mockArtilheirosData = [
  {
    atleta: { nome_popular: 'Yuri Alberto' },
    time: { nome_popular: 'Santos' },
    gols: 15
  },
  {
    atleta: { nome_popular: 'Cano' },
    time: { nome_popular: 'Ceará' },
    gols: 12
  },
  {
    atleta: { nome_popular: 'Pedro' },
    time: { nome_popular: 'Vila Nova' },
    gols: 10
  }
];

describe('Artilheiros', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading spinner initially', () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {}));
    
    const { container } = render(<Artilheiros />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders artilheiros table after successful API call', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockArtilheirosData
    });

    render(<Artilheiros />);

    await waitFor(() => {
      expect(screen.getByText('Artilheiros - Série B')).toBeInTheDocument();
    });

    expect(screen.getByText('Yuri Alberto')).toBeInTheDocument();
    expect(screen.getByText('Cano')).toBeInTheDocument();
    expect(screen.getByText('Pedro')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('makes API call to correct endpoint', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockArtilheirosData
    });

    render(<Artilheiros />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/artilheiros');
    });
  });

  it('handles API error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Artilheiros />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar artilheiros:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('handles null/undefined data gracefully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: null
    });

    render(<Artilheiros />);

    await waitFor(() => {
      expect(screen.getByText('Artilheiros - Série B')).toBeInTheDocument();
    });
  });

  it('renders N/A for missing player data', async () => {
    const incompleteData = [
      {
        atleta: null,
        time: null,
        gols: null
      }
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: incompleteData
    });

    render(<Artilheiros />);

    await waitFor(() => {
      expect(screen.getAllByText('N/A')).toHaveLength(2);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  it('renders all table headers', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockArtilheirosData
    });

    render(<Artilheiros />);

    await waitFor(() => {
      expect(screen.getByText('Jogador')).toBeInTheDocument();
      expect(screen.getByText('Time')).toBeInTheDocument();
      expect(screen.getByText('Gols')).toBeInTheDocument();
    });
  });

  it('has correct table structure', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockArtilheirosData
    });

    const { container } = render(<Artilheiros />);

    await waitFor(() => {
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      
      const thead = container.querySelector('thead');
      const tbody = container.querySelector('tbody');
      expect(thead).toBeInTheDocument();
      expect(tbody).toBeInTheDocument();
      
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(3);
    });
  });

  it('has proper styling classes', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockArtilheirosData
    });

    const { container } = render(<Artilheiros />);

    await waitFor(() => {
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveStyle({
        maxWidth: '900px',
        margin: '0px auto'
      });
    });
  });
});