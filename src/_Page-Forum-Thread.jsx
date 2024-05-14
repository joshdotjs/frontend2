// libs:
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Box, Button, Breadcrumbs, Container, 
  Typography, Modal, TextField 
} from '@mui/material';

// comps:
import Layout from './_layout';
import IconGrouping from './mui-icon-grouping'
import SnackbarElevateAppBar from './mui-snackbar-elevate-app-bar';
import TextInputMultiLine from './mui-text-field-multiline';
import RichText from './rich-text';
import ThreadGrid from './forum-thread-grid';
import MUIResponsiveSX from './mui-responsive-sx'
import MUIResponsiveUseTheme from './mui-responsive-useTheme';

// context:
import { AuthContext } from './context/auth-context';

// hooks:
import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';

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
  const [ notify ] = useNotification();

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
    const route = `posts/thread/${thread_id}`;
    const promise = http({ url: apiUrl(route) });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      // notify({message: 'Error getting posts...', variant: 'error', duration: 2000})();
      return;
    }
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

    const [data, error] = await asynch( promise );
    if (error) {
      // notify({message: 'Error creating post...', variant: 'error', duration: 4000})();
      console.log('if(error) in createPost()');
      console.log(error);
      return;
    }

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

    const [data, error] = await asynch( promise );
    if (error) {
      // notify({message: 'Error updating post...', variant: 'error', duration: 4000})();
      console.log('if(error) in updatePost()');
      console.log(error);
      return;
    }

    setUpdatedPost('');
    getPosts();
  };

  // ============================================
  
  return (
    <Container>
      <div role="presentation" >
        <Breadcrumbs aria-label="breadcrumb" color="text.primary">
          <Link to="/forum">
            Forum
          </Link>
          <Link 
            to={`/forum/section/${posts?.[0]?.section_id}`}
          >
            Section Home
          </Link>
        </Breadcrumbs>
      </div>

      <h2>{posts?.[0]?.title}</h2>

      {/* <MUIResponsiveUseTheme /> */}
      {/* <MUIResponsiveSX /> */}
      {/* <ThreadGrid /> */}

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {posts.map((post, idx) => {
          return (
            <Box key={`post-${post.id}`} sx={(theme) => ({ mb: theme.spacing(2) })}>
              <ThreadGrid {...{ post, idx }} />
            </Box>
          );
        })}
      </ul>









            {/* { user.id === post.user_id &&
              <>
                <Button onClick={() => {
                  setUpdatedPost(post.content);
                  handleOpenEditModal();
                }}>
                  Edit
                </Button>
                <Modal
                  open={open_edit_modal}
                  onClose={handleCloseEditModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style_edit_modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>

                    
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="filled-multiline-static"
                        label="Reply"
                        multiline
                        rows={4}
                        // defaultValue="Default Value"
                        variant="filled"
                        value={updated_post}
                        onChange={(e) => setUpdatedPost(e.target.value)}
                      />
                    </Box>

                    <Button 
                      onClick={() => {
                        updatePost(post.id);
                        handleCloseEditModal();
                      }}
                    >
                      Update</Button>
                  </Box>
                </Modal>
              </>
            } */}


      {/* <SnackbarElevateAppBar /> */}
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
    </Container>
  );
};
