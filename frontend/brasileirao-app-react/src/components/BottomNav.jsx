import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFutbol, FaListOl, FaStar, FaUser } from 'react-icons/fa';

function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: <FaHome />, label: 'Home' },
    { to: '/rodadas', icon: <FaStar />, label: 'Rodadas' },
    { to: '/classificacao', icon: <FaListOl />, label: 'Classificação' },
    { to: '/artilheiros', icon: <FaFutbol />, label: 'Artilheiros' },
    { to: '/meu-time', icon: <FaUser />, label: 'Meu Time' }
  ];

  return (
    <nav style={{
      position: 'absolute',
      bottom: 'clamp(5px, 3vw, 5px)',
      left: 'clamp(10px, 2vw, 20px)',
      right: 'clamp(10px, 2vw, 20px)',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: 'clamp(12px, 2.5vw, 18px)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      borderRadius: 'clamp(20px, 4vw, 30px)',
      border: '1px solid rgba(255,255,255,0.3)',
      minHeight: '60px'
    }}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={index}
            to={item.to}
            className={`bottom-nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;