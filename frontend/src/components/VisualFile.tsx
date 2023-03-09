// import React, { useState } from 'react';
import React from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadingIcon from '@mui/icons-material/Downloading';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface PropsDocUrl{
    documentUrl:string
}

export function DocumentPreviewButton({ documentUrl }:PropsDocUrl):JSX.Element {
 
  const downloadFile = async () => {
      axios.get(`http://localhost:8000/api/files/download/${documentUrl}`)
        .then((response) => {
            if (response.status === 200) {
        
                return response.data;
              }
        })
        .then((data) => {
            fetch(data.url)
              .then(response => response.blob())
              .then(blob => saveAs(blob, data.name))
              .catch((error:any)=>{
                console.log(error);
              });
          })
        .catch((error:any)=>{
          console.log(error);
        });
  }

  const viewFile = async () => {
    axios.get(`http://localhost:8000/api/files/download/${documentUrl}`)
    .then((response) => {
      if (response.status === 200) {
      return response.data;
      }
    })
    .then((data:any) => {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(data.url)}&embedded=true`, '_blank');
    })
    .catch((error:any)=>{
      console.log(error);
    })
  }
  


  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handlePreviewClick}>
        Visualizar
      </Button> */}
      
      <Button 
        key='down'
        variant="outlined" 
        color="neutral" 
        onClick={downloadFile}>
        {/* DESCARGAR */}
        {/* <DownloadIcon /> */}
        <FileDownloadOutlinedIcon />
        {/* <DownloadingIcon /> */}
      </Button>
      
      <Button 
        key='view' 
        sx={{ml: '10px', mr:'0px'}}
        variant="outlined"  
        color="neutral" 
        onClick={viewFile}>
        {/* VER */}
        {/* <VisibilityIcon /> */}
        {/* <PreviewIcon /> */}
        <VisibilityOutlinedIcon />
      </Button>
    
      {/* {isPreviewOpen && (
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
          title="Vista previa del documento"
          width="80%"
          height="500px"
        />
      )} */}
    </div>
  );
}
