import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFutbol, FaListOl, FaStar, FaUser } from 'react-icons/fa';

function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: <FaHome />, label: 'Home' },
    { to: '/rodadas', icon: <FaFutbol />, label: 'Rodadas' },
    { to: '/classificacao', icon: <FaListOl />, label: 'Classificação' },
    { to: '/artilheiros', icon: <FaStar />, label: 'Artilheiros' },
    { to: '/meu-time', icon: <FaUser />, label: 'Meu Time' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 8,
      right: 8,
      zIndex: 9999,
      height: '60px',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxShadow: '0px -2px 10px rgba(0,0,0,0.2)',
      borderRadius: '20px',
      overflow: 'hidden',
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