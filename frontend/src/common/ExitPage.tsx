import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

export const ExitUser: React.FunctionComponent<{}> = () => {
    const navigate = useNavigate();

    return (
        <div>
        <h1><u>Sesión Expirada</u></h1>
        <h2 style={{marginLeft: '20px'}}> Lo siento, su sesión ha expirado. Por favor, vuelva a iniciar sesión para continuar utilizando nuestros servicios.</h2>
        {/* <h3 style={{marginLeft: '50px'}}>* Token inválido</h3>
        <h3 style={{marginLeft: '50px'}}>* Usuario Desactivado</h3> */}
        <Button
          id="logout-login"
          //startIcon={page.sticon}
          color='secondary'
          variant='contained'
          key="logout-login"
          value=""
          onClick={() => navigate('/login')}
          sx={{ 
              my: 2, 
              display: 'flex',
              padding: '0.5 em 2em',
              margin: '0em 0.5em',
              maxWidth: '20em',
              minWidth: '10em'
          }}
          >
          <Typography variant="h6" component="h6">
          Iniciar Sesion
          </Typography>
        </Button>
        </div>
    ) 
}