import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import fileUpload from 'express-fileupload';
import AWS from 'aws-sdk';


// importar variables de entorno
// uuidv4

 const app = express();

// Configurar cliente S3 de AWS
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

// Configuración del middleware express-fileupload
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Limitamos el tamaño máximo del archivo a 50MB
}));

// Ruta para procesar la carga de archivos
app.post('/uploadfile', async (req, res) => {
  try {
    // Obtenemos el archivo subido
    const file = req.files?.file;

    // Verificamos si hay un archivo
    if (!file) {
      return res.status(400).send('No se ha enviado ningún archivo.');
    }

    // Creamos un objeto S3
    const s3 = new AWS.S3({
      accessKeyId: 'TU_ACCESS_KEY_ID',
      secretAccessKey: 'TU_SECRET_ACCESS_KEY',
    });



    // Generamos un nombre único para el archivo en S3
    const fileName = `${uuidv4()}-${file.name}`;
// // ------------------------------------------------------------
//     // Configuramos los parámetros para subir el archivo a S3
//     const params = {
//       Bucket: 'NOMBRE_DE_TU_BUCKET',
//       Key: fileName,
//       Body: file.data,
//       ACL: 'public-read', // Hacemos el archivo público para poder descargarlo
//     };
// // ------------------------------------------------------------
// // ------------------------------------------------------------
//     // Subir archivo a S3 con metadato personalizado "originalName"
//     const params = {
//       Bucket: process.env.S3_BUCKET_NAME!,
//       Key: fileName,
//       Body: file.data,
//       ContentType: file.mimetype,
//       Metadata: {originalName: file.name,},
//     };
// // ------------------------------------------------------------
// ------------------------------------------------------------
    // Subir archivo a S3 con metadato personalizado "originalName"
    const params = {
      Bucket: 'NOMBRE_DE_TU_BUCKET',
      Key: fileName,
      Body: file.data,
      ContentType: file.mimetype,
      Metadata: {originalName: file.name,},
    };
// ------------------------------------------------------------


    // Subimos el archivo a S3
    const response = await s3.upload(params).promise();

    // Devolvemos la URL de descarga del archivo subido
    return res.status(200).json({ url: response.Location });

  } catch (err) {
    console.error(err);
    return res.status(500).send('Ha ocurrido un error al procesar la solicitud.');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
// -------- mismo nombre ---------------------


// Ruta para subir archivo y obtener URL de descarga desde S3
app.post('/upload', async (req, res) => {
  try {

   
    const s3Response = await s3.upload(params).promise();
    const downloadUrl = s3Response.Location;
    res.send({ url: downloadUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error al subir archivo a S3' });
  }
});

// Ruta para descargar archivo desde S3
app.get('/download/:key', async (req, res) => {
  try {
    const key = req.params.key;
    
		// Obtener objeto de S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    };
    const s3Object = await s3.getObject(params).promise();
    
		// Obtener nombre original del archivo a partir del metadato personalizado
    const originalName = s3Object.Metadata.originalname;
    
		// Asignar nombre original al archivo descargado
    res.attachment(originalName);
    
		// Enviar archivo al cliente
    res.send(s3Object.Body);
  } catch (err) { console.error(err); 
    res.status(500).send({ error: 'Error al descargar archivo desde S3' });
  }
});
app.listen(3000, () => {console.log('Servidor iniciado en puerto 3000');});
