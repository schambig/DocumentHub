import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import jwt from 'jsonwebtoken';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { SelectionContext } from '../context/SelectionContext';
import { useContext } from 'react';
import { usUario } from '../assets/data_user';

// const token = jwt.sign({ /* payload */ }, 'secret');
// interface User {
//   username: string;
//   password: string;
// }

// function login(username: string, password: string) {
//   // Send a request to the API to verify the credentials
//   fetch('http://localhost:3001/users')
//     .then(response => response.json())
//     .then((users: User[]) => {
//       const user = users.find(u => u.username === username && u.password === password);

//       if (user) {
//         // Generate a JWT token
//         const token = jwt.sign({ username }, 'secret');

//         // Store the token in localStorage
//         localStorage.setItem('token', token);

//         // Redirect the user to the dashboard page
//         window.location.href = '/dashboard';
//       } else {
//         // Handle invalid credentials
//       }
//     })
//     .catch(error => {
//       // Handle the error
//     });
// }


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://corecapital.com.pe">
        Core Capital
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// function login(username: string, password: string) {
//   // Send a request to the API to verify the credentials
//   fetch('http://localhost:8000/tUsuarios')
//     .then(response => response.json())
//     .then((users) => {
//       const user = users.find((u:any) => u.username === username && u.password === password);

//       if (user) {
//         // Generate a JWT token
//         const token = jwt.sign({ username }, 'secret');

//         // Store the token in localStorage
//         localStorage.setItem('token', token);

//         // Redirect the user to the dashboard page
//         window.location.href = '/dashboard';
//       } else {
//         // Handle invalid credentials
//       }
//     })
//     .catch(error => {
//       // Handle the error
//     });
// }

export function LoginMenu() {

  const { setSessionRol } = useContext(SelectionContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Get the DB data
    fetch('http://localhost:8000/tUsuarios')
      .then(response => response.json())
      .then((item) => {
        const elemento:usUario[] = item.filter((dato:usUario) => dato.email === email && dato.password === password)
        if (elemento.length) {
          // captar la data de idrol y settear el variable sessionRol
          setSessionRol(elemento[0].idRol)
          navigate("/app")
        }
        // console.log(item[0].email);
      })
      .catch(error => {
        // Handle the error
      });
    //Get the form data
    const email = data.get('email');
    const password = data.get('password');
    //
    // if ( email === )

    
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://corecapital.com.pe/images/inicio/bg1.jpg)',
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
          <div> </div>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs justifyContent="center">
                <Link href="#" variant="body2" onClick={handleClickOpen}>
                  Forgot password?
                </Link>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Reset your password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Write down your email, an email will be sent for restore yout password
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Send</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
