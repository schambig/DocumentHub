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
  
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }
  
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
      <h2> Actualizar Usuario:</h2>
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

            <Grid item xs={10} sm={10} md={4} lg={4}>
                <TextField
                  sx={{ width: '100%'}}
                  name="userNombre"
                  label="Name"
                  value={userData.userNombre}
                  onChange={handleChange}
                  color='neutral'
                />
            </Grid>

            <Grid item xs={5} sm={5} md={4} lg={4}>
              <FormControl color='neutral' fullWidth>
                <InputLabel sx={{}} id="demo-simple-select-label" >Role</InputLabel>
                <Select
                  sx={{width:'100%'}}
                  name="rol"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={rol ? (setUserData({...userData, rol:rol})) : (userData.rol)}
                  value={rol ? rol : (userData.rol)}
                  label="Role"
                  onChange={handleChangeROL}
                  //color='neutral'
                >
                  <MenuItem value={RolUsuario.ADMIN}>Admin</MenuItem>
                  <MenuItem value={RolUsuario.DATAUSER}>Data user</MenuItem>
                  <MenuItem value={RolUsuario.USER}>User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
      
            <Grid item xs={5} sm={5} md={2} lg={2}>
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
                label={statusCheckbox ? "Status: (Active)": "Status: (Disabled)"}
              />
            </Grid>
          </Grid>
        </div>
        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}}>
          {/* segunda fila */}
          <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
                name="email"
                label="Email"
                value={userData.email}
                onChange={handleChange}
                color='neutral'
              />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="password"
                label="Password"
                value={userData.password}
                onChange={handleChange}
                type="password"
                color='neutral'
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
              startIcon={loadSave.respError ? <ErrorOutlineIcon/>: (loadSave.respSuccess ? <PublishedWithChangesIcon/>: (<SyncIcon sx={{fontSize: '35px'}}/>))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
            >
             <Typography variant="h6" style={{fontWeight: 'bold'}}>
                {loadSave.respError ? "ERROR": (loadSave.respSuccess ? "SUCCESS": ("UPDATE"))}
              </Typography>
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