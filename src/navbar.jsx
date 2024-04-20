// libs
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// comps:
import NavbarAvatar from './navbar-avatar';
import CartDrawer from './drawer-cart';

// context:
import { CartContext } from './context/cart-context';
import { AuthContext } from './context/auth-context';

// img
import favicon from '/favicon.svg';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const pages = [
  { title: 'Store',    route: '/store',          logged_in: false, admin: false }, 
  { title: 'Map',      route: '/map',            logged_in: false, admin: false }, 
  // { title: 'About',    route: '/about',          logged_in: false, admin: false },
  { title: 'Users',    route: '/admin/users',    logged_in: false, admin: true },
  { title: 'Orders',   route: '/admin/orders',   logged_in: false, admin: true },
  { title: 'Login',    route: '/auth/login',     logged_in: true, admin: false },
  { title: 'Forum',    route: '/forum',          logged_in: false, admin: false }, 
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Navlinks = () => {

  // ============================================

  const { user } = React.useContext(AuthContext);

  // ============================================

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // ============================================

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // ============================================

  const mobile = <>
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      {/* Hambuerger */}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => {
          if (page.admin && !user?.is_admin) return null;
          if (page.logged_in && user?.logged_in) return null;

          return (
            <MenuItem 
              key={ page.title } 
              onClick={handleCloseNavMenu}
            >
              <Link 
                to={ page.route } 
                style={{ color: 'black' }}
                data-cy={ `navlink-${page.title}-mobile` }
              >
                  { page.title }
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>


    {/* mobile icon */}
    <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: { xs: 'flex', md: 'none' }, }}>
      <img src={favicon} height="32" />
    </Box>
  </>; // mobile

  // ============================================

  const desktop = <>
    <Link to='/'>
      <Box sx={{ display: 'flex' }}>       
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          <img src={favicon} height="32" />
        </Box>
      </Box>
    </Link>

    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pl: '0.5rem' }}>
      {pages.map((page) => {
        if (page.admin && !user?.is_admin) return null;
        if (page.logged_in && user?.logged_in) return null;

        return (
          <NavLink 
            key={ page.title }
            to={ page.route }
            //   onClick={handleCloseNavMenu}
            style={{ marginRight: '1.5rem', color: 'white' }}
            data-cy={ `navlink-${page.title}-desktop` }
          >
            { page.title }
          </NavLink>
        );
      })}
    </Box>
  </>; // desktop

  // ============================================

  return (
    <>
      { mobile }
      { desktop }
    </>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ResponsiveAppBar({ initial, animate, exit}) {

  // ============================================

  const { cart_open, openCart, closeCart } = React.useContext(CartContext);
  const { user } = React.useContext(AuthContext);

  // ============================================

  return (
    <motion.div
      initial={ initial }
      animate={ animate }
      exit={ exit }
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Navlinks />

            { user?.logged_in && <NavbarAvatar /> }

            <Box sx={{ flexGrow: 0 }}>
              <IconButton 
                id="open-cart-button"
                data-testid="open-cart-button"
                data-cy="navbar-open-cart-button"
                onClick={() => openCart()} 
                sx={{ p: 0, color: 'white' }}
              >
                <svg width="28" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
              </IconButton>
            </Box>

          </Toolbar>
        </Container>

        <CartDrawer />
      </AppBar>
    </motion.div>
  );
}