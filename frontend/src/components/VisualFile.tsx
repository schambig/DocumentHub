// import React, { useState } from 'react';
import React from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

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
                  .then(blob => saveAs(blob, data.name));
              });
          }

  const viewFile = async () => {
    axios.get(`http://localhost:8000/api/files/download/${documentUrl}`)
    .then((response) => {
      if (response.status === 200) {
      return response.data;
    }
  })
  .then((data) => {
    window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(data.url)}&embedded=true`, '_blank');
  });
  }
  


  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handlePreviewClick}>
        Visualizar
      </Button> */}
      
      <Button key='down' variant="contained" color="secondary" onClick={downloadFile}>
        DESCARGAR
      </Button>
      
      <Button key='view' sx={{ml: '10px', mr:'10px'}}variant="contained" color="secondary" onClick={viewFile}>
        VER
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
