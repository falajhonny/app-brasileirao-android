import { useState, useEffect } from 'react';
import axios from 'axios';

function MeuTime() {
  const [rodadas, setRodadas] = useState([]);
  const [meuTime, setMeuTime] = useState('');
  const [jogosDoMeuTime, setJogosDoMeuTime] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/rodadas')
      .then(response => {
        setRodadas(response.data.rodadas);
      })
      .catch(error => {
        console.error('Erro ao buscar rodadas:', error);
      });
  }, []);

  function filtrarJogos() {
    setLoading(true);
    const jogos = [];

    rodadas.forEach(rodada => {
      rodada.partidas.forEach(partida => {
        if (
          partida.time_mandante.nome_popular.toLowerCase().includes(meuTime.toLowerCase()) ||
          partida.time_visitante.nome_popular.toLowerCase().includes(meuTime.toLowerCase())
        ) {
          jogos.push({
            rodada: rodada.rodada,
            mandante: partida.time_mandante.nome_popular,
            visitante: partida.time_visitante.nome_popular,
            data: partida.data_realizacao,
            horario: partida.hora_realizacao,
            status: partida.status,
          });
        }
      });
    });

    setJogosDoMeuTime(jogos);
    setLoading(false);
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Meu Time - Série B</h2>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        maxHeight: 'calc(100vh - 220px)',
        overflowY: 'auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Digite o nome do seu time"
            value={meuTime}
            onChange={(e) => setMeuTime(e.target.value)}
            style={{ 
              width: '80%', 
              maxWidth: '300px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          />
          <br />
          <button 
            onClick={filtrarJogos} 
            style={{ 
              marginTop: '10px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Buscar Jogos
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Buscando jogos...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {jogosDoMeuTime.length > 0 ? (
              jogosDoMeuTime.map((jogo, index) => (
                <div key={index} style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Rodada {jogo.rodada}</h4>
                  <strong>{jogo.mandante}</strong> x <strong>{jogo.visitante}</strong><br />
                  <small>Data: {new Date(jogo.data).toLocaleDateString('pt-BR')} - {jogo.horario}</small><br />
                  <small>Status: {jogo.status.toUpperCase()}</small>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>Nenhum jogo encontrado para esse time.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MeuTime;