import { useState, createContext, useEffect } from 'react';
// import { useRouter } from 'next/router';

// utils:
import { getLS, setLS, removeLS } from '../util/local-storage';

// hooks:
import { useNavigate } from 'react-router-dom';

// ==============================================

const INIT_USER = {
  id: null,
  email: '',
  first_name: '',
  last_name: '',
  password: '',

  token: '',
  is_admin: false,
  logged_in: false,
};

// ==============================================

const AuthContext = createContext({
  user: INIT_USER,
  setUser: () => {},
  setToken: () => {},
  logOut: () => {},
  logIn: () => {},
});

// ==============================================

function AuthContextProvider ({ children }) {

  // --------------------------------------------

  // const router = useRouter();
  const navigate = useNavigate();

  // --------------------------------------------

  const [user, setUser] = useState(INIT_USER);
  
  // --------------------------------------------

  // -Load data from LS on page load
  useEffect(() => {
    const user = getLS('user');
    
    if (user?.logged_in) {
      setUser(user);
    }

  }, []);

  // --------------------------------------------

  const logIn = (user) => {

    console.log('logging user in (auth-ctx)');
    
    const USER = {
      ...user, 
      logged_in: true,
      is_admin: !!user?.is_admin,
    };

    setUser(USER);
    setLS('user', USER); // mysql 1 => true
    
    if (user?.is_admin) {
      navigate('/admin/users');
    }
    // else
    //   router.push('/user');
  };

  // --------------------------------------------
  
  const logOut = () => {
    setUser(INIT_USER);
    removeLS('user');
  };
  
  // --------------------------------------------
  
  const context = {
    user,
    logIn,
    logOut,
  };
  
  // --------------------------------------------
  
  return (
    <AuthContext.Provider value={context}>{ children }</AuthContext.Provider>
  );
  
  // --------------------------------------------

}

// ==============================================

export { AuthContext };
export default AuthContextProvider;