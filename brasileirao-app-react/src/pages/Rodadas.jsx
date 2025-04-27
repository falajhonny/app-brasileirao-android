import { useEffect, useState } from 'react';
import axios from 'axios';

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
    return <div className="loading-spinner"></div>;
  }

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Rodadas do Campeonato</h2>
      {rodadas.map((rodada) => (
        <div
          key={rodada.rodada}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            marginBottom: '15px'
          }}
        >
          <h3
            style={{ cursor: 'pointer', color: '#007bff' }}
            onClick={() => buscarJogos(rodada.rodada)}
          >
            Rodada {rodada.rodada} ({rodada.status})
          </h3>

          {/* Exibe os jogos se já tiver buscado */}
          {jogosRodada[rodada.rodada] && (
            <div style={{ marginTop: '10px' }}>
              {jogosRodada[rodada.rodada].map((partida) => (
                <div key={partida.partida_id} style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                }}>
                  <strong>{partida.time_mandante.nome_popular}</strong> {partida.placar_mandante} x {partida.placar_visitante} <strong>{partida.time_visitante.nome_popular}</strong> <br />
                  <small>Status: {partida.status}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Rodadas;