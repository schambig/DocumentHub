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
    setLoadSave({...loadSave , status:true})
    if ((newPS === '' && repPS === '')){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data");
      
    }else if((newPS === null && repPS === null)){
      setLoadSave({...loadSave ,status:false, respError:true, color:'error'  })
      setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
      const toastId = toast.error('Campos vacios', { autoClose: 1500, toastId: currentToastId });
      setCurrentToastId(toastId);
      return console.log("Error push Data null");

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
          <h1> Profile Usuario:</h1>
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
                  label="Name"
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
                  label="Role"
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
                label={userData.estado ? "Status: (Active)": "Status: (Disabled)"}
              />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4} >
              <TextField
              sx={{width:'100%'}}
                name="email"
                label="Email"
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
                label="Password"
                value={userData.password}
                onChange={handleChange}
                type="password"
                color='neutral'
                InputProps={{ readOnly: true }}
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
                label={userData.estado ? "Status: (Active)": "Status: (Disabled)"}
              />
            </Grid>
            <Grid item xs={4} sm={5} md={2} lg={2}>
              <Button
                sx={{width: '100%'}}
                onClick={handleShowPS}
                variant='contained'>
              <Typography  variant="h6" style={{fontWeight: 'bold'}}>
                {showPS ? "Canceled" :"Update PS"}
              </Typography>
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
                label="New Password"
                value={newPS}
                onChange={handleChangeNewPS}
                type="password"
                color='neutral'
                // InputProps={{ readOnly: true }}
                />
            </Grid>

            <Grid item xs={10} sm={10} md={4} lg={4}>
              <TextField
              sx={{width:'100%'}}
              
                name="repeatpassword"
                label="Repeat Password"
                value={repPS}
                onChange={handleChangeRepPS}
                type="password"
                color='neutral'
                // InputProps={{ readOnly: true }}
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
            <ToastContainer />
            </Grid>

          </Grid>

          ):(null) }
        </div>
        );
      };