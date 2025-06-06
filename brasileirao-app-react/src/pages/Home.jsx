import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      height: 'calc(100dvh - 70px)', // altura total da tela - BottomNav
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Bem-vindo ao Brasileirão Série B</h2>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '15px',
        width: '100%',
        maxWidth: '300px',
      }}>
        <Link to="/artilheiros" className="home-button">🏆 Artilheiros</Link>
        <Link to="/rodadas" className="home-button">⚽ Rodadas</Link>
        <Link to="/classificacao" className="home-button">📈 Classificação</Link>
        <Link to="/meu-time" className="home-button">❤️ Meu Time</Link>
      </div>
    </div>
  );
}

export default Home;