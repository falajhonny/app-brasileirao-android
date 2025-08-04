import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Artilheiros from './pages/Artilheiros';
import Rodadas from './pages/Rodadas';
import Classificacao from './pages/Classificacao';
import MeuTime from './pages/MeuTime';
import logoSerieB from './assets/logo-serie-b.png';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div style={{ 
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: '"header" "main" "footer"',
      overflow: 'hidden',
      // Responsividade para diferentes tamanhos
      minHeight: '100vh',
      maxWidth: '100vw'
    }}>
      {/* Header fixo */}
      <header style={{ 
        gridArea: 'header',
        textAlign: 'center', 
        padding: 'clamp(8px, 2vw, 15px) clamp(10px, 3vw, 20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000
      }}>
        <img 
          src={logoSerieB} 
          alt="Logo Série B" 
          style={{ 
            width: 'clamp(50px, 8vw, 80px)',
            height: 'auto'
          }} 
        />
        <h1 style={{ 
          margin: '5px 0', 
          fontSize: 'clamp(18px, 4vw, 28px)',
          fontWeight: '700'
        }}>
          Brasileirão Série B
        </h1>
      </header>

      {/* Container principal com scroll */}
      <main style={{
        gridArea: 'main',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 0 // Força o grid a respeitar os limites
      }}>
        <div style={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 'clamp(5px, 0.5vw, 20px) 0 clamp(60px, 8vw, 80px) 0', // Padding responsivo
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artilheiros" element={<Artilheiros />} />
            <Route path="/rodadas" element={<Rodadas />} />
            <Route path="/classificacao" element={<Classificacao />} />
            <Route path="/meu-time" element={<MeuTime />} />
          </Routes>
        </div>
      </main>

      {/* Footer para o espaço da navbar */}
      <footer style={{
        gridArea: 'footer',
        height: 'clamp(120px, 18vw, 160px)', // Altura responsiva
        position: 'relative',
        flexShrink: 0 // Impede que seja comprimido
      }}>
        {/* Bottom Navigation */}
        <BottomNav />
      </footer>
    </div>
  );
}

export default App;