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
import axios from 'axios';
import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { SelectionContext } from '../context/SelectionContext';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

dotenv.config({ path: './frontend/.env' });

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

export function LoginMenu() {

  const { setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    //Get the DB data

    axios.post('http://localhost:8000/userjwt',{email, password})//reemplazar con env variables
      .then((response) => {
        console.log("---retorno response / revisar header---")
        console.log(response);
        const token = response.headers.authorization.split(" ")[1];
        if (process.env.SECRET_KEY){
          jwt.verify(token, process.env.SECRET_KEY, (error:Error, decodedToken:any) => {
            if (error) {
              // Maneja el error de token inválido o expirado
              setSessionRol(0);
              console.log({ message: "Token inválido o expirado" });
            } else {
              setGlobalID(decodedToken.id); // Accede a la información del token
              setSessionRol(decodedToken.rol);// Continúa con la lógica de la API
            }
          })
        }
        return response.data;
      })
      .then((userdata) => {
        console.log("---retorno user data---")
        console.log(userdata)
      })
      .catch(error => {
        console.error(error)
      });
    console.log('Sending request with username:', email, 'and password:', password);
    console.log(localStorage.getItem('token'))
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 // const navigate = useNavigate();

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
