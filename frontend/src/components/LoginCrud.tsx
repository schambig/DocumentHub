// export default EditableData;
// import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext, useEffect, useState } from 'react';
import {usUario, RolUsuario} from '../assets/data_user'
import {SelectionContext} from '../context/SelectionContext'
import axios from 'axios'
import SyncIcon from '@mui/icons-material/Sync';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {LoadingButton} from '@mui/lab'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// interface User {
//   id: number;
//   idRol: number;
//   status: boolean;
//   nombreUser: string;
//   email: string;
//   password: string;
// }

export const UserEditor:React.FC<{}> = ():JSX.Element => {
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = (password:string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
  const [users, setUsers] = useState<usUario[]>([]);
  const [selectedUser, setSelectedUser] = useState<usUario | null>(null);
  const {refresh, setRefresh} = useContext(SelectionContext);
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
    fetch("http://localhost:8000/api/usuarios")
    //fetch(" http://localhost:8000/tUsuarios")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
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

  const handleChangeROL = (event:any) => {
    setROL(event.target.value as RolUsuario);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSave = async():Promise<void> => {
    const isValid = validatePassword(userData.password);
    setLoadSave({...loadSave , status:true})
    if ((userData.userNombre === '' || userData.email === '')){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data");
      
    }else if((userData.userNombre === null || userData.email === null)){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error'  })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data null");

    }else if(!isValid && userData.password) {
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
      axios.patch(`http://localhost:8000/api/usuarios/${userData.id}`, {
          ...userData,
          estado: statusCheckbox,
      })
        .then(response => {
          setRefresh(!refresh);
          if (response.status === 200){
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
    }

  }
  

  return (
    <div>
      <Autocomplete
        sx={{m: '25px 0px'}}
        id="user-select"
        color='neutral'
        options={users}
        getOptionLabel={(user) => user.userNombre}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
          if (newValue) {
            setUserData({...newValue,password:''});
            setStatusCheckbox(newValue.estado);
          } else {
            setUserData({
              id: '',
              userNombre: '',
              email: '',
              password: '',
              estado: false,
              rol: RolUsuario.USER
            });
            setStatusCheckbox(false);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Seleccionar usuario" color='neutral' variant="outlined" />
        )}
      />
      {selectedUser && (
        <div className="container">
          {/* <h1> Actualizar Usuario</h1> */}
        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}}>
          {/* primera fila */}
          <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            <Grid item xs={10}>
                <TextField
                  sx={{ width: '100%'}}
                  name="id"
                  label="ID"
                  color='neutral'
                  disabled
                  // type="number"
                  value={userData.id}
                  onChange={handleChange}
                  inputProps={{ size: userData.id.length }}
                />
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={4}>
                <TextField
                  sx={{ width: '100%'}}
                  name="userNombre"
                  label="Nombre"
                  value={userData.userNombre}
                  onChange={handleChange}
                  color='neutral'
                />
            </Grid>

            <Grid item xs={5} sm={5} md={5} lg={4}>
              <FormControl color='neutral' fullWidth>
                <InputLabel sx={{}} id="demo-simple-select-label" >Rol</InputLabel>
                <Select
                  sx={{width:'100%'}}
                  name="rol"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={rol ? (setUserData({...userData, rol:rol})) : (userData.rol)}
                  value={rol ? rol : (userData.rol)}
                  label="Rol"
                  onChange={handleChangeROL}
                  //color='neutral'
                >
                  <MenuItem value={RolUsuario.ADMIN}>Admin</MenuItem>
                  <MenuItem value={RolUsuario.DATAUSER}>Data user</MenuItem>
                  <MenuItem value={RolUsuario.USER}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
      
            <Grid item xs={5} sm={5} md={5} lg={2}>
              <FormControlLabel
                sx={{ width: '100%'}}
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
        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}}>
          {/* segunda fila */}
          <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            <Grid item xs={10} sm={10} md={10} lg={4}>
              <TextField
              sx={{width:'100%'}}
                name="email"
                label="Correo electrónico"
                value={userData.email}
                onChange={handleChange}
                color='neutral'
              />
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="password"
                label="Contraseña"
                value={userData.password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handlePasswordChange(e);
                }}
                color='neutral'
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
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize: '40px'}}/>: (loadSave.respSuccess ? <PublishedWithChangesIcon style={{fontSize: '40px'}}/>: (<SyncIcon style={{fontSize: '40px'}}/>))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
            >
             {/* <Typography variant="h6" style={{fontWeight: 'bold'}}> */}
                {loadSave.respError ? "ERROR": (loadSave.respSuccess ? "Éxito": ("Actualizar"))}
              {/* </Typography> */}
            </LoadingButton>
            <ToastContainer/>
            </Grid>

          </Grid>
          
          
          </div>
          </div>
          )}
        </div>
        );
      };