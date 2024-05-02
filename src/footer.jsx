import * as React from 'react';
import { motion } from 'framer-motion';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

// hooks:
import { useTheme } from '@mui/material/styles';

// ==============================================

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.tulsaForums.com">
        TulsaForums.com
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function Footer({ initial, animate, exit}) {

  // ============================================

  const { j } = useTheme();

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
          background: j.bg.secondary,
        }}
      >
        <Container maxWidth="sm" >
          <Typography variant="body1" color="text.primary">
            Tulsa Forums
          </Typography>
          
          <Copyright />
        </Container>
      </Box>
    </motion.div>
  );
}
