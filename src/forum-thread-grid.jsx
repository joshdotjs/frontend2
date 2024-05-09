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

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// ==============================================

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  color: 'white',
  // padding: 2
}));

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

  let box_css = {
    A: { 
      // display: 'flex',
      // flexDirection: 'column',
      background: 'deepskyblue',
    },
    B: { 
      background: 'tomato',
    },
    C: { 
      background: 'darkorange',
    },
    D: { 
      background: 'darkorchid',
    },
  };
  let container_css = {
    display: 'grid',
    gap: 2,
  };
  if (!md) {
    box_css = {
      A: { ...box_css.A, gridRow: '1 / 2',  gridColumn: '1 / -1', display: 'flex', gap: 2 },
      B: { ...box_css.B, gridRow: '2 / 3',  gridColumn: '1 / -1',  },
      C: { ...box_css.C, gridRow: '3 / 4',  gridColumn: '1 / -1',  },
      D: { ...box_css.D, gridRow: '4 / 5',  gridColumn: '1 / -1',  },
    }; // box_css
    container_css = {
      ...container_css,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(4, auto)',
      border: 'solid white 20px', 
    }; // container_css
  } // if (md)
  else {
    box_css = {
      A: { ...box_css.A, gridRow: '1 / -1', gridColumn: '1 / 2',   },
      B: { ...box_css.B, gridRow: '1 / 2',  gridColumn: '2 / 3',   },
      C: { ...box_css.C, gridRow: '2 / 3',  gridColumn: '2 / 3',   },
      D: { ...box_css.D, gridRow: '3 / 4',  gridColumn: '2 / 3',   },
    }; // box_css
    container_css = {
      ...container_css,
      gridTemplateColumns: '200px 1fr',
      gridTemplateRows: 'repeat(3, 1fr)',
      border: 'solid red 20px',
    }; // container_css
  } // else

  return (
    <>
      <Box sx={ container_css }>
        <Item sx={ box_css.A }>
          <img src={avatar} alt="placeholder" style={{ borderRadius: '50%' }} />

          {/* NOTE: I'm getting into territory where I am essecially creating CSS name hairarchies to achieve these responsive styles */}
          {/* RECALL: The goal is to not have any class names. */}
          {/* CONSIDER: Do the responsive styles inline via SX prop */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Typography>Admin</Typography>
            <Typography>Site Admin</Typography>
          </Box>
        </Item>
        <Item sx={ box_css.B }>B</Item>
        <Item sx={ box_css.C }>C</Item>
        <Item sx={ box_css.D }>D</Item>
      </Box>
    </>
  );
}
