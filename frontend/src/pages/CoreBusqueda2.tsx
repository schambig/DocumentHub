import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
//import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
//import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import { SelectionContext } from '../context/SelectionContext';
import { Container, Grid } from "@mui/material";
// import React, { useContext } from 'react';
import { NavBar } from '../common/NavBar';
import { ExitUser } from '../common/ExitPage';
import { LatMenu } from '../components/LatMenu';
import '../styles/CoreAppV1.css';
import { TableBusqueda } from '../components/TableBusqueda';
import { SelectionContext } from '../context/SelectionContext';
import axios from 'axios';
import { stylesContainer } from '../common/dataComponent'

export const AppBusquedav2: React.FunctionComponent<{}> = (): JSX.Element => {
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
                justifyContent: 'center'
              }}>
                <LatMenu />
              </Grid>
            </Grid>
            <TableBusqueda />
          </div>
        ) : null
      ) : <ExitUser />
      }


      {/* <h1 style={{ display: 'flex' }}>Estoy en Busqueda 2</h1> */}
    </Container>

  );
};