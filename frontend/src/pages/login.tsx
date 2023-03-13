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
import coreLogo from '../core_icons/CoreCapitalSAF_logo.svg';

// import jwt from 'jsonwebtoken';
import axios from 'axios';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SelectionContext } from '../context/SelectionContext';


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
  const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
  const { setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const { setNameUser } = useContext(SelectionContext);
  localStorage.setItem('tokenCore', '')



  const handleSend = (event: any) => {
    event.preventDefault();
    console.log(event);
    const emailuser = textFieldValue;
    console.log(emailuser)
    axios.post("http://localhost:8000/api/email", { "email": emailuser })
      .then((response) => {
        if (response.status === 200) {
          console.log("Gozu");
        };
        console.log(response);
        console.log(response.status);
        return response.data;
      })

      handleClose();
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Get the form data
    const email = data.get('email');
    const password = data.get('password');
    //Get the DB data
    axios.post("http://localhost:8000/api/login/jwt", { "email": email, "password": password })
      .then((response) => {
        if (response.status === 200) {
          const token = (response.headers.authorization.split(' '))[1];

          localStorage.setItem("tokenCore", token);
        };
        console.log(response);
        console.log(response.status);
        return response.data;
      })
      .then((userData) => {
        if (userData.estado) {
          console.log(userData.rol);
          setGlobalID(userData.id);
          let rol = 0;
          if (userData.rol === "ADMIN") {
            rol = 1;
          } else if (userData.rol === "DATAUSER") {
            rol = 2;
          } else if (userData.rol === "USER") {
            rol = 3;
          } else {
            rol = 0;
          }
          setNameUser(userData.userNombre);
          setSessionRol(rol);
          navigate('/search');
        } else {
          console.log("no entrega user data")
        }
        console.log(userData)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const toastId = toast.error("Usuario o contraseña incorrecta", { autoClose: 1500, toastId: currentToastId });
          setCurrentToastId(toastId);
        } else if (error.response.status === 403) {
          const toastId = toast.error("Usuario Inactivo, Comuniquese con un administrador para recuperar su cuenta", { autoClose: 3000, toastId: currentToastId });
          setCurrentToastId(toastId);
        } else if (error.response.status === 404) {
          const toastId = toast.error("Usuario o contraseña incorrecta", { autoClose: 3000, toastId: currentToastId });
          setCurrentToastId(toastId);
        } else {
          const toastId = toast.error("Usuario o contraseña incorrecta", { autoClose: 3000, toastId: currentToastId });
          setCurrentToastId(toastId);
        }
        console.error(error);
      });
  };
  const [open, setOpen] = React.useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');

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
          <img src={coreLogo} alt="CoreLogo" style={{ minWidth: '62.5%', maxWidth: '62.5%', paddingBottom: '100px', paddingTop: '50px' }} />
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
            <ToastContainer />
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
                      id="useremail"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                      value={textFieldValue}
                      onChange={(event) => setTextFieldValue(event.target.value)}

                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend}>Send</Button>
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
