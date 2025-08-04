import React from 'react';
import { motion } from 'framer-motion';

const ContentContainer = ({ 
  children, 
  title,
  className = "",
  showTitle = true
}) => {
  return (
    <motion.div 
      className={`content-container ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1
      }}
      style={{
        padding: '0 15px',
        maxWidth: '900px',
        margin: '0 auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {showTitle && title && (
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#fff',
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            // Efeito de gradiente no texto
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {title}
        </motion.h2>
      )}
      
      <motion.div 
        className="scrollable-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.3,
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        whileHover={{
          scale: 1.01,
          boxShadow: '0px 8px 30px rgba(0,0,0,0.2)',
          transition: { duration: 0.2 }
        }}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: 'clamp(15px, 3vw, 25px)',
          boxShadow: '0px 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
          position: 'relative',
          marginBottom: '30px',
          WebkitOverflowScrolling: 'touch',
          // Efeito glassmorphism
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.18)',
          // Gradiente sutil
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          // Reflexo interno
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }
        }}
      >
        <style jsx>{`
          .scrollable-content::-webkit-scrollbar {
            width: 6px;
          }
          .scrollable-content::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 3px;
          }
          .scrollable-content::-webkit-scrollbar-thumb {
            background: rgba(0,123,255,0.5);
            border-radius: 3px;
          }
          .scrollable-content::-webkit-scrollbar-thumb:hover {
            background: rgba(0,123,255,0.7);
          }
        `}</style>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ContentContainer;