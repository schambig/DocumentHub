import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {themeSizes} from '../config/theme.condig';
import { RolUsuario, usUario } from '../assets/data_user';
import { SelectionContext } from '../context/SelectionContext';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {LoadingButton} from '@mui/lab';



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
  const [passwordError1, setPasswordError1] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
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
  const validatePassword = (password:string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (!password || validatePassword(password)) {
      setPasswordError1("");
    } else {
      setPasswordError1("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo especial (@$!%*?&).");
    }
    setNewPS(password);
  };

  const handlePasswordChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (!password || validatePassword(password)) {
      setPasswordError2("");
    } else {
      setPasswordError2("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo especial (@$!%*?&).");
    }
    setRepPS(password);
  };

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
    const isValid1 = validatePassword(newPS);
    const isValid2 = validatePassword(repPS);
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

    } else if(!isValid1 || !isValid2 ) {
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Ingresar una contraseña válida', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return;
    }else {
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
                setTimeout(() => { navigate("/login") }, 5000)
              } else {
                setLoadSave({ ...loadSave, status: false, respError: true, color: 'error' })
                setTimeout(() => { setLoadSave({ ...loadSave, respError: false, color: 'primary' }) }, 2000)
                const toastId = toast.error('Posible falla', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
                // navigate("/login");
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
  }
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  // const handleChangeNewPS = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewPS(event.target.value)
  // };

  // const handleChangeRepPS = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRepPS(event.target.value)
  // };

  // const handleShowPS = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setShowPS(!showPS);
  // }
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
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
          Restablecer Contraseña
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>


             <Grid item xs={12}>
              <TextField
                  sx={{width:'100%'}}
                  name="newpass"
                  label="Nueva Contraseña"
                  value={newPS}
                  onChange={handlePasswordChange1}
                  color='neutral'
                  type={showPassword1 ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(passwordError1)}
                  helperText={passwordError1} 
                />
                {/* <p>{newPS}</p> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{width:'100%'}}
                name="cpassword"
                label="Repetir Contraseña"
                value={repPS}
                onChange={handlePasswordChange2}
                color='neutral'
                type={showPassword2 ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(passwordError2)}
                helperText={passwordError2} 
              />
              {/* <p>{repPS}</p> */}
            </Grid>
          </Grid>
          <LoadingButton
            sx={{height:'100%', width:'100%'}}
            loading={loadSave?.status ? loadSave.status : false}
            loadingPosition="start"
            startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize:(themeSizes.FSbutton)}}/>: (loadSave.respSuccess ? <CheckCircleOutlineIcon style={{fontSize:(themeSizes.FSbutton)}}/>: (<VpnKeyOutlinedIcon style={{fontSize:(themeSizes.FSbutton)}}/>))}
            variant="contained"
            color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
            onClick={handleSave}
            size="large"
          >
            {/* <Typography variant="h6" > */}
              {loadSave.respError ? "Error": (loadSave.respSuccess ? "Éxito": ("Actualizar"))}
            {/* </Typography> */}
          </LoadingButton>
          {/* <Button
            //onClick={() => navigate("/login")}
            onClick={handleSave}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset password
          </Button> */}
          <ToastContainer />
        </Box>
      </Box>
    </Container>
  );
}
