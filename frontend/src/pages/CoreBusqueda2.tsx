//import React, { useState, useContext } from 'react';
//import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
//import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import { SelectionContext } from '../context/SelectionContext';
import { Container, Grid } from "@mui/material";
import React, { useContext } from 'react';
import { NavBar } from '../common/NavBar';
import { LatMenu } from '../components/LatMenu';
import '../styles/CoreAppV1.css';
import { TableBusqueda } from '../components/TableBusqueda';
import { SelectionContext } from '../context/SelectionContext';

export const AppBusquedav2: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol } = useContext(SelectionContext);

  return (
    <Container>

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
              }}>
                <LatMenu />
              </Grid>
            </Grid>
            <TableBusqueda />
          </div>
        ) : null
      ) : <h1>Prohibido el acceso sin Rol </h1>
      }


      <h1 style={{ display: 'flex' }}>Estoy en Busqueda 2</h1>
    </Container>

  );
};