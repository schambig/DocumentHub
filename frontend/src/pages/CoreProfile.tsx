import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { NavBar } from '../common/NavBar';
import { ExitUser } from '../common/ExitPage';
import { SelectionContext } from '../context/SelectionContext';
import {UserProfile} from '../components/ProfileUser';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const AppProfile: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol, setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const [isLoading, setIsLoading] = useState(true);
  const { setNameUser } = useContext(SelectionContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('tokenCore');
    if(token !== null){

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
    }},[sessionRol])
        
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container id='conWidth'>
      {sessionRol ? (
        sessionRol <= 3 ? (
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
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* <h1>Component a renderizar...</h1> */}
                <UserProfile/>
              </Grid>

            </Grid>
          </div>
        ) : null
      ) : <ExitUser />
      }


      {/* <h1>Estoy en Profile</h1> */}
    </Container>
  )
};