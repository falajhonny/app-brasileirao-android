import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; 

function Rodadas() {
  const [rodadas, setRodadas] = useState([]);
  const [jogosRodada, setJogosRodada] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentRodada, setCurrentRodada] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8080/api/rodadas')
      .then(response => {
        console.log('Dados das rodadas:', response.data);
        setRodadas(response.data);
        setLoading(false);
        // Busca os jogos da rodada atual ao carregar a página
        buscarJogos(1);
      })
      .catch(error => {
        console.error('Erro ao buscar rodadas:', error);
        setLoading(false);
      });
  }, []);

  const buscarJogos = (rodada) => {
    if (jogosRodada[rodada]) {
      return; // já buscou antes
    }

    console.log('Buscando jogos da rodada:', rodada);
    axios.get(`http://localhost:8080/api/jogos/${rodada}`)
      .then(response => {
        console.log('Resposta da API:', response.data);
        // Processa a estrutura de dados da API
        const partidas = response.data?.partidas?.partidas?.['primeira-fase'];
        console.log('Partidas extraídas:', partidas);
        
        if (partidas) {
          const jogos = Object.values(partidas).map(chave => chave.ida);
          console.log('Jogos processados:', jogos);
          setJogosRodada(prev => ({ ...prev, [rodada]: jogos }));
        } else {
          console.log('Nenhuma partida encontrada na estrutura');
          setJogosRodada(prev => ({ ...prev, [rodada]: [] }));
        }
      })
      .catch(error => {
        console.error('Erro ao buscar jogos da rodada:', error);
        setJogosRodada(prev => ({ ...prev, [rodada]: [] }));
      });
  };

  const handlePrevRodada = () => {
    if (currentRodada > 1) {
      setCurrentRodada(currentRodada - 1);
      buscarJogos(currentRodada - 1);
    }
  };

  const handleNextRodada = () => {
    if (currentRodada < rodadas.length) {
      setCurrentRodada(currentRodada + 1);
      buscarJogos(currentRodada + 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{
      padding: '10px',
      maxWidth: '900px',
      margin: '0 auto',
      paddingBottom: '80px',
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Rodadas - Série B</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={handlePrevRodada} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Rodada Anterior</button>
        <button onClick={handleNextRodada} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Próxima Rodada</button>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        maxHeight: 'calc(100vh - 83px)',
        overflowY: 'auto',
      }}>
        {jogosRodada[currentRodada] && jogosRodada[currentRodada].length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Mandante</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Data/Hora</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Visitante</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {jogosRodada[currentRodada].map(partida => (
                <tr key={partida.partida_id}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{partida.time_mandante.nome_popular}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{partida.data_realizacao} - {partida.hora_realizacao}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{partida.time_visitante.nome_popular}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{partida.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum jogo encontrado para esta rodada.</p>
        )}
      </div>
    </div>
  );
}

export default Rodadas;