import { Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { NavBar } from '../common/NavBar';
import UploadFiles from '../components/FileUpload';
import { LatMenu } from '../components/LatMenu';
import { SelectionContext } from '../context/SelectionContext';

export const AppFile: React.FunctionComponent<{}> = (): JSX.Element => {
  const { sessionRol } = useContext(SelectionContext);
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
                  <LatMenu />
                </Grid>
                <UploadFiles />
              </Grid>
            </div>
          ) : null
        ) : <h1>Prohibido sin Rol</h1>
      }

      <h1>Estoy en CoreFile</h1>
    </Container>
  )
};
