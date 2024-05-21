// libs:
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Box, Button, Breadcrumbs, Container, 
  Typography, Modal, TextField 
} from '@mui/material';

// comps:
import Transition from './_layout-transition';
import Loading from './loading';
// import IconGrouping from './mui-icon-grouping'
// import SnackbarElevateAppBar from './mui-snackbar-elevate-app-bar';
// import TextInputMultiLine from './mui-text-field-multiline';
import RichText from './rich-text';
import ThreadGrid from './forum-thread-grid';
// import MUIResponsiveSX from './mui-responsive-sx'
// import MUIResponsiveUseTheme from './mui-responsive-useTheme';

// context:
import { AuthContext } from './context/auth-context';

// hooks:
import { useNavigate } from 'react-router-dom';
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

export default function ForumThreadPage () {

  // ============================================

  const [posts, setPosts] = useState([]);
  const [updated_post, setUpdatedPost] = useState('');

  const [quill, setQuill] = useState(null);
  
  const { thread_id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const [open_edit_modal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const style_edit_modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // ============================================

  const getPosts = async () => {
    setStatus(FETCH_STATUS.LOADING);

    const route = `posts/thread/${thread_id}`;
    const promise = http({ url: apiUrl(route) });
    const [data, err] = await asynch( promise );

    if (err) return errorFn({ err, msg: 'Error getting thread...' });

    setStatus(FETCH_STATUS.SUCCESS);
    console.log('data: ', data);
    setPosts(data);
  };

  // ============================================

  useEffect(() => {
    getPosts();
  }, []);

  // ============================================

  const createPost = async () => {
    const post = { 
      thread_id: Number(thread_id),
      content:   quill.getSemanticHTML()
    };
    console.log('post: ', post);

    const URL = apiUrl('posts');
    const promise = http({ 
      url: URL, 
      method: 'POST', 
      body: post
    });

    const [data, err] = await asynch( promise );
    if (err) return errorFn({ err, msg: 'Error creating reply...' });

    getPosts();
  };

  // ============================================

  const updatePost = async (id) =>  {
    const post = { 
      // id: Number(id),
      content: updated_post?.replace(/\n/g, '<br>'),
    };
    console.log('post: ', post);

    const path = `posts/${id}`;
    const url = apiUrl(path);
    const promise = http({ 
      url, 
      method: 'PUT', 
      body: post
    });

    const [data, err] = await asynch( promise );
    if (err) return errorFn({ err, msg: 'Error updating reply...' });

    setUpdatedPost('');
    getPosts();
  };

  // ============================================
  
  return (
    <Transition>
      <Container>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb" color="text.primary">
            <Link to="/forum" style={{ color: theme.palette.text.primary }}>
              Forum
            </Link>
            <Link 
              to={`/forum/section/${posts?.[0]?.section_id}`}
              style={{ color: theme.palette.text.primary }}
            >
              Section Home
            </Link>
          </Breadcrumbs>
        </div>

        <h2>{posts?.[0]?.title}</h2>

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
              {posts.map((post, idx) => {
                return (
                  <Box key={`post-${post.id}`} sx={(theme) => ({ mb: theme.spacing(2) })}>
                    <ThreadGrid {...{ post, idx }} />
                  </Box>
                );
              })} 
            </Box>

            <Box
              sx={{ mb: 2 }}
            >
              { user.logged_in && <RichText {...{ quill, setQuill }} /> }
            </Box>
              
            <Button 
              variant='contained'
              // disabled
              onClick={() => {
                if (!user.logged_in) {
                  notify({message: 'Please log in to post a reply...', variant: 'warning', duration: 3000})();
                  return navigate('/login');
                }
                
                createPost();
              }}
            >
              Reply
            </Button>    
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
