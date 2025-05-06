import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Artilheiros from './pages/Artilheiros';
import Rodadas from './pages/Rodadas';
import Classificacao from './pages/Classificacao';
import MeuTime from './pages/MeuTime';
import logoSerieB from './assets/logo-serie-b.png';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div style={{ paddingBottom: '80px', height: '100%' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <img src={logoSerieB} alt="Logo Série B" style={{ width: '70px', marginTop: '5px' }} />
        <h1 style={{ margin: 1, fontSize: '24px' }}>Brasileirão Série B</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artilheiros" element={<Artilheiros />} />
        <Route path="/rodadas" element={<Rodadas />} />
        <Route path="/classificacao" element={<Classificacao />} />
        <Route path="/meu-time" element={<MeuTime />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;