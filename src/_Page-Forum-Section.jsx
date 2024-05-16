// libs:
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box, Container, Modal, Button, Typography, TextField
} from '@mui/material';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HeadsetIcon from '@mui/icons-material/Headset';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CableIcon from '@mui/icons-material/Cable';
import Hidden from '@mui/material/Hidden';

// comps:
import Transition from './_layout-transition';

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

// ==============================================
// ==============================================
// ==============================================
// ==============================================

function Ellipsis({ children, variant, color, widths }) {
  return (
    <Box sx={{
      width: {
        xs: widths.xs,
        sm: widths.sm,
        md: widths.md,
        lg: widths.lg,
        xl: widths.xl,
      },
     }}>
      <Typography
        variant={variant}
        color={color}
        sx={{
          width: '100%',      // Adjust the width as needed
          overflow: 'hidden',  // Hide overflow
          whiteSpace: 'nowrap', // Keep text on a single line
          textOverflow: 'ellipsis', // Add ellipsis at the end
          // outline: 'dashed rgba(255, 0, 0, 0.35) 1px',
        }}
      >
        { children }
      </Typography>
    </Box>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default () => {

  // ============================================

  const theme = useTheme();

  const [threads, setThreads] = useState([]);
  const [section, setSection] = useState({});

  const { section_id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ notify ] = useNotification();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    <Transition>
      <Container>
        <Typography 
          variant="h2"
          sx={{ mb: 2 }}
        >
          {section.title} Threads
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 0,
            mb: 2,
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
                    {/* <Box
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
                    </Box> */}

                    <Ellipsis 
                      variant='h4' 
                      color="text.primary" 
                      widths={{ xs: '175px', sm: '425px', md: '725px', lg: '1025px', xl: '1025px' }}
                    >
                      {thread.title}
                    </Ellipsis>
                    {/* <Typography variant='h4' color="text.primary" width="100px">{thread.title}</Typography> */}
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

        <>
          <Button 
            variant="contained"
            onClick={() => {
              if (!user?.logged_in) {
                notify({message: 'Please log in to create a thread...', variant: 'warning', duration: 3000})();
                return navigate('/login');
              }

              handleOpen();
            }}
          >
            Create Thread
          </Button>
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box 
              component="form"
              noValidate
              autoComplete="off"
              // sx={{
              //   '& .MuiTextField-root': { m: 1, width: '25ch' },
              // }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >

              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />


              <TextField
                id="outlined-multiline-static"
                label="Content"
                // defaultValue="Default Value"
                placeholder="Enter thread content here..."
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />           

              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  createThread();
                }}
              >
                Create Thread
              </Button>
            </Box>

          </Modal>
        </>

      </Container>
    </Transition>
  );
};