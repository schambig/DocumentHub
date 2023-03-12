import React, { useContext, useEffect, useState , Fragment} from 'react';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {SelectionContext} from '../context/SelectionContext';
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {LoadingButton} from '@mui/lab';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {inVersionista,inVerSTR ,DocIdent,newInversionista,convertirInver,converInverM} from '../assets/data_inversionistas';

export const InversionistaEditor:React.FC<{}> = ():JSX.Element => {

    interface LoadSave{
        status:boolean
        respSuccess: boolean
        respError: boolean
        color: string
    }
    // const [apiInversionista, setApiInversionista] = useState<newInversionista[]| null>(null)
    const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
    const [loadSave, setLoadSave] = useState<LoadSave>({status:false, respSuccess:false, respError:false, color:'primary' });
    const [invers, setInvers] = useState<inVersionista[]>([]);
    const [selectedInver, setSelectedInver] = useState<inVersionista | null>(null);
    const {refresh, setRefresh} = useContext(SelectionContext);
    const [tipoIDE, setTipoIDE] = useState<DocIdent | null>();
    const [inverData, setInverData] = useState<inVersionista>({
        id: '',
        nombres: '',
        apPaterno: '',
        apMaterno: '',
        tipoIdentificacion: DocIdent.DNI,
        nroIdentificacion: '',
        pep: false,
    });
    
    const inverSTR:inVerSTR = {
      id: 'ID',
      nombres: 'Nombres',
      apPaterno: 'Apellido Paterno',
      apMaterno: 'Apellido Materno',
      tipoIdentificacion: 'Tipo Identificación',
      nroIdentificacion: 'Número Identificación',
      pep: 'PEP',
    };
    const [statusCheckbox, setStatusCheckbox] = useState(false);

    const handleChangeIDE = (event:any) => {
      setTipoIDE(event.target.value as DocIdent);
      setInverData({
        ...inverData,
        [event.target.name]: event.target.value,
      });
    };

    useEffect(() => {
        fetch("http://localhost:8000/api/inversionistas")
        .then((response) => response.json())
        .then((data) => {
          setInvers(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [refresh]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "checkbox") {
            setStatusCheckbox(event.target.checked);
          } else {
            setInverData({
                ...inverData,
                [event.target.name]: event.target.value,
            }); 
          }
        
        
    };

    let fields:JSX.Element[] = [];

    if (selectedInver){
        const keys = Object.keys(selectedInver);
        fields = keys.map((key:string) => (
            key === 'pep' ? (
                <Grid item xs={5} sm={5} md={5} lg={2} key={key}>
                  <FormControlLabel
                    sx={{ width: '100%'}}
                    control={
                      <Checkbox
                        color='neutral'
                        checked={statusCheckbox}
                        onChange={handleChange}
                        name="statusCheckbox"
                      />
                    }
                    label={statusCheckbox ? "PEP: (Si)": "PEP: (No)"}
                  />
                </Grid>
              ) : (
            key === 'id' ? (
                <Grid item xs={10} sm={10} md={10} lg={4} key={key}>
                  <TextField
                    sx={{ width: '100%' }}
                    name={key}
                    label={inverSTR[key]}
                    value={inverData[key]}
                    onChange={handleChange}
                    type="text"
                    color="neutral"
                    disabled
                  />
                </Grid>
             ) : (
              key === 'tipoIdentificacion' ? (
                <Grid item xs={10} sm={10} md={4} lg={4}>
                <FormControl fullWidth color='neutral'>
                    <InputLabel sx={{}} id="demo-simple-select-label"  >Tipo Identificación</InputLabel>
                    <Select
                    sx={{width:'100%'}}
                    labelId="demo-simple-select-label"
                    name={key}
                    id="demo-simple-select"
                    value={inverData[key]}
                    label={inverSTR[key]}
                    onChange={handleChangeIDE}
                    >
                    <MenuItem value={DocIdent.DNI}>DNI</MenuItem>
                    <MenuItem value={DocIdent.CARNETEXTRANJERIA}>Carnet Extranjeria</MenuItem>
                    <MenuItem value={DocIdent.PASAPORTE}>Pasaporte</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

            ) : (
              <Grid item xs={10} sm={10} md={4} lg={4} key={key}>
              <TextField
                sx={{ width: '100%' }}
                name={key}
                label={inverSTR[key]}
                value={inverData[key]}
                onChange={handleChange}
                type="text"
                color="neutral"
              />
              </Grid>
            )
             ) )
        ))
    }


    return (
        <div>
            <Autocomplete
                sx={{m: '25px 0px'}}
                id="invers-select"
                color='neutral'
                options={invers}
                getOptionLabel={(inver) => (`${inver.nroIdentificacion} ► ${inver.apPaterno} ${inver.apMaterno} ${inver.nombres}`)}
                onChange={(event, newValue) => {
                    setSelectedInver(newValue);
                    if (newValue) {
                        setInverData({...newValue});
                        setStatusCheckbox(newValue.pep);
                    } else {
                        setInverData({
                            id: '',
                            nombres: '',
                            apPaterno: '',
                            apMaterno: '',
                            tipoIdentificacion: DocIdent.DNI,
                            nroIdentificacion: '',
                            pep: false,
                        });
                    }
                }}
                renderInput={(params) => (
                <TextField {...params} label="Seleccionar inversionista" color='neutral' variant="outlined" />
                )}
            />
            <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            {selectedInver && fields.length > 0 &&
              fields
            }


            { selectedInver && fields.length > 0 &&
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <LoadingButton
              sx={{height:'100%', width:'100%'}}
              loading={loadSave?.status ? loadSave.status : false}
              loadingPosition="start"
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize: '40px'}}/>: (loadSave.respSuccess ? <PublishedWithChangesIcon style={{fontSize: '40px'}}/>: (<SyncIcon style={{fontSize: '40px'}}/>))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              // onClick={handleSave}
              size="large"
              >
                {loadSave.respError ? "Error": (loadSave.respSuccess ? "Éxito": ("Actualizar"))}
              </LoadingButton>
              <ToastContainer/>
            </Grid>
            }



            </Grid>

            <p>{inverData.id}</p>
            <p>{inverData.nombres}</p>
            <p>{inverData.apPaterno}</p>
            <p>{inverData.apMaterno}</p>
            <p>{inverData.tipoIdentificacion}</p>
            <p>{inverData.nroIdentificacion}</p>
            <p>{inverData.pep ? "PEP: SI" : "PEP: NO"}</p>
            <p><p>{statusCheckbox ? "Status:SI":"Status:NO"}</p></p>
        </div>
    );
}

export {}