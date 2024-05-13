import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  const theme = useTheme();

  const sizes = {
    // xs:  `(min-width:${theme.breakpoints.values.xs}px)`,
    md:  `(min-width:${theme.breakpoints.values.md}px)`,
  };
  const md = useMediaQuery(sizes.md);

  return (
    <>
      <Box sx={{
        background: {
          xs: theme.j.bg.secondary,
          md: theme.j.bg.primary,
        },
        display: 'grid',
        gap: { md: 2, },
        gridTemplateColumns: {
          xs: '1fr',
          md: '200px 1fr',
        },
        gridTemplateRows: {
          xs: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
        },
        border: { xs: `solid 1px ${theme.palette.text.tertiary}`, md: 'none' },
        borderRadius: '3px',
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
            {!md && <Typography variant="h5">Welcome to phpBB31</Typography>}
            {md && <Typography variant="h5">joshDotJS</Typography>}


            {!md && <Typography variant="h6">By joshDotJS</Typography>}
            {md && <Typography variant="h6">Site Admin</Typography>}
          </Box>
          {!md && <Typography variant="h5" sx={{ marginLeft: 'auto' }}>#1</Typography>}
        </Item>
        
        <Box sx={{
          background: theme.j.bg.secondary,
          // gridRow: { xs: '1 / 2', md: '1 / -1',}, 
          gridColumn: { xs: '1 / -1', md: '2 / 3' }, 
          border: { md: `solid 1px ${theme.palette.text.tertiary}` },
          borderRadius: '3px',
        }}>
          <Item sx={{
            // background: 'tomato',
            gridRow: { xs: '2 / 3', md: '1 / 2',},
            gridColumn: { xs: '1 / -1', md: '2 / 3'}, 
            paddingTop: { xs: 0, md: theme.spacing(2) },
            paddingBottom: 0,
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: `solid 1px ${theme.palette.text.tertiary}`,
              paddingBottom: { xs: 0, md: theme.spacing(2) },
              // background: 'darkred'
            }}>
              {md && <Typography variant="h5">Welcome to phpBB31</Typography>}
              {md && <Typography variant="h5">#1</Typography>}
            </Box>
          </Item>
          <Item sx={{
            // background: 'darkorange',
            gridRow: { xs: '3 / 4', md: '2 / 3',},
            gridColumn: { xs: '1 / -1', md: '2 / 3'},
            textAlign: 'left',
          }}>
            <Typography variant="body2">
              This is an example post in your phpBB3 installation. Everything seems to be working. You may delete this post if you like and continue to set up your board. During the installation process your first category and your first forum are assigned an appropriate set of permissions for the predefined usergroups administrators, bots, global moderators, guests, registered users and registered COPPA users. If you also choose to delete your first category and your first forum, do not forget to assign permissions for all these usergroups for all new categories and forums you create. It is recommended to rename your first category and your first forum and copy permissions from these while creating new categories and forums. Have fun!
            </Typography>
          </Item>
          <Item sx={{
            // background: 'darkorchid',
            background: theme.j.bg.primary,
            gridRow: { xs: '4 / 5', md: '3 / 4',},
            gridColumn: { xs: '1 / -1', md: '2 / 3'},
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: `solid 1px ${theme.palette.text.tertiary}`,
          }}>
            <Typography variant="h6">Quote</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(1), }}>
              <AccessTimeIcon sx={{ fontSize: theme.typography.h6.fontSize }} />
              <Typography variant="h6">24 February 2024, 3:16pm</Typography>
            </Box>
          </Item>
        </Box>
      </Box>
    </>
  );
}
