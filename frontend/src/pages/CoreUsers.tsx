import { Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { NavBar } from '../common/NavBar';
import { UserEditor } from '../components/LoginCrud';
import { SelectionContext } from '../context/SelectionContext';

export const AppUser: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol } = useContext(SelectionContext);

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
                <div>
                  <UserEditor />
                </div>
              </Grid>

            </Grid>
          </div>
        ) : null
      ) : <h1>Prohibido el acceso sin Rol </h1>
      }
      <h1>Estoy en CoreUser</h1>
    </Container>
  )
};