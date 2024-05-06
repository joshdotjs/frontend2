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

  const sizes = {
    xs:  `(min-width:${theme.breakpoints.values.xs}px)`,
    sm:  `(min-width:${theme.breakpoints.values.sm}px)`,
    md:  `(min-width:${theme.breakpoints.values.md}px)`,
    lg:  `(min-width:${theme.breakpoints.values.lg}px)`,
    xl:  `(min-width:${theme.breakpoints.values.xl}px)`,
    xxl: `(min-width:${theme.breakpoints.values.xxl}px)`,
  };

  const xs = useMediaQuery(sizes.xs);
  const sm = useMediaQuery(sizes.sm);
  const md = useMediaQuery(sizes.md);
  const lg = useMediaQuery(sizes.lg);
  const xl = useMediaQuery(sizes.xl);

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

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{
          border: 'solid white 2px',
          p: 1,
        }}>
          <p>xs Text: { sizes.xs }</p>
          <p>xs: { JSON.stringify(xs) }</p>
        </Box>

        <Box sx={{
          border: 'solid white 2px',
          p: 1,
        }}>
          <p>sm Text: { sizes.sm }</p>
          <p>sm: { JSON.stringify(sm) }</p>
        </Box>

        <Box sx={{
          border: 'solid white 2px',
          p: 1,
        }}>
          <p>md Text: { sizes.md }</p>
          <p>md: { JSON.stringify(md) }</p>
        </Box>

        <Box sx={{
          border: 'solid white 2px',
          p: 1,
        }}>
          <p>lg Text: { sizes.lg }</p>
          <p>lg: { JSON.stringify(lg) }</p>
        </Box>

        <Box sx={{
          border: 'solid white 2px',
          p: 1,
        }}>
          <p>xl Text: { sizes.xl }</p>
          <p>xl: { JSON.stringify(xl) }</p>
        </Box>
      </Box>

    </>
  );
}
