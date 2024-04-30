// libs:
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ForumThreadPage () {

  // ============================================

  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState('');
  const [link_label, setLinkLabel] = useState('');
  const [link_url, setLinkUrl] = useState('');

  const { thread_id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ notify ] = useNotification();


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
      // user_id: 1, // TODO: get user_id from auth
      thread_id: Number(thread_id),
      content: reply?.replace(/\n/g, '<br>'),
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

      <div>
        <a href="/forum">Forum Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
        <a href={`/forum/section/${posts?.[0]?.section_id}`}>Section Home</a>
      </div>

      <h2>{posts?.[0]?.title}</h2>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {posts.map((post) => {
          return (
            <li 
              key={`post-${post.id}`}
              style={{
                borderBottom: 'solid 1px #ccc',
              }}
            >
              {/* <p>{post.content}</p> */}
              <p dangerouslySetInnerHTML={{ __html: post.content}}></p>
              <h6>by{' '}
                {
                  <Link to={`/user-profile/${post.user_id}`}>
                    {post.first_name} ({post.is_admin ? 'Admin' : 'User'} | {post.user_id})
                  </Link>
                }
              </h6>
            </li>
          );
        })}
      </ul>

      <div style={{ marginBottom: '1rem' }}>
        <textarea
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        >
        </textarea>
        <div>
          <button onClick={() => {
            if (!user.logged_in) {
              notify({message: 'Please log in to post a reply...', variant: 'warning', duration: 3000})();
              return navigate('/auth/login');
            }
            
            createPost();
          }}>
            Reply
          </button>
        </div>
      </div>

      <div>
        <div>
          <label>
            Label:{' '}
            <input value={link_label} onChange={(e) => setLinkLabel(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            URL:{' '}
            <input value={link_url} onChange={(e) => setLinkUrl(e.target.value)}></input>
          </label>
        </div>
        <button
          onClick={() => {
            setReply((prev) => {
              // const str = `${prev}<a href="${link_label}">${link_url}</a>`;
              const str = `${prev} [${link_label}](${link_url})`;
              return str;
            })
          }}
        >
          Add Link
        </button>
      </div>
    </Layout>
  );
};