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
      position: 'fixed',
      bottom: 10,
      left: 10,
      right: 10,
      zIndex: 9999,
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '12px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
      borderRadius: '20px',
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