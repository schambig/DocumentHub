import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext } from "react";
//import AdbIcon from '@mui/icons-material/Adb';
import YourSVG from '../core_icons/CoreCapitalSAF_logo.svg';
//import { makeStyles } from "@mui/material";
//import { minWidth, padding, width } from "@mui/system";
//import SearchIcon from '@mui/icons-material/Search';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
//import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ListItemIcon from '@mui/material/ListItemIcon';
//import { pink } from "@mui/material/colors";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
//import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
//import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//import { redirect, Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SelectionContext } from '../context/SelectionContext';
//import { green, grey, red } from "@mui/material/colors";
import { themeSizes } from '../config/theme.condig';

export const NavBar: React.FunctionComponent<{}> = () => {



    const location = useLocation();
    const { setSelectedOption1, setSelectedOption2, setSelectedOption3, setSelectedOption4 } = useContext(SelectionContext);
    const {sessionRol, setSessionRol} = useContext(SelectionContext);
    const { nameUser } = useContext(SelectionContext);

    const navigate = useNavigate();
    const setFilter = ():void => {
        setSelectedOption1(null)
        setSelectedOption2(null)
        setSelectedOption3(null)
        setSelectedOption4(null)
    }
    const pages = [
        {
            name: 'Usuarios',
            ruta: '/user',
            keyChild1: 'actualizar',
            permiso: 1,
            sticon: <SensorOccupiedIcon style={{fontSize:(themeSizes.FSbutton - 5)}} />,
        },
        {
            name: 'Busqueda',
            ruta: '/search',
            keyChild1: 'busqueda',
            permiso: 3,
            sticon: <ManageSearchIcon style={{fontSize:themeSizes.FSbutton}} />,
        },
        {
            name: 'Carga Archivo',
            ruta: '/file',
            keyChild1: 'carga_archivo',
            permiso: 2,
            sticon: <CloudUploadOutlinedIcon style={{fontSize:themeSizes.FSbutton}}/>,
        }
    ]
    // const routs = ['/usuarios','/busqueda', '/archivos'];
    // const settings = ['Profile', 'Account', 'Logout'];
    const settings = [
        {
            name: 'Mi perfil',
            ruta: '/profile',
            keyChild1: 'profile',
            sticon: <AccountBoxOutlinedIcon />,
        },
        // {
        //     name: 'Account',
        //     ruta: '/account',
        //     sticon: < BadgeOutlinedIcon />,
        // },
        {
            name: 'Cerrar sesion',
            ruta: '/login',
            keyChild1: 'logout',
            sticon: <LogoutIcon />,
        }
    ]
    
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    const changeRol = (path:string) => {
        if (path === '/login'){
            setSessionRol(null);
            localStorage.setItem('tokenCore','')
        }
    }

    return (
    <AppBar color='info' position="static">
        <Container id='conWidth' style={{ marginLeft: 0 , marginRight: 0}}>
        <Toolbar disableGutters sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            //backgroundColor: 'red',
        }}
        >
            <Box color='info' sx={{ 
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                minWidth: '57px',
                
                padding: '1em' }}>
            <img id="img_logo"
              src={YourSVG} alt="No Result"
            />
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            LOGO
            </Typography> */}

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="neutral"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                <MenuItem 
                  id={location.pathname === page.ruta ? 'menuItem':''}
                  key={page.name} 
                  onClick={() => {return(setFilter(), navigate(page.ruta))} } 
                  disabled={location.pathname === page.ruta || (sessionRol ? (sessionRol > page.permiso ? true : false) : false)}>
                    <ListItemIcon key={page.keyChild1 + 'Icon'} id={location.pathname === page.ruta ? 'menuBarIcon':''}>
                        {page.sticon}
                    </ListItemIcon>
                    <Typography key={page.keyChild1} id={location.pathname === page.ruta ? 'menuBarText':''} textAlign="center">{page.name}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' },
                     mr: 1,
                     minWidth: '57px',
                     padding: '1em', }}>
            <img id="img_logo"
              src={YourSVG} alt="No Result"
              style={{ width: '500px' }}
            />
            </Box>
            
            <Box sx={{ 
                // display: 'flex',
                // width: '55%',
                // alignContent:'center',
                // alignItems: 'center',
                // justifyContent: 'space-around'
                flexGrow: 2,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                minWidth: '10em',
                }}>
            {pages.map((page) => (
                <Button
                id={location.pathname === page.ruta ? 'nuevo':''}
                startIcon={page.sticon}
                color={location.pathname === page.ruta ?'neutral':'neutral'}
                variant={location.pathname === page.ruta ?'outlined':'outlined'}
                key={page.name}
                value={page.ruta}
                onClick={() => {return(setFilter(), navigate(page.ruta))}}
                disabled={location.pathname === page.ruta || (sessionRol ? (sessionRol > page.permiso ? true : false) : false)}
                sx={{ 
                    my: 2,
                    //color: 'white', 
                    //display: 'flex',
                    padding: '0.5 em 2em',
                    margin: '0em 0.5em',
                    //maxWidth: '20em',
                    
                    //minWidth: '5em'
                    
                }}
                >
                {page.name}
                </Button> 
            ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton  color="info" onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar sx={{ bgcolor: "#000" }} alt={nameUser ? nameUser : ''} src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <MenuItem id={location.pathname === setting.ruta ? 'menuItem':''} key={setting.name}
                  onClick={() => {
                    return(
                        setFilter(),
                        changeRol(setting.ruta),
                        navigate(setting.ruta)
                    )}} 
                  disabled={location.pathname === setting.ruta}>
                    <ListItemIcon key={setting.keyChild1 + 'Icon'} id={location.pathname === setting.ruta ? 'menuBarIcon':''}>
                        {setting.sticon}
                    </ListItemIcon>
                    <Typography key={setting.keyChild1 + 'Icon'} id={location.pathname === setting.ruta ? 'menuBarText':''} textAlign="center">
                        {setting.name}
                    </Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    );
    
    
}