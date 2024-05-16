// libs:
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// comps:
import Navbar from './navbar';
import StickyFooter from './footer';

// hooks:
import { useTheme } from '@mui/material/styles';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const text_primary = '#FFFFFF';
const text_secondary = '#000000';
const text_tertiary = '#81909A';

// const defaultTheme = createTheme();
const theme = createTheme({
  j: {
    bg: {
      primary: '#151F28',
      secondary: '#202E3A',
      tertiary: 'hsl(215, 30.12048192771084%, 16.274509803921568%)'
    },
    accent: {
      green: '#71B121',
      purple: '#7A5DEB',
      orange: '#EF752D',
      blue: '#1285FF',
    },
    space: {
      pad: '1rem'
    },
  },
  palette: {
    text: {
      primary: text_primary,
      secondary: text_secondary,
      tertiary: text_tertiary,
    },
  },
  typography: {
    h2: {
      fontSize: '1.8rem',
      fontWeight: 300,
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 300,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 300,
    },
    h5: {
      fontSize: '0.95rem',
      fontWeight: 300,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 0,    // xs starts from 0
      sm2: 400, // custom
      sm: 600, 
      md: 960, 
      lg: 1280,
      xl: 1920 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': { color: 'green' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'green' },
            '&:hover fieldset': { borderColor: 'red' },
            '&.Mui-focused fieldset': { borderColor: 'purple' },
          },
          '& .MuiInputBase-input': { color: text_secondary },
        }
      }
    }
  }
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const LayoutInnards = ({ children, navbar, footer }) => {

  const { j } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        color: 'white',
        background: j.bg.primary,
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
        { children }
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



export default function Layout({ children, navbar, footer }) {

  // const location = useLocation();

  return (
    <ThemeProvider theme={ theme }>
      <LayoutInnards {...{ children, navbar, footer }}/>
    </ThemeProvider>
  );
};