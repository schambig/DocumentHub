import React, { useState, useContext, useEffect } from 'react';
//import List from '@mui/material/List';
//import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Grid, LinearProgress, ListItem } from '@mui/material';
//import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { top100Films } from '../assets/top100'
import AssignmentIcon from '@mui/icons-material/Assignment';
//import { grey } from '@mui/material/colors';
import {converInverM , newInversionista} from '../assets/data_inversionistas'
import {convProductoM , newProDucto} from '../assets/data_producto'
import {convCateM , newCategoria} from '../assets/data_levantamiento'
import {convDocM , newTipoDoc} from '../assets/data_documento'
//import { display } from '@mui/system';
import { SelectionContext } from '../context/SelectionContext';


interface deFaultAPI{
    id: number | null
    name: string
}

export const LatMenu: React.FC<{}> = ():JSX.Element => {

    const initialAPI:deFaultAPI[] = [
        {
            id: null,
            name: 'Loading...'
        }    
    ]

    const [apiInversionista, setApiInversionista] = useState<newInversionista[]|deFaultAPI[]>(initialAPI)
    const [apiProducto, setApiProducto] = useState<newProDucto[]|deFaultAPI[]>(initialAPI)
    const [apiTipoDoc, setApiTipoDoc] = useState<newTipoDoc[]|deFaultAPI[]>(initialAPI)
    const [apiNumLev, setApiNumLev] = useState<newCategoria[]|deFaultAPI[]>(initialAPI)
    const [loadingAPI1, setLoadingAPI1] = useState<boolean>(true)
    const [loadingAPI2, setLoadingAPI2] = useState<boolean>(true)
    const [loadingAPI3, setLoadingAPI3] = useState<boolean>(true)
    const [loadingAPI4, setLoadingAPI4] = useState<boolean>(true)
    //const [loadingErrorAPI5, setLoadingErrorAPI5] = useState<boolean>(true)
    interface filter{
        text: string,
        icon: JSX.Element,
        path: string,
        tabla: Array<newTipoDoc | newCategoria | newProDucto | newInversionista | deFaultAPI>,
        load: boolean,
        keyui: string
    }
    
    // useEffect(() => {
    //     fetch('http://localhost:8000/inversionista').then(res => res.json()).then(data => setApiInversionista(converInverM(data)));
    //     fetch('http://localhost:8000/tipo_documento').then(res => res.json()).then(data => setApiTipoDoc(converDocM(data)));
    //     fetch('http://localhost:8000/producto').then(res => res.json()).then(data => setApiProducto(converProM(data)));
    //     fetch('http://localhost:8000/levantamiento').then(res => res.json()).then(data => setApiNumLev(converLevM(data)))
    // }, [])

    useEffect(() => {
        const fetchData = () => {
        fetch('http://localhost:8000/tInversionista')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
                })
                .then(data => {
                    setLoadingAPI1(false)
                    setApiInversionista(converInverM(data))
                })
                .catch(error => {
                    console.error('There was a problem with the network request:', error);
                });
            
        fetch('http://localhost:8000/tTipoDocumento')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
                })
                .then(data => {
                    setLoadingAPI2(false)
                    setApiTipoDoc(convDocM(data))
                })
                .catch(error => {
                    console.error('There was a problem with the network request:', error);
                });
        fetch('http://localhost:8000/tProducto')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
                })
                .then(data => {
                    setLoadingAPI3(false)
                    setApiProducto(convProductoM(data))
                })
                .catch(error => {
                    console.error('There was a problem with the network request:', error);
                });
    
        fetch('http://localhost:8000/tCategoria')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
                })
                .then(data => {
                    setLoadingAPI4(false)
                    setApiNumLev(convCateM(data))
                })
                .catch(error => {
                    console.error('There was a problem with the network request:', error);
                });
        };
        const timer = setTimeout(() => {
            fetchData();
          }, 2000);
        return () => clearTimeout(timer);
    }, [])


    const FilterItems:Array<filter> = [
        {
            text: 'Inversionista',
            icon: <PersonIcon />,
            path: '/',
            tabla: apiInversionista,
            load: loadingAPI1,
            keyui: "unico1"
        },
        {
            text: 'Documento',
            icon: <DescriptionIcon />,
            path: '/',
            tabla: apiTipoDoc,
            load: loadingAPI2,
            keyui: "unico2",
        },
        {
            text: 'Producto',
            icon: <MapsHomeWorkIcon />,
            path: '/',
            tabla: apiProducto,
            load: loadingAPI3,
            keyui: "unico3",
        },
        {
            text: 'Levantamiento / Emision',
            icon: <AssignmentIcon />,
            path: '/',
            tabla: apiNumLev,
            load: loadingAPI4,
            keyui: "unico4",
        },
    ] 
