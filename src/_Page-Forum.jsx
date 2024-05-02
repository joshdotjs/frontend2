// libs:
import { useState, useEffect, useRef } from 'react';
import { Container } from '@mui/material';

// comps:
import Layout from './_layout';

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
    <Layout navbar={true} footer={true}>

      <Container>
        <Typography variant="h2">Forum Sections</Typography>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          {sections.map((section) => {
            return (
              <li 
                key={`post-${section.id}`}
                style={{
                  borderBottom: 'solid 1px #ccc',
                }}
              >
                <a
                  href={`/forum/section/${section.id}`}
                  >{section.title}
                </a>
              </li>
            );
          })}
        </ul>
      
      </Container>
    </Layout>
  );
};