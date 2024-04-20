// libs:
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// comps:
import ErrorPage from './_Page-Error';
import UsersPage  from './_Page-Users';
import AboutPage  from './_Page-About';
import StorePage  from './_Page-Store';
import LandingPage  from './_Page-Landing';
import AdminOrdersPage from './_Page-_Admin-Orders';
import CheckoutSuccessPage from './_Page-Checkout-Success';
import AuthLoginPage from './_Page-_Auth-Login';
import ForumPage from './_Page-Forum';
import ForumSectionPage from './_Page-Forum-Section';
import ForumThreadPage from './_Page-Forum-Thread';
import UserProfilePage from './_Page-User-Profile';

// context providers:
import CartContextProvider from './context/cart-context';
import AuthContextProvider from './context/auth-context';

// context:
import { AuthContext } from './context/auth-context';

// web sockets:
import { socket } from './util/socket';

// ==============================================
// ==============================================

function ConnectionState({ isConnected }) {
  return <p>State: { '' + isConnected }</p>;
}

// ==============================================

function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event }</li>
      )
    }
    </ul>
  );
}

// ==============================================

function ConnectionManager() {
  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}

// ==============================================

function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Pages = () => {

  // ============================================

  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   const onConnect = () => setIsConnected(true);
  //   const onDisconnect = () => setIsConnected(false);
  //   const onFooEvent = (value) => setFooEvents(previous => [...previous, value]);

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.emit('chat message', 'from REACT!');

  //   socket.on('chat message', (msg) => {
  //     console.log('message from Backend: ', msg);
  //   });

  // }, []);

  // ============================================

  const location = useLocation();

  // ============================================

  const { user } = useContext(AuthContext);

  let admin_routes = <></>;
  let user_routes = <></>;

  // ============================================

  if ( user?.is_admin ) {
    admin_routes = <>
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* <Route path="/"                 element={<AdminOrdersPage  />} /> */}

      <Route path="/admin/orders"     element={<AdminOrdersPage />} />
      <Route path="/admin/users"      element={<UsersPage />} />
    </>;
  } else {
    admin_routes = <>
      <Route path="/admin/orders"     element={<Navigate to="/" />} />
      <Route path="/admin/users"      element={<Navigate to="/" />} />
    </>;
  }

  // ============================================
  
  if ( !user?.logged_in ) {
    user_routes = <>
      <Route path="/auth/login"       element={<AuthLoginPage  />} />
    </>;
  } else {
    user_routes = <>
      <Route path="/auth/login"       element={<Navigate to="/" />} />
    </>;
  }
  
  // ============================================

  return (
    <AnimatePresence 
      // exitBeforeEnter
      mode="wait"
    >
      {/* <ConnectionState isConnected={ isConnected } /> */}
      {/* <Events events={ fooEvents } /> */}
      {/* <ConnectionManager /> */}
      {/* <MyForm /> */}

      <Routes location={location} key={location.key}>
        { admin_routes }
        { user_routes } 
        <Route path="/forum"                     element={<ForumPage             />} />
        <Route path="/forum/section/:section_id" element={<ForumSectionPage      />} />
        <Route path="/forum/thread/:thread_id"   element={<ForumThreadPage       />} />
        <Route path="/about"                     element={<AboutPage             />} />
        <Route path="/checkout-success"          element={<CheckoutSuccessPage   />} />
        <Route path="/store"                     element={<StorePage             />} />
        <Route path="/user-profile/:user_id"     element={<UserProfilePage       />} />
        <Route path="/map"                       element={<LandingPage         init_map={true}   />} />
        <Route path="/*"                         element={<LandingPage         init_map={false}  />} />
        {/* <Route path="/*"                element={<ErrorPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================


export default function App() {
  return (
    <SnackbarProvider maxSnack={3}  SnackbarProps={{ 'data-cy': 'notification' }}>
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Pages />
            </LocalizationProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}