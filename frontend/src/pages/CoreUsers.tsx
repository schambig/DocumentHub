import { Container, Divider, Grid } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { NavBar } from '../common/NavBar';
import { ExitUser } from '../common/ExitPage';
import { UserEditor } from '../components/LoginCrud';
import { SelectionContext } from '../context/SelectionContext';
import {CreateUser } from '../components/CreateUser';
import axios from 'axios';
import {Typography} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { stylesContainer } from '../common/dataComponent';
import {InversionistaEditor} from '../components/InversionistaActualizar'
import {InversionistaCrear} from '../components/InversionistaCrear'

export const AppUser: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol, setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const [isLoading, setIsLoading] = useState(true);
  const { setNameUser } = useContext(SelectionContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('tokenCore');
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
            localStorage.setItem("tokenCore", "");
            localStorage.setItem("tokenCore", token2);
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
              setNameUser(response.data.userNombre);
              setSessionRol(rol);
          };
          console.log("pagina Busqueda, validacion");
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error:any) => {
          console.error(error);
          localStorage.setItem("tokenCore",'');
          setSessionRol(0);
          setIsLoading(false);
        });
  },[sessionRol])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={stylesContainer}>

      {sessionRol ? (
        sessionRol === 1 ? (
          <div>

            <Grid container sx={{
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
                <div style={{marginBottom: '3rem'}}>
                <h2> Actualizar Usuario:</h2>
                  <UserEditor />
                </div>
              </Grid>
              <Divider />
              <Grid item sx={{
                display: 'flex',
                flexDirection:'column'
              }}>
                <div style={{marginBottom: '6rem'}}>
                <h2>Crear Usuario:</h2>
                <CreateUser />
                </div>
              </Grid>
              <Divider />
              <Grid item sx={{
                display: 'flex',
                flexDirection:'column'
              }}>
                <div style={{marginBottom: '3rem'}}>
                <h2>Actualizar Inversionista:</h2>
                <InversionistaEditor />
                </div>
              </Grid>
              <Divider />
              <Grid item sx={{
                display: 'flex',
                flexDirection:'column'
              }}>
                <div style={{marginBottom: '6rem'}}>
                <h2>Crear Inversionista:</h2>
                <InversionistaCrear />
                </div>
              </Grid>
              <Divider />
              {/* <h1> Componente  </h1> */}
            </Grid>
          </div>
        ) : null
      ) : <ExitUser />
      }
      {/* <h1>Estoy en CoreUser</h1> */}
    </Container>
  )
};