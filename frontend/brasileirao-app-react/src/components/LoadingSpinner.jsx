import { motion } from 'framer-motion';

function LoadingSpinner() {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{ 
          textAlign: 'center', 
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 50%, #003d82 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,123,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)',
            position: 'relative'
          }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          />
          
          {/* Efeito de pulso */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px solid rgba(0,123,255,0.3)',
              pointerEvents: 'none'
            }}
          />
        </motion.div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            margin: 0,
            color: '#666',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            fontWeight: '500',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Carregando...
        </motion.p>
      </motion.div>
    );
  }
  
  export default LoadingSpinner;