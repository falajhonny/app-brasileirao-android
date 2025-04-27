import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Artilheiros from './pages/Artilheiros';
import Rodadas from './pages/Rodadas';
import Classificacao from './pages/Classificacao';
import MeuTime from './pages/MeuTime';
import logoSerieB from './assets/logo-serie-b.png'; // Importando o logo
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div style={{ padding: 10 }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <img src={logoSerieB} alt="Logo Série B" style={{ width: '100px' }} />
        <h1 style={{ margin: 0, fontSize: '24px' }}>Brasileirão Série B</h1>
      </header>

      <nav style={{ marginBottom: 20, backgroundColor: 'rgb(13, 69, 24)', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
        <Link to="/" style={{ color: 'white', margin: '0 10px' }}>Home</Link>
        <Link to="/artilheiros" style={{ color: 'white', margin: '0 10px' }}>Artilheiros</Link>
        <Link to="/rodadas" style={{ color: 'white', margin: '0 10px' }}>Rodadas</Link>
        <Link to="/classificacao" style={{ color: 'white', margin: '0 10px' }}>Classificação</Link>
        <Link to="/meu-time" style={{ color: 'white', margin: '0 10px' }}>Meu Time</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artilheiros" element={<Artilheiros />} />
        <Route path="/rodadas" element={<Rodadas />} />
        <Route path="/classificacao" element={<Classificacao />} />
        <Route path="/meu-time" element={<MeuTime />} />
      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;