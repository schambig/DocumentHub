import { Container, Grid } from '@mui/material';
// import React, { useContext } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import { NavBar } from '../common/NavBar';
import UploadFiles from '../components/FileUpload';
import { LatMenuLoad } from '../components/LatMenuLoadV2';
import { SelectionContext } from '../context/SelectionContext';
import axios from 'axios';

export const AppFileV2: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol, setSessionRol } = useContext(SelectionContext);
  const { setGlobalID } = useContext(SelectionContext);
  const [isLoading, setIsLoading] = useState(true);
  
  
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

      {
        sessionRol ? (
          sessionRol <= 2 ? (
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
                }}>
                  <LatMenuLoad />
                </Grid>
                <UploadFiles />
              </Grid>
            </div>
          ) : null
        ) : <h1>Prohibido sin Rol</h1>
      }

      {/* <h1>Estoy en CoreFile</h1> */}
    </Container>
  )
};
