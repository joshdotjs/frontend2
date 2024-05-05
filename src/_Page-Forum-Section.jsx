// libs:
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box, Container, Modal, Button, Typography
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HeadsetIcon from '@mui/icons-material/Headset';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CableIcon from '@mui/icons-material/Cable';
import Hidden from '@mui/material/Hidden';

// context:
import { AuthContext } from './context/auth-context';

// hooks:
import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';
import { useTheme } from '@mui/material/styles';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumSectionPage () {

  // ============================================

  const theme = useTheme();

  const [threads, setThreads] = useState([]);
  const [section, setSection] = useState({});

  const { section_id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ notify ] = useNotification();

  const [title, setTitle] = useState('New Thread');
  const [content, setContent] = useState('New Content');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ============================================

  const getThreads = async () => {
    const url = apiUrl(`threads/section/${section_id}`);
    const promise = http({ url });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      // notify({message: 'Error getting threads...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('data: ', data);
    setThreads(data.threads);
    setSection(data.section);
  };

  // ============================================

  useEffect(() => {
    getThreads();
  }, []);

  // ============================================

  const createThread = async () => {
    const post = { 
      section_id: Number(section_id),
      title,
      content,
    };
    console.log('post: ', post);

    const URL = apiUrl('threads');
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

    setTitle('');
    setContent('');
    getThreads();
  };

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
        <span style={{ fontWeight: '100'}}>
          Threads for Section: 
        </span> 
        {' '}{section.title}
      </Typography>

      <Box
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {threads.map(({ thread, num_replies}, idx) => {
          return (
            <Link key={`post-${thread.id}`} to={`/forum/thread/${thread.id}`}>



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

                  <Typography variant='h4' color="text.primary">{thread.title}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // gap: 2,
                  }}
                >
                  {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h5' color="text.primary">
                      { num_threads }
                    </Typography>
                    <Typography variant='h6' color="text.tertiary">Threads</Typography>
                  </Box> */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h5' color="text.primary">
                      { num_replies }
                    </Typography>
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

      <div>

        <div>
          <button 
            onClick={() => {
              if (!user?.logged_in) {
                notify({message: 'Please log in to create a thread...', variant: 'warning', duration: 3000})();
                return navigate('/login');
              }

              handleOpen();
            }}
          >
            Create Thread
          </button>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
              </input>
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                onClick={() => {                   
                  setOpen(false);
                  createThread();
                }}
              >
                Create Thread
              </button>

            </Box>

          </Modal>
        </div>

      </div>
    </Container>
  );
};