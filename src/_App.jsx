// libs:
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// comps:
import Layout from './_layout';
import ErrorPage from './_Page-Error';
import UsersPage  from './_Page-Users';
import AboutPage  from './_Page-About';
import AuthLoginPage from './_Page-_Auth-Login';
import AuthRegisterPage from './_Page-_Auth-Register';
import ForumPage from './_Page-Forum';
import ForumSectionPage from './_Page-Forum-Section';
import ForumThreadPage from './_Page-Forum-Thread';
import UserProfilePage from './_Page-User-Profile';

// context providers:
import CartContextProvider from './context/cart-context';
import AuthContextProvider from './context/auth-context';

// context:
import { AuthContext } from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Pages = () => {

  // ============================================

  const location = useLocation();

  // ============================================

  const { user } = useContext(AuthContext);

  let admin_routes = <></>;
  let user_routes = <></>;

  // ============================================

  if ( user?.is_admin ) {
    admin_routes = <>
      <Route path="/admin/users"      element={<UsersPage />} />
    </>;
  } else {
    admin_routes = <>
      <Route path="/admin/users"      element={<Navigate to="/" />} />
    </>;
  }

  // ============================================
  
  if ( !user?.logged_in ) {
    user_routes = <>
      <Route path="/login"       element={<AuthLoginPage     />} />
      <Route path="/register"    element={<AuthRegisterPage  />} />
    </>;
  } else {
    user_routes = <>
      <Route path="/login"       element={<Navigate to="/" />} />
    </>;
  }
  
  // ============================================

  return (
    <AnimatePresence 
      // exitBeforeEnter
      mode="wait"
    >
      <Routes location={location} key={location.key}>
        { admin_routes }
        { user_routes } 
        <Route path="/forum/section/:section_id" element={<ForumSectionPage      />} />
        <Route path="/forum/thread/:thread_id"   element={<ForumThreadPage       />} />
        <Route path="/about"                     element={<AboutPage             />} />
        <Route path="/user-profile/:user_id"     element={<UserProfilePage       />} />
        <Route path="/*"                         element={<ForumPage             />} />
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
              <Layout navbar={true} footer={true}>
                <Pages />
              </Layout>
            </LocalizationProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}