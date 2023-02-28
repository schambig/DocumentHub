import React, { useContext, useEffect, useState } from 'react'
import {TextField, FormControlLabel,  Checkbox, Button, Grid, InputLabel, Select, MenuItem, FormControl} from '@mui/material'
import {usUario, RolUsuario} from '../assets/data_user'
import {SelectionContext} from '../context/SelectionContext'
import axios from 'axios'

export const CreateUser: React.FC<{}> = ():JSX.Element => {
  const [rol, setROL] = useState<RolUsuario | null>();
  const [users, setUsers] = useState<usUario[]>([]);
  const {refresh, setRefresh} = useContext(SelectionContext);
  const [selectedUser, setSelectedUser] = useState<usUario | null>(null);
  const [userData, setUserData] = useState<usUario>({
      id: '',
      userNombre: '',
      email: '',
      password: '',
      estado: false,
      // rol: RolUsuario.USER
      rol: RolUsuario.USER
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
    
  const handleSave = async (): Promise<void> => {
     // fetch(`http://localhost:8000/api/usuarios/${userData.id}`, {
    if ((userData.userNombre === '' || userData.email === '' || userData.password === '')){
      return console.log("Error push Data");
      
    }else if((userData.userNombre === null || userData.email === null || userData.password === null)){
      return console.log("Error push Data null");
    }else{
      return await axios.post(`http://localhost:8000/api/usuarios/`, {
          ...userData,
          estado: statusCheckbox,
      })
        .then(response => {
          setRefresh(!refresh)
          console.log('Respuesta del servidor:', response.data);
        })
        .catch(error => {
          console.error('Error al enviar datos:', error);
        });
    }
    
  }

  return (
      <div className='container'>
        <h1> Crear Usuario:</h1>

        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}} >
        {/* enviar a una primera fila  */}
        <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
          <Grid item xs={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="userNombre"
              label="Name"
              value={userData.userNombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            {/* menu seleccionable */}
            {/* <TextField
              sx={{width:'100%'}}
              name="rol"
              label="Role"
              // type="number"
              value={userData.rol}
              onChange={handleChange}
            /> */}
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
          <Grid item xs={2}>
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
              label="Active"
            />
          </Grid>
        </Grid>


        </div>
        <div style={{display: 'flex', alignContent:'center', alignItems:'center', minWidth: 0, margin: '10px 20px 10px 20px' }}>
        {/* enviar a una segunda fila  */}
        <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>

          <Grid item xs={4}>
            <TextField
              sx={{width:'100%'}}
              color='neutral'
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={4}>
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

          <Grid item xs={2}>
            <Button sx={{width:'100%'}} variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
          </Grid>

        </Grid>
        </div>
      </div>
  );
}