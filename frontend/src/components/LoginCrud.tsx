// export default EditableData;

import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext, useEffect, useState } from 'react';
import {usUario, RolUsuario} from '../assets/data_user'
import {SelectionContext} from '../context/SelectionContext'
// interface User {
//   id: number;
//   idRol: number;
//   status: boolean;
//   nombreUser: string;
//   email: string;
//   password: string;
// }

export const UserEditor = () => {
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

  const handleSave = () => {
    fetch(`http://localhost:8000/api/usuarios/${userData.id}`, {
   // fetch(`http://localhost:8000/tUsuarios/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        estado: statusCheckbox,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRefresh(!refresh)
        console.log(data);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error);
      });
  };

  return (
    <div>
      <h1> Actualizar Usuario:</h1>
      <Autocomplete
        sx={{m: '25px 0px'}}
        id="user-select"
        color='neutral'
        options={users}
        getOptionLabel={(user) => user.userNombre}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
          if (newValue) {
            setUserData(newValue);
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

            <Grid item xs={4}>
                <TextField
                  sx={{ width: '100%'}}
                  name="userNombre"
                  label="Name"
                  value={userData.userNombre}
                  onChange={handleChange}
                  color='neutral'
                />
            </Grid>

            <Grid item xs={4}>
              {/* cambiar por seleccionable */}
              {/* <TextField
                sx={{ width: '100%'}}
                name="rol"
                label="Role"
                // inputProps={{ size: userData.rol.length }}
                // type="number"
                value={userData.rol}
                onChange={handleChange}
              /> */}

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
      
            <Grid item xs={2}>
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
                label="Active"
              />
            </Grid>
          </Grid>
        </div>
        <div style={{display: 'flex', minWidth: 0, margin: '10px 20px 10px 20px'}}>
          {/* segunda fila */}
          <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            <Grid item xs={4}>
              <TextField
              sx={{width:'100%'}}
                name="email"
                label="Email"
                value={userData.email}
                onChange={handleChange}
                color='neutral'
              />
            </Grid>

            <Grid item xs={4}>
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

            <Grid item xs={2}>
              <Button sx={{width:'100%'}} variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>

          </Grid>
          
          
          </div>
          </div>
          )}
        </div>
        );
      };