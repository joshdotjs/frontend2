// libs:
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// comps:
import Layout from './_layout';

// context:
import { AuthContext } from './context/auth-context';

// hooks:
import { useNotification } from './hooks/use-notification';
import { useNavigate } from 'react-router-dom';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumSectionPage () {

  // ============================================

  const { section_id } = useParams(); // 'id' matches the name specified in the route
  const [threads, setThreads] = useState([]);
  const [section, setSection] = useState({});

  const { user } = useContext(AuthContext);

  const [ notify ] = useNotification();
  const navigate = useNavigate();

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
      user_id: user.id, // TODO: get user_id from auth
      thread_id: Number(thread_id),
      content: reply,
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

    setReply('');
    getPosts();
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


      <button
        onClick={() => {
          if (!user?.logged_in) {
            notify({message: 'Please log in to create a thread...', variant: 'warning', duration: 3000})();
            return navigate('/auth/login');
          }
            

          createThread();
        }}
      >
        Create Thread
      </button>
      
    </Layout>
  );
};