// libs:
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Box
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HeadsetIcon from '@mui/icons-material/Headset';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CableIcon from '@mui/icons-material/Cable';
import Hidden from '@mui/material/Hidden';

// hooks:
import { useTheme } from '@mui/material/styles';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { Typography } from '@mui/material';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumPage () {

  // ============================================

  const [sections, setSections] = useState([]);
  const theme = useTheme();

  // ============================================

  const getSections = async () => {
    const url = apiUrl('sections');
    const promise = http({ url });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      // notify({message: 'Error getting threads...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('data: ', data);
    setSections(data);
  };

  // ============================================

  useEffect(() => {
    getSections();
  }, []);

  // ============================================

  const Icons = [
    {
      comp: <NewspaperIcon />,
      color: theme.j.accent.green,
    },
    {
      comp: <LocalFireDepartmentIcon />,
      color: theme.j.accent.orange,
    },
    {
      comp: <CableIcon />,
      color: theme.j.accent.purple,
    },
    {
      comp: <HeadsetIcon />,
      color: theme.j.accent.blue,
    },
  ];
  
  // ============================================
  
  return (
    <Container>
      <Typography 
        variant="h2"
        sx={{
          mb: 2,
        }}
      >
        Forum Sections
      </Typography>

      <Box
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {sections.map(({ section, num_threads, num_replies }, idx) => {
          return (
            <Link key={`post-${section.id}`} to={`/forum/section/${section.id}`}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // gap: '1rem',
                  bgcolor: theme.j.bg.secondary,
                  color: theme.palette.text.primary,
                  borderRadius: 2,
                  p: 2,
                  '&:hover': {
                    // background: '#f0f0f0',
                    opacity: 0.8,
                  },
                  transition: 'all 0.15s',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{ 
                      background: Icons[idx].color,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 'fit-content',
                      padding: '0.5rem',
                      borderRadius: 2,
                    }}
                  >
                    { Icons[idx].comp }
                  </Box>

                  <Typography variant='h4' color="text.primary">{section.title}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h5' color="text.primary">{ num_threads }</Typography>
                    <Typography variant='h6' color="text.tertiary">Threads</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h5' color="text.primary">{ num_replies }</Typography>
                    <Typography variant='h6' color="text.tertiary">Replies</Typography>
                  </Box>
                  {/* <Hidden smDown>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant='h5' color="text.primary">302.5k</Typography>
                      <Typography variant='h6' color="text.tertiary">Views</Typography>
                    </Box>
                  </Hidden> */}
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>

    </Container>
  );
};