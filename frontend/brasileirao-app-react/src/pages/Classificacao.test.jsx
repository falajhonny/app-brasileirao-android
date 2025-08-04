import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import Classificacao from './Classificacao';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

const mockClassificacaoData = [
  {
    posicao: 1,
    time: { nome_popular: 'Santos' },
    pontos: 65,
    vitorias: 20,
    empates: 5,
    derrotas: 3,
    saldo_gols: 25
  },
  {
    posicao: 2,
    time: { nome_popular: 'Ceará' },
    pontos: 62,
    vitorias: 19,
    empates: 5,
    derrotas: 4,
    saldo_gols: 18
  },
  {
    posicao: 17,
    time: { nome_popular: 'Rebaixado FC' },
    pontos: 30,
    vitorias: 8,
    empates: 6,
    derrotas: 14,
    saldo_gols: -15
  }
];

describe('Classificacao', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading spinner initially', () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {}));
    
    const { container } = render(<Classificacao />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders classification table after successful API call', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    render(<Classificacao />);

    await waitFor(() => {
      expect(screen.getByText('Classificação - Série B')).toBeInTheDocument();
    });

    expect(screen.getByText('Santos')).toBeInTheDocument();
    expect(screen.getByText('Ceará')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument();
    expect(screen.getByText('62')).toBeInTheDocument();
  });

  it('makes API call to correct endpoint', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    render(<Classificacao />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/classificacao');
    });
  });

  it('handles API error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Classificacao />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar classificação:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('applies correct styling for top 4 teams (G4)', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    const { container } = render(<Classificacao />);

    await waitFor(() => {
      expect(screen.getByText('Santos')).toBeInTheDocument();
    });

    const santosRow = screen.getByText('Santos').closest('tr');
    expect(santosRow).toHaveStyle({
      backgroundColor: '#d4edda'
    });
  });

  it('applies correct styling for relegation zone teams', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    const { container } = render(<Classificacao />);

    await waitFor(() => {
      expect(screen.getByText('Rebaixado FC')).toBeInTheDocument();
    });

    const rebaixadoRow = screen.getByText('Rebaixado FC').closest('tr');
    expect(rebaixadoRow).toHaveStyle({
      backgroundColor: '#f8d7da'
    });
  });

  it('renders all table headers', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    render(<Classificacao />);

    await waitFor(() => {
      expect(screen.getByText('Posição')).toBeInTheDocument();
      expect(screen.getByText('Time')).toBeInTheDocument();
      expect(screen.getByText('Pts')).toBeInTheDocument();
      expect(screen.getByText('Vitórias')).toBeInTheDocument();
      expect(screen.getByText('Empates')).toBeInTheDocument();
      expect(screen.getByText('Derrotas')).toBeInTheDocument();
      expect(screen.getByText('Saldo')).toBeInTheDocument();
    });
  });

  it('renders all team data correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: mockClassificacaoData
    });

    render(<Classificacao />);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('17')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('-15')).toBeInTheDocument();
    });
  });
});