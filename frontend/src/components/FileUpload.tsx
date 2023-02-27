import React, {useContext, useState}from 'react';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import './Fileupload.css'
//import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { red } from '@mui/material/colors';
import { Button, Grid, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import BackspaceIcon from '@mui/icons-material/Backspace';
//import { start } from 'repl';
import { SelectionContext } from '../context/SelectionContext';
//import { margin, palette } from '@mui/system';
import { themePalette } from '../config/theme.condig';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { motion , AnimatePresence } from "framer-motion";
import { newTipoDoc } from '../assets/data_documento';
import { newInversionista } from '../assets/data_inversionistas';
import { newProDucto } from '../assets/data_producto';
import axios from 'axios';



const UploadFiles: React.FC = () => {
  
  const [dataFile, setDataFile] = useState<File | null>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    if (isDisabled) {
      event.preventDefault();
    }else{
      if (acceptedFiles.length !== 1){
        console.log('Error no upload');
      }else{
        setDataFile(acceptedFiles[0]);
        !dataFile ? setIsDisabled(true) : setIsDisabled(false);
        console.log(acceptedFiles);
        console.log(acceptedFiles[0].name);
        console.log(acceptedFiles[0].size);
        console.log(acceptedFiles[0].type);
      }
    }
  };
  

  const Borrar = () => {
    setIsDisabled(false)
    setDataFile(null)
  }
  
  const { selectedOption1, selectedOption2, selectedOption3, selectedOption4 } = useContext(SelectionContext);
  const { setSelectedOption1, setSelectedOption3, setSelectedOption4} = useContext(SelectionContext)


  const initialTransition = {
    duration: 1,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
  };
  
  const exitTransition = {
    duration: 0.50,
    delay:0,
    ease: [0, 0.71, 0.2, 1.01]
  };
  
// pasar la variable (selectedOption2)
const handleDisableInversionista = (objD:newTipoDoc|null) => {
  // verificar que TipoDoc este seleccionado
  // para habilitar el campo Inversionista
  if(objD){
      return false;
  }else{
      setSelectedOption1(null);
      // setIsAutocomplete1Enabled(false);
      //value cambiar por ternaria en el mismo value....
      // true enviar a value ► null
      return true;
  }
}

// pasar la variable (selectedOption1,selectedOption2)
const handleDisableProducto = (objInv:newInversionista|null, objDoc:newTipoDoc|null) => {
  // verificar que Inversionista este seleccionado
  // para habilitar el campo producto
  if(objInv && objDoc && (objDoc.nombre !== 'Ficha Cliente' )){
      return false;
  }else{
      setSelectedOption3(null);
      //value cambiar por ternaria en el mismo value....
      // true enviar a value ► null
      return true;
  }
}

// pasar la variable (selectedOption3)
const handleDisableCategoria = (objPro:newProDucto | null) => {
  // verificar que Inversionista este seleccionado
  // para habilitar el campo producto
  if(objPro){
      return false;
  }else{
      setSelectedOption4(null);
      //value cambiar por ternaria en el mismo value....
      // true enviar a value ► null
      return true;
  }
}

function verifyData(){
  const fileData = (dataFile !== null) ? true : false;
  const documentoComplete = selectedOption2 ? true : false;
  const inversionistaComplete = ((!handleDisableInversionista(selectedOption2) && selectedOption1)||handleDisableInversionista(selectedOption2)) ? true : false;
  const productoComplete = ((!handleDisableProducto(selectedOption1,selectedOption2) && selectedOption3)||handleDisableProducto(selectedOption1,selectedOption2)) ? true : false;
  const categoriaComplete = ((!handleDisableCategoria(selectedOption3) && selectedOption4)||handleDisableCategoria(selectedOption3)) ? true : false;
  // Agrega más variables según la cantidad de Autocomplete que tengas

  if (documentoComplete && inversionistaComplete && productoComplete && categoriaComplete && fileData) {
    // Ejecutar la acción que deseas si todos los Autocomplete están habilitados y tienen valores seleccionados
    return true;
  } else {
    // Mostrar un mensaje de error o realizar otra acción si no todos los Autocomplete están habilitados o tienen valores seleccionados
    return false;
  }
}


  function errorButtonHandler() {
    // Realiza alguna accion si no completa los campos necesarios
    console.log("button desactivado --- error")
  }

  function successButtonHandler() {
    // Realiza alguna accion si completa correctamente
    if (dataFile) {
      // variable verificada cargada
      const file = dataFile;
      const formData = new FormData();
      // variable lista
      const data = {
        documentoLoad:selectedOption2,
        inversionistaLoad:selectedOption1,
        productoLoad:selectedOption3,
        categoriaLoad:selectedOption4,
      };
      // agregar al formData
      formData.append('file', file);
      formData.append('data', JSON.stringify(data));
      
      // enviar el formData a la ruta especifica de la API
      axios.post('/url-de-la-api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          // ver la url que devuelve el S3
          // o todo la fila del nuevo elemento de la tabla documento
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("button activado --- success")
    }

  }


  return (
    <Grid container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      }}>
      
      <Grid item sx={{display: 'flex'}}>
      <AnimatePresence>
      { 1 && <motion.div
      layout
      key='hijo1'
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={!isDisabled ? exitTransition : initialTransition} 
      id='filedrop'>
    
      <Dropzone onDrop={onDrop} disabled={isDisabled} onDragOver={event => {
        if (isDisabled) {
        event.preventDefault();
        }
      }}>
        {({ getRootProps, getInputProps }) => (
          <section id='secdrop'>
            <div id='dentro' {...getRootProps()}>
            <AnimatePresence>
                {
                  !isDisabled ? (
                  <motion.div 
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={isDisabled ? exitTransition : initialTransition}>
                  <UploadFileIcon key='upload' sx={{
                    bg: red[500],
                   // height: '100px',
                    fontSize: '200px',
                    borderStyle: dataFile ? 'groove' : 'dashed',
                    borderColor: dataFile ? themePalette.NARANJACORE : '', 
                    borderWidth: dataFile ? '3px' : '3px',
                  }} />
                  </motion.div>) : (
                  <motion.div 
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={!isDisabled ? exitTransition : initialTransition}>
                  <CheckCircleOutlineOutlinedIcon sx={{
                    bg: red[500],
                   // height: '100px',
                    fontSize: '200px',
                    borderStyle: dataFile ? 'groove' : 'dashed',
                    borderColor: dataFile ? themePalette.NARANJACORE : '', 
                    borderWidth: dataFile ? '3px' : '3px',}}/>
                    </motion.div>)
                    
                }
              </AnimatePresence>
              
              <input key='inputs' {...getInputProps()} disabled={isDisabled} />
            </div>
          </section>
        )}
      </Dropzone>
      </motion.div>          
      }
      </AnimatePresence>
      </Grid>
      
      <Grid item sx={{display: 'flex'}}>
        {/* establecer logica para el boton solo permita la data  */}
      <Button variant='contained'
        onClick={verifyData() ? successButtonHandler : errorButtonHandler}
        sx={{
          display: 'flex'
        }}> 
        <Typography sx={{display: 'flex', m: '0em 0.2em 0em 0.2em'}} variant='h6' component={'h6'}> 
          Subir archivo 
        </Typography> 
        <UploadIcon sx={{
                display: 'flex',
                bg: red[500],
               // height: '100px',
                fontSize: '2em',
                borderStyle: 'none',
                m: '0em 0em 0em 0.2em', 
              }} />
      </Button>
      </Grid>

      {
        dataFile && 
        <Grid item sx={{
          display: 'flex',
          margin: '1em',
          }}> 
        <Typography 
          variant='h6' component={'h6'}
          sx={{
            display: 'block',
            m: '0em 1em',
            }}> 
          File Listo: {dataFile.name} 
        </Typography> 
        <BackspaceIcon onClick={() => Borrar() } 
          sx={{
                display: 'block',
                bg: red[500],
                fontSize: '2em',
                borderStyle: 'none',
              }} />
        </Grid>
      }
      <Grid item sx={{display: 'flex'}}>
      <h3>persona valor: {selectedOption1?.id}</h3>
      <h3>doc valor: {selectedOption2?.id}</h3>
      <h3>producto valor: {selectedOption3?.id}</h3>
      <h3>lev valor: {selectedOption4?.id}</h3>
      
      </Grid>
      <h1>Fileupload Component</h1>
    </Grid>
  );
};

export default UploadFiles;