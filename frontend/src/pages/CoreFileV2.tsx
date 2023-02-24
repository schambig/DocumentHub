import { Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { NavBar } from '../common/NavBar';
import UploadFiles from '../components/FileUpload';
import { LatMenuLoad } from '../components/LatMenuLoadV2';
import { SelectionContext } from '../context/SelectionContext';

export const AppFileV2: React.FunctionComponent<{}> = (): JSX.Element => {
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
                  <LatMenuLoad />
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
