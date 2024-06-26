import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// comps:
import Transition from './_layout-transition';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// hoods:
import { useNotification } from './hooks/use-notification';

// context:
import { AuthContext } from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function SignInSide() {

  // ============================================

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  // ============================================

  const [ notify ] = useNotification();
  const { logIn }  = useContext(AuthContext);

  // ============================================

  const loginFn = async (user) => {
    notify({ message: 'logging user in...', variant: 'info', duration: 2000 })();
    const URL = apiUrl('auth/login');

    const promise = http({ url: URL, method: 'POST', body: { 
      email: user.email,
      password: user.password,
    } });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({ message: 'error logging user in...', variant: 'error', duration: 5000 })();
      console.log('if(error) in loginFn()');
      console.log(error);
      return;
    } // if (error)
    
    notify({ message: 'successfully logged user in! 🙂', variant: 'success', duration: 3000 })();
    console.log('data: ', data);

    const { 
      user: { id, email, first_name, last_name, is_admin }, 
      token,
    } = data;

    console.log('id: ', id);
    console.log('email: ', email);
    console.log('first_name: ', first_name);
    console.log('last_name: ', last_name);
    console.log('is_admin: ', is_admin);
    console.log('token: ', token);

    const USER = {
      id,
      email,
      first_name,
      last_name,
      password,
      token,
      is_admin,
    };

    logIn(USER);
  };

  // ============================================

  const registerFn = async (user) => {
    notify({ message: 'logging user in...', variant: 'info', duration: 2000 })();
    const URL = apiUrl('auth/register');
    const promise = http({ url: URL, method: 'POST', body: { 
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
    } });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({ message: 'error registering...', variant: 'error', duration: 5000 })();
      console.log('if(error) in registerFn()');
      console.log(error);
      return;
    } // if (error)
    
    notify({ message: 'successfully registered! 🙂', variant: 'success', duration: 3000 })();
    console.log('data: ', data);

    loginFn(user);
  };

  // ============================================

  return (
    <Transition>
      <Grid 
        container
        sx={{ height: '100%' }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box 
              component="form" 
              noValidate 
              sx={{ mt: 1 }}
              onSubmit={(e) => {
                e.preventDefault();
                registerFn({ email, password,  first_name, last_name});
                setEmail('');
                setPassword('');
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
                value={email}
                data-cy="auth-email-text-field"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                data-cy="auth-password-text-field"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="first_name"
                label="First Name"
                // type=""
                id="first_name"
                // autoComplete="current-password"
                onChange={e => setFirstName(e.target.value)}
                value={first_name}
                data-cy="auth-password-text-field"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="last_name"
                label="Last Name"
                // type=""
                id="last_name"
                // autoComplete="current-password"
                onChange={e => setLastName(e.target.value)}
                value={last_name}
                data-cy="auth-password-text-field"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-cy="auth-login-button"
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Log In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Transition>
  );
}
