// libs:
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// comps:
import Navbar from './navbar';
import StickyFooter from './footer';

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

export default function Layout({ children, navbar, footer }) {

  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}
    >
      <CssBaseline/>

      {
        // location.pathname !== '/' && <Navbar
        navbar && <Navbar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      }

      <motion.main
        variants={ container_variants }
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ 
          flexGrow: 1,
          display: 'flex', // to allow child flex-grow: 1
        }}
      >
        <div
          style={{
            // border: 'solid red 10px',
            flexGrow: 1,
          }}
        >
          { children }
        </div>
      </motion.main>

      {
        // location.pathname !== '/' && <StickyFooter
        footer && <StickyFooter
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      }

      
    </Box>
  );
};