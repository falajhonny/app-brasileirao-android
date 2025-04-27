import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="fade-in" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Bem-vindo ao Brasileirão Série B</h2>
      <div className="home-buttons">
        <Link to="/artilheiros" className="home-button">🏆 Artilheiros</Link>
        <Link to="/rodadas" className="home-button">⚽ Rodadas</Link>
        <Link to="/classificacao" className="home-button">📈 Classificação</Link>
        <Link to="/meu-time" className="home-button">❤️ Meu Time</Link>
      </div>
    </div>
  );
}

export default Home;