import React, { useContext } from 'react';
// import logo from '../logo.svg';
// import { LatMenu } from '../components/LatMenu'
// import {Button, Container, Grid} from "@mui/material"
import '../styles/CoreAppV1.css';
import { Container, Grid } from "@mui/material"
import { NavBar } from '../common/NavBar';
import { SelectionContext } from '../context/SelectionContext';

function AppV1() {
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

              </Grid>

            </Grid>
          </div>
        ) : null) : <h1>Prohibido sin ROL</h1>
      }


      <h1> Estoy dentro de la APPCore </h1>
    </Container>

  );
}

export default AppV1;