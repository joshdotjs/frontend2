import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// hooks:
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// image:
import avatar from './avatar.png';

// ==============================================

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  const theme = useTheme();

  return (
    <>
      {/* <Box sx={ container_css }> */}
      <Box sx={{
        background: theme.j.bg.secondary,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          md: '200px 1fr',
        },
        gridTemplateRows: {
          xs: 'repeat(4, auto)',
          md: 'repeat(3, 1fr)',
        },
        border: {
          xs: 'solid white 20px',
          md: 'solid red 20px',
        },
      }}>
        {/* <Item sx={ box_css.A }> */}
        <Item sx={{
          // background: 'deepskyblue',
          gridRow: { xs: '1 / 2', md: '1 / -1',}, 
          gridColumn: { xs: '1 / -1', md: '1 / 2' }, 
          display: { xs: 'flex', md: 'block' },
          gap: { xs: 2, md: 0 },
        }}>
          <img src={avatar} alt="placeholder" style={{ borderRadius: '50%', width: '50px' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: { xs: 'flex-start', md: 'center' } }}>
            <Typography>Admin</Typography>
            <Typography>Site Admin</Typography>
          </Box>
        </Item>
        <Item sx={{
          // background: 'tomato',
          background: theme.j.bg.secondary,
          gridRow: { xs: '2 / 3', md: '1 / 2',},
          gridColumn: { xs: '1 / -1', md: '2 / 3'}, 
        }}>B</Item>
        <Item sx={{
          background: 'darkorange',
          gridRow: { xs: '3 / 4', md: '2 / 3',},
          gridColumn: { xs: '1 / -1', md: '2 / 3'},
        }}>C</Item>
        <Item sx={{
          background: 'darkorchid',
          gridRow: { xs: '4 / 5', md: '3 / 4',},
          gridColumn: { xs: '1 / -1', md: '2 / 3'},        
        }}>D</Item>
      </Box>
    </>
  );
}
