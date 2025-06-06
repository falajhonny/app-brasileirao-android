import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; 

function Classificacao() {
  const [classificacao, setClassificacao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/classificacao')
      .then(response => {
        setClassificacao(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar classificação:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const getRowStyle = (posicao) => {
    if (posicao <= 4) return { backgroundColor: '#d4edda' };
    if (posicao >= 17) return { backgroundColor: '#f8d7da' };
    return {};
  };

  return (
    <div style={{
      padding: '10px',
      maxWidth: '900px',
      margin: '0 auto',
      paddingBottom: '80px',
      minHeight: '100vh',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Classificação - Série B</h2>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        height: 'calc(80vh - 180px)',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0d2e0345', color: 'white' }}>
              <th>Posição</th>
              <th>Time</th>
              <th>Pts</th>
              <th>Vitórias</th>
              <th>Empates</th>
              <th>Derrotas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((time, index) => (
              <tr key={index} style={getRowStyle(time.posicao)}>
                <td>{time.posicao}</td>
                <td>{time.time.nome_popular}</td>
                <td><strong>{time.pontos}</strong></td>
                <td>{time.vitorias}</td>
                <td>{time.empates}</td>
                <td>{time.derrotas}</td>
                <td>{time.saldo_gols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Classificacao;