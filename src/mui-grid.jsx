import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// hooks:
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// ==============================================

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ==============================================

const box_css = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  padding: 2
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  const theme = useTheme();

  const sm_text = `(min-width:${theme.breakpoints.values.sm}px)`;

  // const xs = useMediaQuery('(min-width:600px)');
  const sm = useMediaQuery(sm_text);
  // const md = useMediaQuery('(min-width:600px)');
  // const md = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item>A</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>B</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>C</Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>D</Item>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ 
          display: 'grid',
          gap: 2,
          border: 'solid white 2px', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
        }}
      >
        <Box sx={{ ...box_css, gridRow: '1 / -1', gridColumn: '1 / 2', background: 'deepskyblue' }}>A</Box>
        <Box sx={{ ...box_css, gridRow: '1 / 2', gridColumn: '2 / 3',  background: 'tomato'  }}>B</Box>
        <Box sx={{ ...box_css, gridRow: '2 / 3', gridColumn: '2 / 3',  background: 'darkorchid'  }}>C</Box>
      </Box>

      <p>SM Text: { sm_text }</p>
      <p>SM: { JSON.stringify(sm) }</p>
    </>
  );
}
