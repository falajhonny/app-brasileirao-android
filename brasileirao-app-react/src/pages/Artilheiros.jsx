import { useEffect, useState } from 'react';
import axios from 'axios';

function Artilheiros() {
  const [artilheiros, setArtilheiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/artilheiros')
      .then(response => {
        setArtilheiros(response.data || []); // ajuste seguro
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar artilheiros:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Artilheiros do Campeonato</h2>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Jogador</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Time</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Gols</th>
            </tr>
          </thead>
          <tbody>
            {artilheiros.map((artilheiro, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px' }}>{artilheiro.atleta?.nome_popular || 'N/A'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{artilheiro.time?.nome_popular || 'N/A'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{artilheiro.gols || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Artilheiros;