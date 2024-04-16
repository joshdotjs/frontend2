import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CheckoutFailPage () {

  // ============================================

  return (
    <Layout navbar={true} footer={true}>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none' }}>
        
        <Typography variant="h1"
          id="page-title"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Checkout FAIL
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          Order details go here...
        </Box>

      </Container>
    </Layout>
  );
};
