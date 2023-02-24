// import React, { useState, useContext, useRef } from 'react';
import React, { useState, useContext} from 'react';
import '../styles/CoreAppV1.css';
import {Box, Button, Container, Grid, Typography} from "@mui/material"
//import { NavBar } from '../common/NavBar';
//import { LatMenu } from '../components/LatMenu'
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


export const TableBusqueda: React.FunctionComponent<{}> = ():JSX.Element => {

//// importar 4 datos 
const { selectedOption1, selectedOption2, selectedOption3, selectedOption4 } = useContext(SelectionContext);
const [loadState, setLoadState] = useState<boolean>(true);
// const { setSelectedOption1, setSelectedOption2, setSelectedOption3, setSelectedOption4 } = useContext(SelectionContext);
//export default function AppBusqueda(){

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
    userActualiza: string | null
    userDelete: string | null
    fechaSubida: string | null
    fechaActualiza: string | null
    fechaDelete: string | null
    uuiAws: string | null
    codAwsUrl: string | null
  }

  interface tDocumentAPI{
    id: number
    nombreFile: string
    userSubida: number | null
    userActualiza: number | null
    userDelete: number | null
    fechaSubida: string | null
    fechaActualiza: string | null
    fechaDelete: string | null,
    uuiAws: string 
    codAwsUrl: string 
    idCategoria: number | null
    idProducto: number | null
    idInversionista: number | null
    idTipoDocumento: number
  }

  interface identificationAPI {
    id: number
    descripcion: string
  }

  interface userAPI{
    id: number
    idRol: number
    status: boolean
    nombreUser: string
    email: string
    password: string
  }

  const [tablaLoad, setTablaLoad] = useState<Tabla[]>([])

  let urlTablaDocumento = 'http://localhost:8000/tDocumento';
  let urlTablaInversionista = 'http://localhost:8000/tInversionista'; 
  let urlTablaTipoDocumento = 'http://localhost:8000/tTipoDocumento';
  let urlTablaProducto = 'http://localhost:8000/tProducto';
  let urlTablaCategoria = 'http://localhost:8000/tCategoria';
  let urlTablaTipoIdentificacion = 'http://localhost:8000/tTipoIdentificacion';
  let urlTablaUsuarios = 'http://localhost:8000/tUsuarios';

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
      .then((data:tDocumentAPI[]) => {
        let idnro = 1;
        if(filtro.inversionista) {
          data = data.filter(dato => dato.idInversionista === filtro.inversionista?.id);
        }
        if(filtro.tipoDocumento){
          data = data.filter(dato => dato.idTipoDocumento === filtro.tipoDocumento?.id);
        }
        if(filtro.producto){
          data = data.filter(dato => dato.idProducto === filtro.producto?.id);
        }
        if(filtro.categoria){
          data = data.filter(dato => dato.idCategoria === filtro.categoria?.id);
        }
        data.forEach(async(element) => {
          const inversionistaE: inVersionista | newInversionista = await obtenerDato(filtro.inversionista, `${urlTablaInversionista}/${element.idInversionista}`);
          const productoE: proDucto | newProDucto = await obtenerDato(filtro.producto, `${urlTablaProducto}/${element.idProducto}`);
          const categoriaE: caTegoria | newCategoria= await obtenerDato(filtro.categoria, `${urlTablaCategoria}/${element.idCategoria}`);
          const tipoDocumentoE: tipoDoc | newTipoDoc = await obtenerDato(filtro.tipoDocumento, `${urlTablaTipoDocumento}/${element.idTipoDocumento}`);
          const tipoIdentificacionE: identificationAPI = await obtenerDato(null, `${urlTablaTipoIdentificacion}/${inversionistaE.tipoDoc}`);
          const userSubidaE: userAPI = await obtenerDato(null, `${urlTablaUsuarios}/${element.userSubida}`);
          const userActualizaE: userAPI = await obtenerDato(null, `${urlTablaUsuarios}/${element.userActualiza}`);
          const userDeleteE: userAPI = await obtenerDato(null, `${urlTablaUsuarios}/${element.userDelete}`);

          const tablaRow:Tabla = {
            id: idnro++,
            nombreInversionista: `${inversionistaE?.apPat || ''} ${inversionistaE?.apMat || ''}, ${inversionistaE?.nombre || ''}`,
            tipoDoc: tipoIdentificacionE.descripcion,
            numDoc: inversionistaE.numDoc,
            PEP: inversionistaE.PEP ? 'Si': 'No',
            codigoProducto: productoE.codigo,
            nombreProducto: productoE.nombre,
            descripcionCategoria: categoriaE.descripcion,
            tipoDocumento: tipoDocumentoE.tipo,
            nombreFile: element.nombreFile,
            userSubida: userSubidaE.nombreUser,
            userActualiza: userActualizaE.nombreUser,
            userDelete: userDeleteE.nombreUser,
            fechaSubida: element.fechaSubida,
            fechaActualiza: element.fechaActualiza,
            fechaDelete: element.fechaDelete,
            uuiAws: element.uuiAws,
            codAwsUrl: element.codAwsUrl
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

  // const columns: GridColDef[] = [
    
    
  //   { field: 'id', headerName: 'Id', width: 50,},
  //   { field: 'tipoDoc', headerName: 'Tipo Ide', width: 90,},
  //   { field: 'numDoc', headerName: 'Nro. Identidad', width: 140,},
  //   { field: 'nombreInversionista', headerName: 'Inversionista', width: 320,},
  //   { field: 'PEP', headerName: 'PEP', width: 50,},
  //   { field: 'codigoProducto', headerName: 'Cod', width: 70,},
  //   { field: 'nombreProducto', headerName: 'Producto', width: 320,},
  //   { field: 'descripcionCategoria', headerName: 'Categoria', width: 150,},
  //   { field: 'tipoDocumento', headerName: 'Tipo Doc', width: 100,},
  //   { field: 'nombreFile', headerName: 'Archivo', width: 140,},
  //   { field: 'codAwsUrl', headerName: 'URL', width: 100,},
    
  // ];


  // const [urlData, setUrlData] = useState<String>('')
  // version Render Boton
  const columns: GridColDef[] = [
    
    
    { 
      field: 'codAwsUrl',
      headerAlign: 'center', 
      headerName: 'URL', 
      align: 'center',
      width: 120,
      renderCell: (params) => (
        <DocumentPreviewButton documentUrl={params.value}/>
      ),
    },
    { field: 'id', headerName: 'N°', flex:1,align: 'center',headerAlign: 'center'},
    { field: 'nombreFile', headerName: 'Archivo',width: 200,headerAlign: 'center'},
    { field: 'tipoDocumento', headerName: 'Doc', width: 100,align: 'center',headerAlign: 'center'},
    { field: 'PEP', headerName: 'PEP', width: 50, align: 'center',headerAlign: 'center'},
    { field: 'tipoDoc', headerName: 'Id', width: 90, align: 'center',headerAlign: 'center'},
    { field: 'numDoc', headerName: 'Nro. Identidad', width: 140,align: 'center',headerAlign: 'center'},
    { field: 'nombreInversionista', headerName: 'Inversionista', width: 320,headerAlign: 'center'},
    { field: 'codigoProducto', headerName: 'Cod', width: 70,align: 'center',headerAlign: 'center'},
    { field: 'nombreProducto', headerName: 'Producto', width: 290,headerAlign: 'center'},
    { field: 'descripcionCategoria', headerName: 'Categoria', width: 150,align: 'center',headerAlign: 'center'},
    
  ];

// const dataGridRef = useRef(null);

// interface SelectionObject {
//   selectionModel: Tabla[];
//   lastSelection: Tabla;
//   selectionModelUpdate: unknown;
//   rows: Tabla[];
// }

// function handleSelectionChange(newSelection:any) {
//   const selectedRow = newSelection.rows[0];
//   const rowData = dataGridRef.current?.getRow(selectedRow) as Tabla;
//   console.log(rowData);
// }





    // { 
    //   field: 'codAwsUrl', 
    //   headerName: 'URL', 
    //   width: 150,
    //   renderCell: (params) => (
    //     <Button variant="contained" color="primary" onClick={() => window.open(params.value)}>
    //       {params.value} Descargar
    //     </Button>
    //   ),
    // },



  // {
  //   field: 'nombre_completo',
  //   headerName: 'Nombre Completo',
  //   width: 260,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.apPat || ''} ${params.row.apMat || ''}, ${params.row.apMat || ''}`,
  // },
  
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
    <Container>
      <Grid sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Grid item sx={{
        display: 'block',
        width: 'inherit',
      }}>
        <Button onClick={handleShow} variant='contained' color='primary' sx={{mt:1, mb:1, width:'100%'}}  startIcon={<FilterAltOutlinedIcon />}>
        <Typography variant="h5" component="h2">Filtrar</Typography>
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
                boxShadow: 2,
                border: 2,
                backgroundColor: '#ffffff',
                opacity: '1',
                borderColor: 'neutral.main',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
          <Button onClick={handleHide}>Ocultar Tabla</Button>
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
      <DocumentPreviewButton documentUrl={
        'https://drive.google.com/file/d/1gbzc4j8ZgKtK4Av4c1Ey3l4QFUktkEel/view?usp=sharing'
      }/>
      <h1 style={{ display:'flex' }}>TableBusqueda Component</h1>
      <h4>persona valor: {selectedOption1?.id}</h4>
      <h4>doc valor: {selectedOption2?.id}</h4>
      <h4>producto valor: {selectedOption3?.id}</h4>
      <h4>lev valor: {selectedOption4?.id}</h4>
    </Container>
    
  );
};