// libs:
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// comps:
import Layout from './_layout';

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

  const { thread_id } = useParams(); // 'id' matches the name specified in the route
  console.log('thread_id: ', thread_id);
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState(''); // [reply, setReply

  // ============================================

  const getPosts = async () => {
    const url = apiUrl(`posts/thread/${thread_id}`);
    const promise = http({ url });
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
    <Layout navbar={false} footer={false}>

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
              <h5>{post.content}</h5>
              <h6>by 
                {
                  <span>
                    {post.first_name} ({post.is_admin ? 'Admin' : 'User'} | {post.user_id})
                  </span>
                }
              </h6>
            </li>
          );
        })}
      </ul>

      <textarea
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      >

      </textarea>
      <button onClick={() => createPost()}>Reply</button>
    </Layout>
  );
};