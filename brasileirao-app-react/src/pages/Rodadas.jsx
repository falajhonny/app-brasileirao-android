import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; 

function Rodadas() {
  const [rodadas, setRodadas] = useState([]);
  const [jogosRodada, setJogosRodada] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/rodadas')
      .then(response => {
        setRodadas(response.data);
        setLoading(false);
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

    axios.get(`http://localhost:8080/api/jogos/${rodada}`)
      .then(response => {
        setJogosRodada(prev => ({ ...prev, [rodada]: response.data || [] }));
      })
      .catch(error => {
        console.error('Erro ao buscar jogos da rodada:', error);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{
      padding: '10px',
      maxWidth: '900px',
      margin: '0 auto',
      paddingBottom: '80px', // Espaço para BottomNav
      maxHeight: 'calc(100vh - 220px', // Limite de altura

    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Rodadas do Campeonato</h2>

      <div style={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        maxHeight: '400px',
        overflowY: 'auto',
        flex: 1,
        marginBottom: '10px',
      }}>
        {rodadas.map((rodada) => (
          <div
            key={rodada.rodada}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              backgroundColor: '#fff',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}
          >
            <h3
              style={{ cursor: 'pointer', color: '#007bff' }}
              onClick={() => buscarJogos(rodada.rodada)}
            >
              Rodada {rodada.rodada} ({rodada.status})
            </h3>

            {/* Exibe os jogos se já tiver buscado */}
            {jogosRodada[rodada.rodada] && jogosRodada[rodada.rodada].length > 0 && (
              <div style={{ marginTop: '10px' }}>
                {/* Jogos Finalizados */}
                <div>
                  <h4 style={{ color: '#28a745' }}>Jogos Finalizados</h4>
                  {jogosRodada[rodada.rodada]
                    .filter(partida => partida.status === 'finalizado')
                    .map(partida => (
                      <div key={partida.partida_id} style={{
                        padding: '8px',
                        borderBottom: '1px solid #eee',
                      }}>
                        <strong>{partida.time_mandante.nome_popular}</strong> {partida.placar_mandante} x {partida.placar_visitante} <strong>{partida.time_visitante.nome_popular}</strong><br />
                        <small>Status: {partida.status}</small>
                      </div>
                    ))
                  }
                </div>

                {/* Próximos Jogos */}
                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ color: '#ffc107' }}>Próximos Jogos</h4>
                  {jogosRodada[rodada.rodada]
                    .filter(partida => partida.status !== 'finalizado')
                    .map(partida => (
                      <div key={partida.partida_id} style={{
                        padding: '8px',
                        borderBottom: '1px solid #eee',
                      }}>
                        <strong>{partida.time_mandante.nome_popular}</strong> vs <strong>{partida.time_visitante.nome_popular}</strong><br />
                        <small>Data: {partida.data_realizacao} {partida.hora_realizacao}</small><br />
                        <small>Status: {partida.status}</small>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rodadas;