import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RolUsuario, usUario } from '../assets/data_user';
import { SelectionContext } from '../context/SelectionContext';

export function RestorePass() {
  interface LoadSave {
    status: boolean
    respSuccess: boolean
    respError: boolean
    color: string
  }
  interface DecodedToken {
    email: string;
  }
  const path = window.location.pathname;
  const token = path.split('/')[2];
  console.log(token);
  const decodedToken: DecodedToken = jwt_decode(token);
  const userEmail = decodedToken.email;
  console.log(userEmail);

  const [newPS, setNewPS] = useState<string>('');
  const [repPS, setRepPS] = useState<string>('');
  const [showPS, setShowPS] = useState<boolean>(false);
  const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
  const [loadSave, setLoadSave] = useState<LoadSave>({ status: false, respSuccess: false, respError: false, color: 'primary' });
  //const [rol, setROL] = useState<RolUsuario | null>();
  // const [users, setUsers] = useState<usUario[]>([]);
  // const [selectedUser, setSelectedUser] = useState<usUario | null>(null);
  const { refresh, setRefresh } = useContext(SelectionContext);
  const { globalID } = useContext(SelectionContext);
  const [userData, setUserData] = useState<usUario>({
    id: '',
    userNombre: '',
    email: '',
    password: '',
    estado: false,
    rol: RolUsuario.USER
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newPassword = data.get('newpass') as string; // Cast to string
    const confirmPassword = data.get('cpassword') as string; // Cast to string
    console.log(newPassword)
    console.log(confirmPassword)
    if (newPassword === confirmPassword) {
      // Do something when the passwords match
      console.log('Passwords match!');
    } else {
      // Do something when the passwords don't match
      console.log('Passwords do not match');
    }

  };
  const handleSave = async (): Promise<void> => {
    setLoadSave({ ...loadSave, status: true })
    console.log(newPS);
    console.log(repPS);
    if ((newPS === '' && repPS === '')) {
      setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
      setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data");

    } else if ((newPS === null && repPS === null)) {
      setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
      setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data null");

    } else {
      if ((newPS === repPS) && (newPS !== userData.password)) {
        setTimeout(() => {
          console.log(repPS);
          axios.patch(`http://localhost:8000/api/restorepass/`, {
            email: userEmail,
            password: repPS,
          })
            .then(response => {
              setRefresh(!refresh);
              if (response.status === 200) {
                setUserData(response.data)
                setLoadSave({ ...loadSave, status: false, respSuccess: true, color: 'success' })
                setTimeout(() => { setLoadSave({ ...loadSave, respSuccess: false, color: 'primary' }) }, 2000)
                const toastId = toast.success('Usuario actualizado con exito', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
              } else {
                setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
                setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 2000)
                const toastId = toast.error('Posible falla', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
              }
              console.log('Respuesta del servidor:', response);
            })
            .catch(error => {
              setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
              setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 2000)
              if (error.response.status === 500) {
                const toastId = toast.error("Error al actualizar, correo ya existente", { autoClose: 2000, toastId: currentToastId });
                console.log('Respuesta del servidor ___>:', error);
                setCurrentToastId(toastId);
              } else if (error.response.status === 404) {
                const toastId = toast.error('Sin Conexion a DataBase', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
              } else {
                const toastId = toast.error('Sin Conexion', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
                return console.error('Error al enviar datos:', error);
              }

            })
        }, 1000)
      } else {
        setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
        setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 2000)
        const toastId = toast.error('Las contraseñas no coinciden', { autoClose: 2000, toastId: currentToastId });
        setCurrentToastId(toastId);
      }
    }
    navigate("/login");
  }
  const [showPassword, setShowPassword] = React.useState(false);
  const handleChangeNewPS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPS(event.target.value)
  };

  const handleChangeRepPS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepPS(event.target.value)
  };

  const handleShowPS = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowPS(!showPS);
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restore Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: '50ch' }} color='error' variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="newpass"
                  name="newpass"
                  onChange={handleChangeNewPS}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="cpassword"
                  name="cpassword"
                  onChange={handleChangeRepPS}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            //onClick={() => navigate("/login")}
            onClick={handleSave}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
