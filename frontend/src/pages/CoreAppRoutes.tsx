import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppV1 from './CoreAppV1';
//import AppBusqueda1 from './CoreBusquedaTEST'
//import {AppBusqueda} from './CoreBusqueda'
import { newTipoDoc } from '../assets/data_documento';
import { newInversionista } from '../assets/data_inversionistas';
import { newCategoria } from '../assets/data_levantamiento';
import { newProDucto } from '../assets/data_producto';
import { SelectionContext } from '../context/SelectionContext';
import { core_route } from '../types/interfaz';
import { AppBusquedav2 } from './CoreBusqueda2';
import { AppFileV2 } from './CoreFileV2';
import { AppProfile } from './CoreProfile';
import { AppUser } from './CoreUsers';
import { LoginMenu } from './login';
import RegisterUser from './RegisterUser';
import { RestorePass } from './RestorePass';

const CoreRoute: core_route[] = [
    {
        path: '/app',
        render: <AppV1/>
        //render: () => {return(<AppBusqueda />)},
        //render: AppBusqueda,
    },
    {
        path: '/search',
        render: <AppBusquedav2/>
        //render: () => {return(<AppBusqueda />)},
        //render: AppBusqueda,
    },
    {
        path: '/file',
        render: <AppFileV2 />,
        //render: AppFile,
    },
    {
        path: '/profile',
        render: <AppProfile />,
        //render: AppProfile,
    },
    {
        path: '/user',
        render: <AppUser />,
        //render: AppUser,
    },
    {
        path: '/login',
        render: <LoginMenu />,
        //render: AppUser,
    },
    {
        path: '/register_user',
        render: <RegisterUser />,
        //render: AppUser,
    },
    {
        path: '/restore',
        render: <RestorePass />,
        //render: AppUser,
    },
]

function AppRoutes() {
//   const [selectedOption1, setSelectedOption1] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
//   const [selectedOption2, setSelectedOption2] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
//   const [selectedOption3, setSelectedOption3] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
//   const [selectedOption4, setSelectedOption4] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
  const [selectedOption1, setSelectedOption1] = useState<newInversionista | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<newTipoDoc | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<newProDucto | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<newCategoria | null>(null);
  const [email , setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [sessionRol, setSessionRol] = useState<number | null>(null);
  
  return (
    <SelectionContext.Provider
      value={{
        selectedOption1,
        setSelectedOption1,
        selectedOption2,
        setSelectedOption2,
        selectedOption3,
        setSelectedOption3,
        selectedOption4,
        setSelectedOption4,
        email,
        setEmail,
        password,
        setPassword,
        sessionRol,
        setSessionRol
      }}
    >
    <Router>
        <Routes>
            {
                CoreRoute.map((rute:core_route): JSX.Element => {
                    return(
                    <Route path={rute.path} element={rute.render} />
                    )
                })
            } 
        </Routes>
    </Router>
    </SelectionContext.Provider>
  );
}

export default AppRoutes;
