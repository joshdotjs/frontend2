// comps:
import Transition from './_layout-transition';

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

export default function UserProfilePage () {

  // ============================================

  const { user_id } = useParams();
  const [user, setUser] = useState([]);

  // ============================================

  const getUser = async () => {
    const path = `users/${user_id}`;
    const promise = http({ url: apiUrl( path ) });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      // notify({message: 'Error getting posts...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('data: ', data);
    const { user } = data;
    setUser(user);
  };

  // ============================================

  useEffect(() => {
    getUser();
  }, []);

  // ============================================
  
  return (
    <Transition>

      <div>
        <a href="/forum">Forum Home</a>
      </div>

      <h2>User Profile</h2>

      <h5>{JSON.stringify(user)}</h5>
      <h5>{user.first_name}</h5>
      <h5>{user.last_name}</h5>
      <h5>{user.email}</h5>
      <h5>{user.id}</h5>

    </Transition>
  );
};