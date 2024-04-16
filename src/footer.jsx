import * as React from 'react';
import { motion } from 'framer-motion';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

// ==============================================

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.node-web-app.com">
        node-web-app.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function Footer({ initial, animate, exit}) {

  // ============================================

  return (
    <motion.div
      initial={ initial }
      animate={ animate }
      exit={ exit }
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          // mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            eCommerce Demo by Josh Holloway
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </motion.div>
  );
}
