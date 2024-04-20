import * as React from 'react';
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
import Layout from './_layout';

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

  const [ notify ] = useNotification();
  const { logIn }  = React.useContext(AuthContext);

  // ============================================

  const loginFn = async (user) => {
    notify({ message: 'logging user in...', variant: 'info', duration: 1000 })();
    const URL = apiUrl('auth/login');

    const promise = http({ url: URL, method: 'POST', body: { 
      email: user.email,
      password: user.password,
    } });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({ message: 'error logging user in...', variant: 'error', duration: 3000 })();
      console.log('if(error) in loginFn()');
      console.log(error);
      return;
    } // if (error)
    
    notify({ message: 'successfully logged user in! 🙂', variant: 'success', duration: 2000 })();
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

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // ============================================

  return (
    <Layout navbar={true} footer={true}>
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
              Sign in
            </Typography>
            <Box 
              component="form" 
              noValidate 
              onSubmit={(e) => {
                e.preventDefault();
                loginFn({ email, password });
                setEmail('');
                setPassword('');
              }} 
              sx={{ mt: 1 }}
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/register" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
