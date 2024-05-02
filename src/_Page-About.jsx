import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';
import level_up from './assets/level-up.gif';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AboutPage () {

  return (
    <>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none' }}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <Box sx={{textAlign: 'center' }}>
          <img src={level_up} alt="level up" style={{ maxWidth: '100%', height: 'auto'}} />
        </Box>

      </Container>
    </>
  );
};
