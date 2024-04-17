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

export default function ForumPage () {

  // ============================================

  const { thread_id } = useParams(); // 'id' matches the name specified in the route
  const [posts, setPosts] = useState([]);

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
      user_id: 1, // TODO: get user_id from auth
      content: 'NEW CONTENT BITCH',
      
    };
    console.log('order: ', order);

    const URL = apiUrl('orders');
    const promise = http({ 
      url: URL, 
      method: 'POST', 
      body: order 
    });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({message: 'Error creating order...', variant: 'error', duration: 4000})();
      console.log('if(error) in checkout()');
      console.log(error);
      return;
    }
  };

  // ============================================
  
  return (
    <Layout navbar={false} footer={false}>

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
            </li>
          );
        })}
      </ul>

      <button>Reply</button>
    </Layout>
  );
};