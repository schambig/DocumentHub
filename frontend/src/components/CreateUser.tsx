import React, { useContext, useEffect, useState } from 'react'
import {TextField, FormControlLabel,  Checkbox, Button, Grid, InputLabel, Select, MenuItem, FormControl, Typography} from '@mui/material'
import {usUario, RolUsuario} from '../assets/data_user'
import {SelectionContext} from '../context/SelectionContext'
import axios from 'axios'
import {LoadingButton} from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {themeSizes} from '../config/theme.condig'

export const CreateUser: React.FC<{}> = ():JSX.Element => {
  // const [loadSave, setLoadSave] = useState<boolean>(false);
  // const [loadSaveOK, setLoadSaveOK] = useState<boolean>(false);
  // const [loadSaveError, setLoadSaveError] = useState<boolean>(false);
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
          <Grid item xs={10} sm={10} md={4} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="userNombre"
              label="Name"
              value={userData.userNombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5} sm={5} md={4} lg={4}>
          <FormControl fullWidth color='neutral'>
            <InputLabel sx={{}} id="demo-simple-select-label"  >Role</InputLabel>
            <Select
              sx={{width:'100%'}}
              labelId="demo-simple-select-label"
              name='rol'
              id="demo-simple-select"
              value={rol}
              label="ROL"
              onChange={handleChangeROL}
            >
              <MenuItem value={RolUsuario.ADMIN}>Admin</MenuItem>
              <MenuItem value={RolUsuario.DATAUSER}>Data user</MenuItem>
              <MenuItem value={RolUsuario.USER}>User</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={5} sm={5} md={2} lg={2}>
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
              label={statusCheckbox ? "Status: (Active)": "Status: (Disabled)"}
            />
          </Grid>
        </Grid>


        </div>
        <div style={{display: 'flex', alignContent:'center', alignItems:'center', minWidth: 0, margin: '10px 20px 10px 20px' }}>
        {/* enviar a una segunda fila  */}
        <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>

          <Grid item xs={10} sm={10} md={4} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={10} sm={10} md={4} lg={4}>
            <TextField
              sx={{width:'100%'}}
              color="neutral"
              name="password"
              label="Password"
              value={userData.password}
              onChange={handleChange}
              type="password"
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
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize: themeSizes.FSbutton}}/>: (loadSave.respSuccess ? <CheckCircleOutlineIcon style={{fontSize: themeSizes.FSbutton}}/>: (<SaveIcon style={{fontSize: themeSizes.FSbutton}} />))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
            >
              {/* <Typography variant="h6" style={{fontWeight: 'bold'}}> */}
                {loadSave.respError ? "ERROR": (loadSave.respSuccess ? "SUCCESS": ("CREATE"))}
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