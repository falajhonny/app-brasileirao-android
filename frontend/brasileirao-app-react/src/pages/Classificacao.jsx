import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ContentContainer from '../components/ContentContainer'; 

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
    if (posicao <= 4) return { 
      backgroundColor: '#d4edda', 
      borderLeft: '4px solid #28a745',
    };
    if (posicao >= 17) return { 
      backgroundColor: '#f8d7da',
      borderLeft: '4px solid #dc3545',
    };
    if (posicao >= 5 && posicao <= 8) return {
      backgroundColor: '#fff3cd',
      borderLeft: '4px solid #ffc107',
    };
    return { borderLeft: '4px solid transparent' };
  };

  return (
    <ContentContainer 
      title="Classificação - Série B"
    >
      <div style={{ 
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: 'clamp(11px, 2.2vw, 15px)', // Responsivo
          minWidth: 'clamp(400px, 90vw, 700px)' // Largura mínima responsiva
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#007bff', 
              color: 'white',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>Pos</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'left', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>Time</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>Pts</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>V</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>E</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>D</th>
              <th style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(6px, 1vw, 10px)', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: '600' }}>SG</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((time, index) => (
              <tr 
                key={index} 
                style={{
                  ...getRowStyle(time.posicao),
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td style={{ 
                  padding: '12px 8px', 
                  textAlign: 'center', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {time.posicao}
                </td>
                <td style={{ 
                  padding: '12px 8px', 
                  textAlign: 'left',
                  fontWeight: '500',
                  fontSize: '13px'
                }}>
                  {time.time.nome_popular}
                </td>
                <td style={{ 
                  padding: '12px 8px', 
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#007bff'
                }}>
                  {time.pontos}
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'center', fontSize: '13px' }}>
                  {time.vitorias}
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'center', fontSize: '13px' }}>
                  {time.empates}
                </td>
                <td style={{ padding: '12px 8px', textAlign: 'center', fontSize: '13px' }}>
                  {time.derrotas}
                </td>
                <td style={{ 
                  padding: '12px 8px', 
                  textAlign: 'center', 
                  fontSize: '13px',
                  fontWeight: '500',
                  color: time.saldo_gols >= 0 ? '#28a745' : '#dc3545'
                }}>
                  {time.saldo_gols > 0 ? '+' : ''}{time.saldo_gols}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legenda */}
      <div style={{ 
        marginTop: '15px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px',
        fontSize: '11px',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '2px' }}></div>
          <span>Série A</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#ffc107', borderRadius: '2px' }}></div>
          <span>Pré-Libertadores</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#dc3545', borderRadius: '2px' }}></div>
          <span>Série C</span>
        </div>
      </div>
    </ContentContainer>
  );
}

export default Classificacao;