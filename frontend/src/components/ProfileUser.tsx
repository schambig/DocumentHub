//import { Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
//import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext, useEffect, useState } from 'react';
import {usUario, RolUsuario} from '../assets/data_user'
import {SelectionContext} from '../context/SelectionContext'
import axios from 'axios'
import SyncIcon from '@mui/icons-material/Sync';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {LoadingButton} from '@mui/lab'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
//import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
//import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {themeSizes} from '../config/theme.condig';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// interface User {
//   id: number;
//   idRol: number;
//   status: boolean;
//   nombreUser: string;
//   email: string;
//   password: string;
// }

export const UserProfile:React.FC<{}> = ():JSX.Element => {
  interface LoadSave{
    status:boolean
    respSuccess: boolean
    respError: boolean
    color: string
  }
  const [newPS,setNewPS] = useState<string>('');
  const [repPS,setRepPS] = useState<string>('');
  const [showPS, setShowPS] = useState<boolean>(false);
  const [passwordError1, setPasswordError1] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
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

  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [showPassword3, setShowPassword3] = React.useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
  const [loadSave, setLoadSave] = useState<LoadSave>({status:false, respSuccess:false, respError:false, color:'primary' });
  //const [rol, setROL] = useState<RolUsuario | null>();
  // const [users, setUsers] = useState<usUario[]>([]);
  // const [selectedUser, setSelectedUser] = useState<usUario | null>(null);
  const {refresh, setRefresh} = useContext(SelectionContext);
  const { globalID } = useContext(SelectionContext);
  const [userData, setUserData] = useState<usUario>({
    id: '',
    userNombre: '',
    email: '',
    password: '',
    estado: false,
    rol: RolUsuario.USER
  });
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/usuarios/${globalID}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, [refresh]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox") {
      setStatusCheckbox(event.target.checked);
    } else {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value,
      }); 
    }
  };

  const handleChangeNewPS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPS(event.target.value)
  };

  const handleChangeRepPS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepPS(event.target.value)
  };

  const handleShowPS = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowPS(!showPS);
  }

  // const handleChangeROL = (event:any) => {
  //   setROL(event.target.value as RolUsuario);
  //   setUserData({
  //     ...userData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleSave = async():Promise<void> => {
    const isValid1 = validatePassword(newPS);
    const isValid2 = validatePassword(repPS);
    setLoadSave({...loadSave , status:true})
    if ((newPS === '' || repPS === '')){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data");
      
    }else if((newPS === null || repPS === null)){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error'  })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data null");

    }else if(!isValid1 || !isValid2) {
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Ingresar una contraseña válida', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return;
    }else{
      if((newPS === repPS) && (newPS !== userData.password )){
        setTimeout(() => {
          axios.patch(`http://localhost:8000/api/usuarios/${userData.id}`, {
              ...userData,
              password:repPS,
          })
            .then(response => {
              setRefresh(!refresh);
              if (response.status === 200){
                setUserData(response.data)
                setLoadSave({...loadSave ,status:false ,respSuccess:true, color:'success' })
                setTimeout(() => {setLoadSave({...loadSave , respSuccess:false, color:'primary' })},2000)
                const toastId = toast.success('Usuario actualizado con exito', { autoClose: 2000, toastId: currentToastId });
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
                const toastId = toast.error("Error al actualizar, correo ya existente", { autoClose: 2000, toastId: currentToastId });
                console.log('Respuesta del servidor ___>:', error);
                setCurrentToastId(toastId);
              } else if (error.response.status === 404){
                const toastId = toast.error('Sin Conexion a DataBase', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
              } else {
                const toastId = toast.error('Sin Conexion', { autoClose: 2000, toastId: currentToastId });
                setCurrentToastId(toastId);
                return console.error('Error al enviar datos:', error);
              }
              
            })
          },1000)
      }else{
        setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
        setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},2000)
        const toastId = toast.error('Las contraseñas no coinciden', { autoClose: 2000, toastId: currentToastId });
        setCurrentToastId(toastId);
      }
    }

  }
  

  return (
        <div className="container" style={{margin: '0px'}}>
          <h2> Mi Perfil:</h2>
          {/* primera fila */}
          
          <Grid container sx={{
            display:'flex',
            padding:'0px' ,
            width:'100%' ,
            justifyContent:'center',
            alignItems:'center',
            margin: '10px 0px 20px 0px'}}
            spacing={2}
            columns={10}
            >
            
            <Grid sx={{padding:'0px'}} item xs={10}>
                <TextField
                  sx={{ width: '100%'}}
                  name="id"
                  label="ID"
                  color='neutral'
                  disabled
                  // type="number"
                  value={userData.id}
                  onChange={handleChange}
                  InputProps={{ readOnly: true }}
                  />
            </Grid>

                  
            <Grid item xs={10} sm={10} md={4} lg={4} >
                <TextField
                  sx={{ width: '100%'}}
                  name="userNombre"
                  label="Nombre"
                  value={userData.userNombre}
                  onChange={handleChange}
                  color='neutral'
                  InputProps={{ readOnly: true }}
                />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4} >
            <TextField
                  sx={{ width: '100%'}}
                  name="rol"
                  label="Rol"
                  value={userData.rol}
                  onChange={handleChange}
                  color='neutral'
                  InputProps={{ readOnly: true }}
                />
            </Grid>
      
            <Grid item sx={{ display: { xs: 'none', md: 'block' } }} xs={12} md={2}>
              <FormControlLabel
                sx={{ width: '100%'}}
                control={
                  <Checkbox
                    color='neutral'
                    checked={userData.estado}
                    onChange={handleChange}
                    name="statusCheckbox"
                  />
                }
                label={userData.estado ? "Estado: (Activo)": "Estado: (Inactivo)"}
              />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4} >
              <TextField
              sx={{width:'100%'}}
                name="email"
                label="Correo electrónico"
                value={userData.email}
                onChange={handleChange}
                color='neutral'
                InputProps={{ readOnly: true }}
              />
            </Grid>

        

            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="password"
                label="Contraseña"
                value={userData.password}
                onChange={handleChange}
                color='neutral'
                type={showPassword1 ? 'text' : 'password'}
                InputProps={{
                  readOnly: true,
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
                />
            </Grid>


            <Grid item xs={4} sm={4} sx={{display: {md: 'none' }}}>
              <FormControlLabel
                sx={{ width: '100%'}}
                control={
                  <Checkbox
                    color='neutral'
                    checked={userData.estado}
                    onChange={handleChange}
                    name="statusCheckbox"
                  />
                }
                label={userData.estado ? "Estado: (Activo)": "Estado: (Inactivo)"}
              />
            </Grid>
            <Grid item xs={4} sm={5} md={2} lg={2}>
              <Button
                sx={{width: '100%'}}
                onClick={handleShowPS}
                variant='contained'>
              {/* <Typography  variant="h6" style={{fontWeight: 'bold'}}> */}
                {showPS ? "Cancelar" :"Actualizar"}
              {/* </Typography> */}
              </Button>
              
              </Grid>
          </Grid>
          {showPS ? ( <Divider sx={{marginTop: '10px'}}/>):(null)}

          { showPS ? (
          <Grid sx={{
            display:'flex',
            margin: "5px 0px",
            justifyContent:'center',
            alignItems:'center'}}
            container spacing={2}>
            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="newpassword"
                label="Nueva Contraseña"
                value={newPS}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeNewPS(e);
                  handlePasswordChange1(e);
                }}
                color='neutral'
                // InputProps={{ readOnly: true }}
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
                  error={Boolean(passwordError1)}
                  helperText={passwordError1} 
                />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="repeatpassword"
                label="Repetir Contraseña"
                value={repPS}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeRepPS(e);
                  handlePasswordChange2(e);
                }}
                // InputProps={{ readOnly: true }}
                color='neutral'
                type={showPassword3 ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword3 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                  }}
                  error={Boolean(passwordError2)}
                  helperText={passwordError2} 
                />
            </Grid>


            <Grid item xs={10} sm={10} md={2} lg={2}>
              {/* <Button sx={{width:'100%'}} variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button> */}
              <LoadingButton
              sx={{height:'100%', width:'100%'}}
              loading={loadSave?.status ? loadSave.status : false}
              loadingPosition="start"
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize:(themeSizes.FSbutton)}}/>: (loadSave.respSuccess ? <PublishedWithChangesIcon style={{fontSize:(themeSizes.FSbutton)}}/>: (<SyncIcon style={{fontSize:(themeSizes.FSbutton)}}/>))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
            >
             {/* <Typography variant="h6" > */}
                {loadSave.respError ? "Error": (loadSave.respSuccess ? "Éxito": ("Actualizar"))}
              {/* </Typography> */}
            </LoadingButton>
            <ToastContainer />
            </Grid>

          </Grid>

          ):(null) }
        </div>
        );
      };