// libs:
import { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box
} from '@mui/material';

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
  const { j } = useTheme();

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
        {sections.map((section) => {
          return (
            <Box
              key={`post-${section.id}`}
              sx={{
                bgcolor: j.bg.secondary,
                borderRadius: 2,
                p: 2,
                '&:hover': {
                  background: '#f0f0f0',
                }
              }}
            >
              
              <a
                href={`/forum/section/${section.id}`}
                >{section.title}
              </a>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};