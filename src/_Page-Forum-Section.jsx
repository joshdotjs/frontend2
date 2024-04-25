// libs:
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// comps:
import Layout from './_layout';

// context:
import { AuthContext } from './context/auth-context';

// hooks:
import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
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

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumSectionPage () {

  // ============================================

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
  
  return (
    <Layout navbar={true} footer={true}>

      <a href="/forum">Forum Home</a>

      <h2>
        <span style={{ fontWeight: '100'}}>
          Threads for Section: 
        </span> 
         {' '}{section.title}
        </h2>
      {/* <h2>Threads for Section {threads?.[0]?.section_title}</h2> */}

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {threads.map((thread) => {
          return (
            <li 
              key={`post-${thread.id}`}
              style={{
                borderBottom: 'solid 1px #ccc',
              }}
            >
              <a href={`/forum/thread/${thread.id}`}>{thread.title}</a>
            </li>
          );
        })}
      </ul>

      {/* Create New Thread */}
      {/* Create New Thread */}
      {/* Create New Thread */}
      {/* Create New Thread */}
      <div>

        <div>
          <Button 
            onClick={() => {
              if (!user?.logged_in) {
                notify({message: 'Please log in to create a thread...', variant: 'warning', duration: 3000})();
                return navigate('/auth/login');
              }

              handleOpen();
            }}
          >
            Create Thread
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>

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
      
    </Layout>
  );
};