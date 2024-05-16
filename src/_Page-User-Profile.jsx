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

      <h2>User Profile</h2>

      {/* <h5>{JSON.stringify(user)}</h5> */}
      <h5>First Name: {user.first_name}</h5>
      <h5>Last Name: {user.last_name}</h5>
      <h5>Email: {user.email}</h5>
      <h5>User Number: {user.id}</h5>

      <hr />
      
      <h5>Avatar: COMING SOON...</h5>
      <h5>Quote: COMING SOON...</h5>
      <h5>Stats: COMING SOON...</h5>
      <h5>Badges: COMING SOON...</h5>

    </Transition>
  );
};