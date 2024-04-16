import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './_App.jsx';
import './_index.css';
// import { createTheme, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#00ff00',
    // },
    // secondary: {
    //   main: '',
    // },
    black: {
      main: 'rgba(0, 0, 0)'
    },
    pg_white: {
      main: '#E9F7FF'
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
});

const root = document.getElementById('root');
const react = ReactDOM.createRoot( root );
react.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);