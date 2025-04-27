import { useEffect, useState } from 'react';
import axios from 'axios';

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
    return <div className="loading-spinner"></div>;
  }

  const getRowStyle = (posicao) => {
    if (posicao <= 4) {
      return { backgroundColor: '#d4edda' }; // Verde para o G4
    } else if (posicao >= 17) {
      return { backgroundColor: '#f8d7da' }; // Vermelho para o Z4
    } else {
      return {};
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Classificação - Série B</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
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
  );
}

export default Classificacao;