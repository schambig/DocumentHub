import React, { useContext } from 'react';
import { Container, Grid } from '@mui/material';
import { NavBar } from '../common/NavBar'
import { SelectionContext } from '../context/SelectionContext';

export const AppProfile: React.FunctionComponent<{}> = (): JSX.Element => {
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
                <h1>Component a renderizar...</h1>
              </Grid>

            </Grid>
          </div>
        ) : null
      ) : <h1>Prohibido sin ROL</h1>
      }


      <h1>Estoy en Profile</h1>
    </Container>
  )
};