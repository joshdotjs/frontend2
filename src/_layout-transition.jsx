// libs:
import { motion } from 'framer-motion';

// ==============================================
// ==============================================

const container_variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default ({ children }) => {


  return (
    <motion.main
      variants={ container_variants }
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ 
        flexGrow: 1,
        padding: '1rem',
      }}
    >
      { children }
    </motion.main>
  );
};