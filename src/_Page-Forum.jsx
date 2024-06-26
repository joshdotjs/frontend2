// libs:
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Box,
  Typography
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HeadsetIcon from '@mui/icons-material/Headset';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CableIcon from '@mui/icons-material/Cable';
import Hidden from '@mui/material/Hidden';

// comps:
import Transition from './_layout-transition';
import Loading from './loading';

// hooks:
import { useTheme } from '@mui/material/styles';
import { useLoading } from './hooks/use-loading';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumPage () {

  // ============================================

  const [sections, setSections] = useState([]);
  const theme = useTheme();
  const { 
    error, 
    setStatus, 
    errorFn, 
    is_error, 
    container_ref, 
    notify, 
    FETCH_STATUS 
  } = useLoading();

  // ============================================

  const getSections = async () => {
    setStatus(FETCH_STATUS.LOADING);

    const url = apiUrl('sections');
    const promise = http({ url });
    const [data, err] = await asynch( promise );
    
    if (err) return errorFn({ err, msg: 'Error getting thread sections...' });
    
    setStatus(FETCH_STATUS.SUCCESS);
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
    <Transition>
      <Container>
        <Typography 
          variant="h2"
          sx={{
            mb: 2,
          }}
        >
          Forum Sections
        </Typography>

        <main 
          ref={container_ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
        }}>
          <section className="success" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', opacity: 0 }}>
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

          </section>

          <section className="loading" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', opacity: 1, pointerEvents: 'none' }}>
            <Loading />
          </section>
        </main>

        {is_error && <Typography>Error: {error}</Typography>}

      </Container>
    </Transition>
  );
};