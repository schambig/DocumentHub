import React, { useState, useContext} from 'react';
import '../styles/CoreAppV1.css';
import {Box, Button, Container, Grid, Typography} from "@mui/material"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SelectionContext } from '../context/SelectionContext';
import {inVersionista, newInversionista} from '../assets/data_inversionistas'
import {proDucto, newProDucto} from '../assets/data_producto'
import {caTegoria, newCategoria} from '../assets/data_levantamiento'
import {tipoDoc, newTipoDoc} from '../assets/data_documento'
import {LinearProgress} from '@mui/material';
import { auto } from '@popperjs/core';
import {DocumentPreviewButton} from './VisualFile';
import {tDocumento} from '../assets/data_tDocumento';
import { stylesContainer2 } from '../common/dataComponent';

export const TableBusqueda: React.FunctionComponent<{}> = ():JSX.Element => {

//// importar 4 datos 
const { selectedOption1, selectedOption2, selectedOption3, selectedOption4 } = useContext(SelectionContext);
const [loadState, setLoadState] = useState<boolean>(true);


  interface Filtro {
    inversionista: newInversionista | null | inVersionista
    tipoDocumento: newProDucto | null | tipoDoc
    producto: newCategoria | null | proDucto
    categoria: newTipoDoc | null | caTegoria
  }

  interface Tabla {
    id: number | null
    nombreInversionista: string | null
    tipoDoc: string | null
    numDoc: string | null
    PEP: string | null
    codigoProducto: string | null
    nombreProducto: string | null
    descripcionCategoria: string | null
    tipoDocumento: string | null
    nombreFile: string | null
    userSubida: string | null
    fechaSubida: string | null
    uuiAws: string | null
    urlAwsUrl: string | null
  }

  const [tablaLoad, setTablaLoad] = useState<Tabla[]>([])

  let urlTablaDocumento = 'http://localhost:8000/api/documentos';
  let urlTablaInversionista = 'http://localhost:8000/api/inversionistas'; 
  let urlTablaTipoDocumento = 'http://localhost:8000/api/tipo-documentos';
  let urlTablaProducto = 'http://localhost:8000/api/productos';
  let urlTablaCategoria = 'http://localhost:8000/api/categorias';

  async function obtenerDato(fil: any, url: string): Promise<any> {
    if (fil !== null) {
      return fil;
    } else {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  }

  const LoadDataTable = (filtro:Filtro) => {
    setLoadState(true)
    const dataTable:Array<Tabla> = [];
    fetch(urlTablaDocumento)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok (tDocument)');
      }
      return res.json();
      })
      .then((data:tDocumento[]) => {
        let idnro = 1;
        if(filtro.inversionista) {
          data = data.filter(dato => dato.tablaInversionistaId === filtro.inversionista?.id);
        }
        if(filtro.tipoDocumento){
          data = data.filter(dato => dato.tablaTipoDocumentoId === filtro.tipoDocumento?.id);
        }
        if(filtro.producto){
          data = data.filter(dato => dato.tablaProductoId === filtro.producto?.id);
        }
        if(filtro.categoria){
          data = data.filter(dato => dato.tablaCategoriaId === filtro.categoria?.id);
        }
        data.forEach(async(element) => {
          const inversionistaE: inVersionista | newInversionista = await obtenerDato(filtro.inversionista, `${urlTablaInversionista}/${element.tablaInversionistaId}`);
          const productoE: proDucto | newProDucto = await obtenerDato(filtro.producto, `${urlTablaProducto}/${element.tablaProductoId}`);
          const categoriaE: caTegoria | newCategoria= await obtenerDato(filtro.categoria, `${urlTablaCategoria}/${element.tablaCategoriaId}`);
          const tipoDocumentoE: tipoDoc | newTipoDoc = await obtenerDato(filtro.tipoDocumento, `${urlTablaTipoDocumento}/${element.tablaTipoDocumentoId}`);
          
          const fechaString = element.fechaSubida;
          const fecha = new Date(fechaString);

          const dia = fecha.getDate().toString().padStart(2, '0');
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const anio = fecha.getFullYear();
          const hora = fecha.getHours().toString().padStart(2, '0');
          const minutos = fecha.getMinutes().toString().padStart(2, '0');
          const segundos = fecha.getSeconds().toString().padStart(2, '0');

          let fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;




          const tablaRow:Tabla = {
            id: idnro++,
            nombreInversionista: `${inversionistaE?.apPaterno || ''} ${inversionistaE?.apMaterno || ''}, ${inversionistaE?.nombres || ''}`,
            tipoDoc: inversionistaE.tipoIdentificacion,
            numDoc: inversionistaE.nroIdentificacion,
            PEP: inversionistaE.pep ? 'Si': 'No',
            codigoProducto: productoE.codProducto,
            nombreProducto: productoE.nombreProducto,
            descripcionCategoria: categoriaE.tipo,
            tipoDocumento: tipoDocumentoE.nombre,
            nombreFile: element.nombreFile,
            userSubida: element.userSubida,
            fechaSubida: fechaFormateada,
            uuiAws: element.uuidAws,
            urlAwsUrl: element.urlAws,
          }
          dataTable.push(tablaRow);
        })
      })
      .catch(error => {
        console.error('There was a problem with the network request:', error);
      });
    return dataTable;
  }

  /*
  ---- tabla inversionista ----
  id: incremental externo;
  nombreInversionista; apPat apMat, nombre
  tipoDoc; request(tabla tipo_documento -> id)
  numDoc;
  PEP;
  -----------------------------
  ---- tabla producto ---------
  codigo;
  nombre;
  -----------------------------
  ---- tabla categoria --------
  descripcion;
  -----------------------------
  ---- tabla tipo Documento ---
  tipo;
  -----------------------------
  ---- tabla documento --------
  nombreFile;
  userSubida; request(tabla usuarios -> id)
  userActualiza; request(tabla usuarios -> id)
  userDelete; request(tabla usuarios -> id)
  fechaSubida;
  fechaActualiza;
  fechaDelete;
  uuiAws;
  codAwsUrl;
  -----------------------------
  */

  const columns: GridColDef[] = [
    
    { 
      field: 'uuiAws',
      headerAlign: 'center', 
      headerName: 'URL', 
      align: 'center',
      width: 190,
      renderCell: (params) => (
          <DocumentPreviewButton documentUrl={params.value}/>   
      ),
    },
    { field: 'id', headerName: 'N°', flex:1,align: 'center',headerAlign: 'center'},
    { field: 'nombreFile', headerName: 'Archivo',width: 280,headerAlign: 'center'},
    { field: 'fechaSubida', headerName: 'Fecha', width: 220,align: 'center',headerAlign: 'center' },
    { field: 'tipoDocumento', headerName: 'Doc', width: 150,align: 'center',headerAlign: 'center'},
    { field: 'PEP', headerName: 'PEP', width: 80, align: 'center',headerAlign: 'center'},
    { field: 'tipoDoc', headerName: 'Id', width: 180, align: 'center',headerAlign: 'center'},
    { field: 'numDoc', headerName: 'Nro. Identidad', width: 180,align: 'center',headerAlign: 'center'},
    { field: 'nombreInversionista', headerName: 'Inversionista', width: 370,headerAlign: 'center'},
    { field: 'codigoProducto', headerName: 'Cod', width: 100,align: 'center',headerAlign: 'center'},
    { field: 'nombreProducto', headerName: 'Producto', width: 350,headerAlign: 'center'},
    { field: 'descripcionCategoria', headerName: 'Categoria', width: 210,align: 'center',headerAlign: 'center'},
  ];

  const filterButton:Filtro = {
    inversionista: selectedOption1,
    tipoDocumento: selectedOption2,
    producto: selectedOption3,
    categoria: selectedOption4
  }

  const rows = tablaLoad;
  const [showTable, setShowTable] = useState(false);
  setTimeout(() => {
    setLoadState(false);
  }, 1000);
  const handleShow = () => {
    setShowTable(false);
    setTablaLoad(LoadDataTable(filterButton));
    setShowTable(true);
  };

  const handleHide = () => {
    setShowTable(false);
  };


  return (
    <Container style={stylesContainer2}>
      <Grid sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Grid item sx={{
        display: 'block',
        width: 'inherit',
      }}>
        <Button onClick={handleShow} variant='contained' color='primary' sx={{mt:1, mb:1, width:'100%', }}  startIcon={<FilterAltOutlinedIcon style={{ fontSize: 35 }} />}>
          <Typography variant="h6" component="h2">
            Filtrar
          </Typography>
        </Button>
      </Grid>

      <Grid item sx={{
        display: 'block',
        width: 'inherit',
      }}>
      {showTable && !loadState && (
        <div>
          <div style={{ height: auto, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight={true}
              rowsPerPageOptions={[10]}
             // onSelectionModelChange={handleSelectionChange}
             // selectionModelMode='single'
              //ref={dataGridRef}
             // checkboxSelection
              sx={{
                mt: 1,
                p: 2,
                boxShadow: 20,
                border: 1,
                backgroundColor: '#f0f0f0',
                opacity: '1',
                borderColor: 'neutral.main',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
          <Button color='neutral' variant='outlined' onClick={handleHide}>Ocultar Tabla</Button>
        </div>
      )}
      {showTable && loadState && (
          <div>
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="inherit" />
            </Box>
          </div>
      )}
      </Grid>
      </Grid>
      {/* <DocumentPreviewButton documentUrl={
        'https://drive.google.com/file/d/1gbzc4j8ZgKtK4Av4c1Ey3l4QFUktkEel/view?usp=sharing'
      }/> */}
      {/* <h1 style={{ display:'flex' }}>TableBusqueda Component</h1>
      <h4>persona valor: {selectedOption1?.id}</h4>
      <h4>doc valor: {selectedOption2?.id}</h4>
      <h4>producto valor: {selectedOption3?.id}</h4>
      <h4>lev valor: {selectedOption4?.id}</h4> */}
    </Container>
    
  );
};