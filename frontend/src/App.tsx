import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Container, Grid} from "@mui/material"
import { NavBar } from './common/NavBar';
import { LatMenu } from './components/LatMenu'

function App() {
  return (
    <Container>
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
    </Container>
    
  );
}

export default App;
