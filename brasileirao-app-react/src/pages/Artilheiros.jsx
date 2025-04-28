import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; 


function Artilheiros() {
  const [artilheiros, setArtilheiros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/artilheiros')
      .then(response => {
        setArtilheiros(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar artilheiros:', error);
        setLoading(false);
      });
  }, []);

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
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Artilheiros do Campeonato</h2>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        maxHeight: 'calc(100vh - 220px)',
        overflowY: 'auto',
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