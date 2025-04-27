import { useState, useEffect } from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTop;