// libs:
import { useState, useEffect, useRef } from 'react';

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

  const [posts, setPosts] = useState([]);

  // ============================================

  const getPosts = async () => {
    const promise = http({ url: apiUrl('posts/thread/1') });
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
  
  return (
    <Layout navbar={false} footer={false}>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {posts.map((post) => {
          return (
            <li 
              style={{
                borderBottom: 'solid 1px #ccc',
              }}
            >
              {post.reply_num === 0 && <h2>{post.title}</h2>}
              <h5>{post.content}</h5>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};