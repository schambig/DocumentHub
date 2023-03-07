import { Container, Divider, Grid } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { NavBar } from '../common/NavBar';
import { UserEditor } from '../components/LoginCrud';
import { SelectionContext } from '../context/SelectionContext';
import {CreateUser } from '../components/CreateUser';
import axios from 'axios';

export const AppUser: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol, setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      axios.get('http://localhost:8000/api/login/jwt/verify', config)
        .then((response:any) => {
          if(response.status === 200){
            console.log(response);
            const token2 = (response.headers.authorization.split(' '))[1];
            localStorage.setItem("token", "");
            localStorage.setItem("token", token2);
            setGlobalID(response.data.id)
            let rol=0;
              if (response.data.rol === "ADMIN"){
                rol=1;
              }else if (response.data.rol === "DATAUSER"){
                rol=2;
              }else if (response.data.rol === "USER"){
                rol=3;
              }else{
                rol=0;
              }
              setSessionRol(rol);
          };
          console.log("pagina Busqueda, validacion");
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error:any) => {
          console.error(error);
          setSessionRol(0);
          setIsLoading(false);
        });
  },[sessionRol])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>

      {sessionRol ? (
        sessionRol === 1 ? (
          <div>

            <Grid sx={{
              display: 'flex',
              flexDirection: 'column',

            }}>

              <Grid item sx={{
                display: 'flex',
              }}>
                <NavBar />
              </Grid>

              <Grid item sx={{
                display: 'block',
              }}>
                <div style={{marginBottom: '2rem'}}>
                  <UserEditor />
                </div>
              </Grid>
              <Divider />
              <Grid item sx={{
                display: 'flex',
                flexDirection:'column'
              }}>
                <h1> Crear Usuario:</h1>
                <CreateUser />
                
              </Grid>
              {/* <h1> Componente  </h1> */}
            </Grid>
          </div>
        ) : null
      ) : <h1>Prohibido el acceso sin Rol </h1>
      }
      {/* <h1>Estoy en CoreUser</h1> */}
    </Container>
  )
};