// numero de opciones disponible
const { selectedOption1, selectedOption2, selectedOption3, selectedOption4 } = useContext(SelectionContext);
const { setSelectedOption1, setSelectedOption2, setSelectedOption3, setSelectedOption4 } = useContext(SelectionContext);
// captar datos dependiendo evento onChange
 //const [selectedOption1, setSelectedOption1] = useState(null);
 //const [selectedOption2, setSelectedOption2] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
 //const [selectedOption3, setSelectedOption3] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
 //const [selectedOption4, setSelectedOption4] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);

 //const [selectedPER, setSelectedPER] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
 //const [selectedDOC, setSelectedDOC] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
 //const [selectedPROD, setSelectedPROD] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);
 //const [selectedLEV, setSelectedLEV] = useState<newTipoDoc | newCategoria | newProDucto | newInversionista | null>(null);

 //selectedOption1 = selectedPER


const optionListSelect = [
    selectedOption1,
    selectedOption2,
    selectedOption3,
    selectedOption4,
]

const optionListSet = [
    setSelectedOption1,
    setSelectedOption2,
    setSelectedOption3,
    setSelectedOption4,
]


return (
    <Grid sx={
        {
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        minWidth: '200px',
        maxWidth: '100%',
        }}>
        { FilterItems.map((item, index) => {
            let selectedOption: any | null;
            let setSelectedOption:React.Dispatch<React.SetStateAction<any | null>>;
            
            selectedOption = optionListSelect[index];
            setSelectedOption = optionListSet[index];

            return (
            <Grid item sx={{
                display:'flex',
                alignItems: 'center',
                }}>
            <ListItem 
                key={item.text}
                sx={{display:'flex'}}>
                <ListItemText >
                <ListItemIcon color='#000'>{item.icon}</ListItemIcon>
                <Autocomplete
                disablePortal
                loading={item.load}
                color='neutral'
                id="combo-box-demo"
                options={item.tabla}
                getOptionLabel ={option => option.name}
                sx={{ minWidth: '250px', maxWidth: '80%', }}
                renderInput={(params) => {
                    return(
                        <TextField key={item.keyui} color='neutral' {...params} label={item.text} size='medium' 
                        InputProps={{ 
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {/* {loadingAPI ? <CircularProgress color="inherit" size={20} /> : null} */}
                            {item.load ? <Box sx={{ width: '100%' }}>
                                <LinearProgress color="inherit" />
                                </Box> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        )
                        }}/>
                    )
                }}
                onChange={(event, newValue) => setSelectedOption(newValue as newTipoDoc | newCategoria | newProDucto | newInversionista | null)}
                
                />
                </ListItemText>
            </ListItem>
            { selectedOption && <p>El ID seleccionado es actual: {selectedOption.id}</p> }
            </Grid>
            
            )}
        )}
    <p> / {selectedOption1?.id} / and / {selectedOption1?.name} / ◄☼► </p><br />
    <p> / {selectedOption2?.id} / and / {selectedOption2?.name} / ◄☼► </p><br />
    <p> / {selectedOption3?.id} / and / {selectedOption3?.name} / ◄☼► </p><br />
    <p> / {selectedOption4?.id} / and / {selectedOption4?.name} /  </p><br />
    </Grid>
)
};

