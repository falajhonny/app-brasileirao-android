import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const navigationCards = [
    {
      to: '/classificacao',
      icon: '🏆',
      title: 'Classificação',
      description: 'Veja a tabela completa',
      color: '#28a745',
      gradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
    },
    {
      to: '/artilheiros',
      icon: '⚽',
      title: 'Artilheiros',
      description: 'Top goleadores',
      color: '#ffc107',
      gradient: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'
    },
    {
      to: '/rodadas',
      icon: '📅',
      title: 'Rodadas',
      description: 'Jogos e resultados',
      color: '#007bff',
      gradient: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)'
    },
    {
      to: '/meu-time',
      icon: '❤️',
      title: 'Meu Time',
      description: 'Time favorito',
      color: '#dc3545',
      gradient: 'linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: '0 15px', // Removido padding top/bottom que agora é do container pai
        maxWidth: '900px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants}
        style={{
          textAlign: 'center',
          marginBottom: '25px',
          padding: '25px 20px',
          background: 'linear-gradient(135deg, rgba(0,123,255,0.95) 0%, rgba(102,16,242,0.95) 100%)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,123,255,0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* Animated Background decoration */}
        <motion.div 
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none'
          }} />
        
        <motion.div 
          style={{ position: 'relative', zIndex: 2 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1 
            style={{ 
              color: '#fff', 
              marginBottom: '10px',
              fontSize: '26px',
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            animate={{ 
              textShadow: [
                '0 2px 4px rgba(0,0,0,0.3)',
                '0 4px 8px rgba(0,123,255,0.4)',
                '0 2px 4px rgba(0,0,0,0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚽ Brasileirão Série B
          </motion.h1>
          <motion.p 
            style={{ 
              color: 'rgba(255,255,255,0.9)', 
              marginBottom: '15px',
              fontSize: '15px',
              fontWeight: '400'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Acompanhe tudo sobre a segunda divisão
          </motion.p>
          <motion.div 
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
          >
            <span>📅</span>
            {currentTime.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation Cards */}
      <motion.div 
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 40vw, 280px), 1fr))',
          gap: 'clamp(10px, 2.5vw, 20px)',
          marginBottom: 'clamp(20px, 4vw, 30px)'
        }}
      >
        {navigationCards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={card.to}
              style={{
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <motion.div 
                style={{
                  background: card.gradient,
                  borderRadius: '16px',
                  padding: '20px 18px',
                  color: 'white',
                  boxShadow: `0 4px 20px ${card.color}20`,
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.2)',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                whileHover={{
                  boxShadow: `0 8px 30px ${card.color}40`,
                }}
              >
                {/* Animated Background pattern */}
                <motion.div 
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8 + index,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80px',
                    height: '80px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                    borderRadius: '50%',
                    transform: 'translate(20px, -20px)'
                  }} 
                />
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <motion.div 
                    style={{
                      fontSize: '28px',
                      marginBottom: '8px',
                      display: 'block'
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 style={{
                    margin: '0 0 4px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    textAlign: 'left'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    opacity: 0.9,
                    textAlign: 'left'
                  }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        variants={itemVariants}
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          marginBottom: '30px' // Aumentado para mais distância da navbar
        }}
      >
        <motion.h3 
          style={{
            margin: '0 0 18px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            textAlign: 'center'
          }}
          animate={{
            color: ['#333', '#007bff', '#333']
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          ⚡ Informações do Campeonato
        </motion.h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(80px, 20vw, 120px), 1fr))',
          gap: 'clamp(8px, 2vw, 15px)',
          textAlign: 'center'
        }}>
          {[
            { value: '20', label: 'Times', color: '#007bff', icon: '🏟️' },
            { value: '38', label: 'Rodadas', color: '#28a745', icon: '🗓️' },
            { value: '4', label: 'Acesso', color: '#ffc107', icon: '⬆️' },
            { value: '4', label: 'Série C', color: '#dc3545', icon: '⬇️' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              style={{ padding: '12px 8px' }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 1 + index * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: stat.color, 
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                <span style={{ fontSize: '16px' }}>{stat.icon}</span>
                {stat.value}
              </motion.div>
              <div style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;