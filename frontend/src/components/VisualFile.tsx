// import React, { useState } from 'react';
import React from 'react';
import {Button} from '@mui/material';

interface PropsDocUrl{
    documentUrl:string
}

export function DocumentPreviewButton({ documentUrl }:PropsDocUrl):JSX.Element {
  // const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // const handlePreviewClick = () => {
  //   setIsPreviewOpen(true);
  // };

  const handleDownloadClick = () => {
    window.open(documentUrl, '_blank');
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handlePreviewClick}>
        Visualizar
      </Button> */}
      <Button variant="contained" color="secondary" onClick={handleDownloadClick}>
        Descargar
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
