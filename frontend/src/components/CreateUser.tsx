import React, { useContext, useEffect, useState } from 'react';
import {TextField, FormControlLabel,  Checkbox, Button, Grid, InputLabel, Select, MenuItem, FormControl, Typography} from '@mui/material';
import {usUario, RolUsuario} from '../assets/data_user';
import {SelectionContext} from '../context/SelectionContext';
import axios from 'axios';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {themeSizes} from '../config/theme.condig';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const CreateUser: React.FC<{}> = ():JSX.Element => {
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (password:string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    if (!password || validatePassword(password)) {
      setPasswordError("");
    } else {
      setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo especial (@$!%*?&).");
    }
    setUserData({ ...userData, password });
  };



  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  interface LoadSave{
    status:boolean
    respSuccess: boolean
    respError: boolean
    color: string
  }
  const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
  const [loadSave, setLoadSave] = useState<LoadSave>({status:false, respSuccess:false, respError:false, color:'primary' });
  const [rol, setROL] = useState<RolUsuario | null>();
  //const [users, setUsers] = useState<usUario[]>([]);
  const {refresh, setRefresh} = useContext(SelectionContext);
  //const [selectedUser, setSelectedUser] = useState<usUario | null>(null);
  interface Cuser{
    id: string,
    userNombre: string,
    email: string,
    password: string,
    estado: boolean,
    rol: string
  }
  const [userData, setUserData] = useState<usUario | Cuser>({
      id: '',
      userNombre: '',
      email: '',
      password: '',
      estado: false,
      // rol: RolUsuario.USER
      rol: ''
  });
    
  const [statusCheckbox, setStatusCheckbox] = useState<boolean>(false);

  const handleChangeROL = (event:any) => {
    setROL(event.target.value as RolUsuario);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.type === "checkbox") {
        setStatusCheckbox(event.target.checked);
      } else {
        setUserData({
          ...userData,
          [event.target.name]:
            event.target.type === "number"
              ? +event.target.value
              : event.target.value,
        });
      }
    };

  // const handleSave2 = () => {
  //   setLoadSave({...loadSave , status:true})
  // }
    
  const handleSave = async (): Promise<void> => {
    const isValid = validatePassword(userData.password);

    // fetch(`http://localhost:8000/api/usuarios/${userData.id}`, {
    
    setLoadSave({...loadSave , status:true})
    if ((userData.userNombre === '' || userData.email === '' || userData.password === '')){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data");
      
    }else if((userData.userNombre === null || userData.email === null || userData.password === null)){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error'  })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data null");
    }else if(!isValid) {
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Ingresar una contraseña válida', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un símbolo.'
      );
      return;
    }else{

      setTimeout(() => {
      axios.post(`http://localhost:8000/api/usuarios/`, {
          ...userData,
          estado: statusCheckbox,
      })
        .then(response => {
          setRefresh(!refresh);
          if (response.status === 201){
            setLoadSave({...loadSave ,status:false ,respSuccess:true, color:'success' })
            setTimeout(() => {setLoadSave({...loadSave , respSuccess:false, color:'primary' })},2000)
            const toastId = toast.success('Usuario creado con exito', { autoClose: 2000, toastId: currentToastId });
            setCurrentToastId(toastId);
          }else{
            setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
            setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},2000)
            const toastId = toast.error('Posible falla', { autoClose: 2000, toastId: currentToastId });
            setCurrentToastId(toastId);
          }
          console.log('Respuesta del servidor:', response);
        })
        .catch(error => {
          setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
          setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},2000)
          if (error.response.status === 500){
            const toastId = toast.error("cambiar correo electrónico, ya está registrado.", { autoClose: 2000, toastId: currentToastId });
            console.log('Respuesta del servidor ___>:', error);
            setCurrentToastId(toastId);
          } else if (error.response.status === 404){
            const toastId = toast.error('Sin Conexion a DataBase', { autoClose: 2000, toastId: currentToastId });
            setCurrentToastId(toastId);
          } else if (error.response.status === 401){
            const toastId = toast.error('Debe Asignar un rol', { autoClose: 2000, toastId: currentToastId });
            setCurrentToastId(toastId);
          } else {
            const toastId = toast.error('Sin Conexion', { autoClose: 2000, toastId: currentToastId });
            setCurrentToastId(toastId);
            return console.error('Error al enviar datos:', error);
          }
          
        })
      },1000)
    }
    
  }

  return (
      <div className='container'>
        

        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}} >
        {/* enviar a una primera fila  */}
        <Grid sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'}} 
          container 
          spacing={2}>
          <Grid item xs={10} sm={10} md={10} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="userNombre"
              label="Nombre"
              value={userData.userNombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={4}>
          <FormControl fullWidth color='neutral'>
            <InputLabel sx={{}} id="demo-simple-select-label"  >Rol</InputLabel>
            <Select
              sx={{width:'100%'}}
              labelId="demo-simple-select-label"
              name='rol'
              id="demo-simple-select"
              value={rol}
              label="Rol"
              onChange={handleChangeROL}
            >
              <MenuItem value={RolUsuario.ADMIN}>Admin</MenuItem>
              <MenuItem value={RolUsuario.DATAUSER}>Data user</MenuItem>
              <MenuItem value={RolUsuario.USER}>User</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={2}>
            <FormControlLabel
              sx={{width:'100%'}}
              color='neutral'
              control={
                <Checkbox
                  color='neutral'
                  checked={statusCheckbox}
                  onChange={handleChange}
                  name="statusCheckbox"
                />
              }
              label={statusCheckbox ? "Estado: (Activo)": "Estado: (Inactivo)"}
            />
          </Grid>
        </Grid>


        </div>
        <div style={{display: 'flex', alignContent:'center', alignItems:'center', minWidth: 0, margin: '10px 20px 10px 20px' }}>
        {/* enviar a una segunda fila  */}
        <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>

          <Grid item xs={10} sm={10} md={10} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="email"
              label="Correo electrónico"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10} sm={10} md={10} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color="neutral"
              name="password"
              label="Contraseña"
              value={userData.password}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handlePasswordChange(e);
              }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      // aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(passwordError)}
              helperText={passwordError}
              />
          </Grid>

          <Grid item xs={10} sm={10} md={10} lg={2}>
            {/* <Button sx={{width:'100%'}} variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button> */}
            <LoadingButton
              sx={{height:'100%', width:'100%'}}
              loading={loadSave?.status ? loadSave.status : false}
              loadingPosition="start"
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize: themeSizes.FSbutton}}/>: (loadSave.respSuccess ? <CheckCircleOutlineIcon style={{fontSize: themeSizes.FSbutton}}/>: (<SaveIcon style={{fontSize: themeSizes.FSbutton}} />))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
            >
              {/* <Typography variant="h6" style={{fontWeight: 'bold'}}> */}
                {loadSave.respError ? "Error": (loadSave.respSuccess ? "Éxito": ("Crear"))}
             {/* </Typography> */}
              
            </LoadingButton>
            <ToastContainer />
          </Grid>

        </Grid>
            
        </div>
        {/* <h3>var loadSave: {loadSave ? " existe":" nulo"}</h3>
        <h3>var loadSave.status: {loadSave.status ? 'true':'false'}</h3>
        <h3>var loadSave.respSuccess: {loadSave.respSuccess ? 'true':'false'}</h3>
        <h3>var loadSave.respError: {loadSave.respError ? 'true':'false'}</h3>
        <h3>var loadSave.color: {loadSave.color}</h3> */}
      </div>
  );
}