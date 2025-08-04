import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ContentContainer from '../components/ContentContainer'; 


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
    <ContentContainer 
      title="Artilheiros - Série B"
    >
      <div style={{ 
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: 'clamp(300px, 80vw, 500px)', // Responsivo
          fontSize: 'clamp(12px, 2.5vw, 16px)' // Texto responsivo
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#007bff', 
              color: 'white',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <th style={{ 
                padding: 'clamp(10px, 2vw, 15px) clamp(8px, 1.5vw, 12px)', 
                textAlign: 'left', 
                fontSize: 'clamp(11px, 2.2vw, 14px)', 
                fontWeight: '600',
                borderRight: '1px solid rgba(255,255,255,0.2)'
              }}>
                Jogador
              </th>
              <th style={{ 
                padding: 'clamp(10px, 2vw, 15px) clamp(8px, 1.5vw, 12px)', 
                textAlign: 'center', 
                fontSize: 'clamp(11px, 2.2vw, 14px)', 
                fontWeight: '600',
                borderRight: '1px solid rgba(255,255,255,0.2)'
              }}>
                Time
              </th>
              <th style={{ 
                padding: 'clamp(10px, 2vw, 15px) clamp(8px, 1.5vw, 12px)', 
                textAlign: 'center', 
                fontSize: 'clamp(11px, 2.2vw, 14px)', 
                fontWeight: '600'
              }}>
                ⚽ Gols
              </th>
            </tr>
          </thead>
          <tbody>
            {artilheiros.map((artilheiro, index) => (
              <motion.tr 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: '#e3f2fd',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? 'rgba(248,249,250,0.8)' : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <td style={{ 
                  padding: '15px 12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.05 + 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      style={{
                        width: '28px',
                        height: '28px',
                        background: index < 3 
                          ? 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'
                          : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '700',
                        boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                    >
                      {artilheiro.atleta?.nome_popular || 'N/A'}
                    </motion.span>
                  </div>
                </td>
                <td style={{ 
                  padding: '15px 12px', 
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#666'
                }}>
                  {artilheiro.time?.nome_popular || 'N/A'}
                </td>
                <td style={{ 
                  padding: '15px 12px', 
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#007bff'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '32px',
                    height: '32px',
                    backgroundColor: index < 3 ? '#ffc107' : '#e9ecef',
                    borderRadius: '50%',
                    color: index < 3 ? 'white' : '#007bff',
                    fontWeight: '700'
                  }}>
                    {artilheiro.gols || 0}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Estatísticas resumidas */}
      {artilheiros.length > 0 && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px',
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#007bff' }}>
                {Math.max(...artilheiros.map(a => a.gols || 0))}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Maior pontuação</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#007bff' }}>
                {artilheiros.length}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Total de jogadores</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#007bff' }}>
                {Math.round(artilheiros.reduce((acc, a) => acc + (a.gols || 0), 0) / artilheiros.length) || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Média de gols</div>
            </div>
          </div>
        </div>
      )}
    </ContentContainer>
  );
}

export default Artilheiros;