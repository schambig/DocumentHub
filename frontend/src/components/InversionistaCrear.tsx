import React, { useContext, useEffect, useState , Fragment} from 'react';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {SelectionContext} from '../context/SelectionContext';
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {LoadingButton} from '@mui/lab';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SaveIcon from '@mui/icons-material/Save';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {inVersionista,inVerSTR ,DocIdent,newInversionista,convertirInver,converInverM} from '../assets/data_inversionistas';

export const InversionistaCrear:React.FC<{}> = ():JSX.Element => {

    interface LoadSave{
        status:boolean
        respSuccess: boolean
        respError: boolean
        color: string
    }
    // const [apiInversionista, setApiInversionista] = useState<newInversionista[]| null>(null)
    const [currentToastId, setCurrentToastId] = useState<any | undefined>(undefined);
    const [loadSave, setLoadSave] = useState<LoadSave>({status:false, respSuccess:false, respError:false, color:'primary' });
    // const [invers, setInvers] = useState<inVersionista[]>([]);
    const [tipoIDE, setTipoIDE] = useState<DocIdent | null>();
    const [selectedInver, setSelectedInver] = useState<any | null>({
        id: '',
        nombres: '',
        apPaterno: '',
        apMaterno: '',
        tipoIdentificacion: '',
        nroIdentificacion: '',
        pep: false,
    });

    interface Cinver{
        id: string,
        nombres: string,
        apPaterno: string,
        apMaterno: string,
        tipoIdentificacion: string,
        nroIdentificacion: string,
        pep: boolean,
        [key: string]: any;
    }
    const {refresh, setRefresh} = useContext(SelectionContext);
    const [statusCheckbox, setStatusCheckbox] = useState(false);
    const [inverData, setInverData] = useState<Cinver | inVersionista>({
        id: '',
        nombres: '',
        apPaterno: '',
        apMaterno: '',
        tipoIdentificacion: '',
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

    const handleChangeIDE = (event:any) => {
        setTipoIDE(event.target.value as DocIdent);
        setInverData({
          ...inverData,
          [event.target.name]: event.target.value,
        });
      };

    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "checkbox") {
            setStatusCheckbox(event.target.checked);
            setInverData({
                ...inverData,
                [event.target.name]: event.target.checked,
            }); 
          } else {
            setInverData({
                ...inverData,
                [event.target.name]: event.target.value,
            }); 
          }
    };

    const handleSave = async():Promise<void> => {
      setLoadSave({...loadSave , status:true})
      if ((inverData.nombres === '' || inverData.apPaterno === '' || inverData.apMaterno === '' || inverData.nroIdentificacion === '')){
        setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
        setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
        const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
        setCurrentToastId(toastId);
        return console.log("Error push Data");
        
      }else if((inverData.nombres === null || inverData.apPaterno === null || inverData.apMaterno === null || inverData.tipoIdentificacion === null || inverData.nroIdentificacion === null)){
        setLoadSave({...loadSave ,status:false, respError:true, color:'error'  })
        setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},1500)
        const toastId = toast.error('Completar la informacion', { autoClose: 1500, toastId: currentToastId });
        setCurrentToastId(toastId);
        return console.log("Error push Data null");
  
      }else{
      setTimeout(() => {
        axios.post(`http://localhost:8000/api/inversionistas`, {
            ...inverData,
            pep: statusCheckbox,
        })
          .then(response => {
            setRefresh(!refresh);
            if (response.status === 201){
              setLoadSave({...loadSave ,status:false ,respSuccess:true, color:'success' })
              setTimeout(() => {setLoadSave({...loadSave , respSuccess:false, color:'primary' })},2000)
              const toastId = toast.success('Usuario actualizado con exito', { autoClose: 2000, toastId: currentToastId });
              setCurrentToastId(toastId);
            }else{
              setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
              setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},2000)
              const toastId = toast.error('Posible falla', { autoClose: 2000, toastId: currentToastId });
              setCurrentToastId(toastId);
            }
            console.log('Respuesta del servidor:', response);
          })
          .catch(error => {
            setLoadSave({...loadSave ,status:false, respError:true, color:'error' })
            setTimeout(() => {setLoadSave({...loadSave , respError:false, color:'primary' })},2000)
            if (error.response.status === 500){
              const toastId = toast.error("Error al actualizar, correo ya existente", { autoClose: 2000, toastId: currentToastId });
              console.log('Respuesta del servidor ___>:', error);
              setCurrentToastId(toastId);
            } else if (error.response.status === 404){
              const toastId = toast.error('Sin Conexion a DataBase', { autoClose: 2000, toastId: currentToastId });
              setCurrentToastId(toastId);
            } else {
              const toastId = toast.error('Sin Conexion', { autoClose: 2000, toastId: currentToastId });
              setCurrentToastId(toastId);
              return console.error('Error al enviar datos:', error);
            }
            
          })
        },1000)
      }
  
    };


    let fields:JSX.Element[] = [];

    if (selectedInver){
        const keys = Object.keys(selectedInver);
        fields = keys.map((key:string) => (
            key === 'pep' ? (
                <Grid item xs={5} sm={5} md={2} lg={2} key={key}>
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
                <></>
             ) : (
            
            key === 'tipoIdentificacion' ? (
                <Grid item xs={10} sm={10} md={3} lg={3}>
                <FormControl fullWidth color='neutral'>
                    <InputLabel sx={{}} id="demo-simple-select-label"  >Tipo Identificación</InputLabel>
                    <Select
                    sx={{width:'100%'}}
                    labelId="demo-simple-select-label"
                    name={key}
                    id="demo-simple-select"
                    value={tipoIDE}
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
              <Grid item xs={10} sm={10} md={3.5} lg={3.5} key={key}>
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
            <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} container spacing={2}>
            {
              fields
            }

            <Grid item xs={5} sm={5} md={2} lg={2}>
              <LoadingButton
              sx={{height:'100%', width:'100%'}}
              loading={loadSave?.status ? loadSave.status : false}
              loadingPosition="start"
              startIcon={loadSave.respError ? <ErrorOutlineIcon style={{fontSize: '40px'}}/>: (loadSave.respSuccess ? <PublishedWithChangesIcon style={{fontSize: '40px'}}/>: (<SaveIcon style={{fontSize: '40px'}}/>))}
              variant="contained"
              color={loadSave.color === 'primary' || loadSave.color === 'error' || loadSave.color === 'success' ? loadSave.color : 'primary'}
              onClick={handleSave}
              size="large"
              >
                {loadSave.respError ? "Error": (loadSave.respSuccess ? "Éxito": ("Crear"))}
              </LoadingButton>
              <ToastContainer/>
            </Grid>

            </Grid>
            
            {/* <p>{inverData.id}</p>
            <p>{inverData.nombres}</p>
            <p>{inverData.apPaterno}</p>
            <p>{inverData.apMaterno}</p>
            <p>{inverData.tipoIdentificacion}</p>
            <p>{inverData.nroIdentificacion}</p>
            <p>{inverData.pep ? "PEP: SI" : "PEP: NO"}</p>
            <p>{statusCheckbox ? "Status:SI":"Status:NO"}</p> */}

        </div>
    );
}

export {}