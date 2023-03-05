// import React, { useState } from 'react';
import React from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';

interface PropsDocUrl{
    documentUrl:string
}

export function DocumentPreviewButton({ documentUrl }:PropsDocUrl):JSX.Element {
  // const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // const handlePreviewClick = () => {
  //   setIsPreviewOpen(true);
  // };

  // const handleDownloadClick = () => {
  //   window.open(documentUrl, '_blank');
  // };

  // const handleDownload = async () => {
  //   const response = await fetch(`http://localhost:8000/api/files/download/${documentUrl}`);
  //   const blob = await response.blob();

  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = (response.status === 200 ? "":"");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // const handleDownloadClick = async () => {
  //   axios.get(`http://localhost:8000/api/files/download/${documentUrl}`)
  //   .then((response) => {
  //     if (response.status === 200){
  //       return response.data;
  //     }
  //   })
  //   .then((data)=>{
  //     window.open(data.url, '_blank');
  //   })
  // }

  // const downloadFile = async () => {
  //   axios.get(`http://localhost:8000/api/files/download/${documentUrl}`)
  //   .then((response) => {
  //     if (response.status === 200){
  //       return response.data;
  //     }
  //   })
  //   .then((data)=>{
  //     fetch(data.url)
  //      .then(response => response.blob())
  //      .then(blob => saveAs(blob));
  //   })
  // }
  
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
        window.open(data.url, '_blank');
      });
  }
  


  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handlePreviewClick}>
        Visualizar
      </Button> */}
      
      <Button variant="contained" color="secondary" onClick={downloadFile}>
        DESCARGAR
      </Button>
      
      <Button sx={{ml: '10px', mr:'10px'}}variant="contained" color="secondary" onClick={viewFile}>
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
