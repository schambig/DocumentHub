import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectAclCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from "../config.aws";
import fs from "fs";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

export const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY
  }
})

export async function uploadFile(file: any, cod:string) {
  // const stream = fs.createReadStream(file.tempFilePath)
  const stream = file.data;
  const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: cod,
      Body: stream,
      ContentType: file.mimetype,
      Metadata: {originalName: file.name,}
  }
  const command = new PutObjectCommand(uploadParams)
  return await client.send(command)
}

export async function getFiles() {
  const command = new ListObjectsCommand({
      Bucket: AWS_BUCKET_NAME
  })
  return await client.send(command)
}

// export interface FileResponse {
//   contentType: string | undefined;
//   content: string | undefined;
//   originalName: string | undefined;
//   metadata: { [key: string]: string } | undefined;
// }

// export async function getFile(filename: string): Promise<FileResponse> {
//   const command = new GetObjectCommand({
//     Bucket: AWS_BUCKET_NAME,
//     Key: filename,
//   });
//   const result = await client.send(command);
//   const fileContent = result.Body?.toString("base64");
//   const response: FileResponse = {
//     contentType: result.ContentType,
//     content: fileContent,
//     originalName: result.Metadata?.originalName,
//     metadata: result.Metadata,
//   };
//   return response;
// }

export async function getFile(filename:string) {
  const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename
  })
  return await client.send(command)
}


// export async function getFile(filename:string) {
//   const command = new GetObjectCommand({
//       Bucket: AWS_BUCKET_NAME,
//       Key: filename
//   })
//   const result = await client.send(command)
//   const fileContent = result.Body?.toString()
//   const response = {
//     contentType: result.ContentType,
//     content: fileContent,
//     originalName: result.Metadata?.originalName
//   }
//   return response
// }

// export async function downloadFile(filename:string) {
//   const command = new GetObjectCommand({
//       Bucket: AWS_BUCKET_NAME,
//       Key: filename
//   })
//   const result = await client.send(command)
//   console.log(result)
//   result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
// }

// export async function getFileURL(filename:string) {
//   const command = new GetObjectCommand({
//       Bucket: AWS_BUCKET_NAME,
//       Key: filename
//   })
//   return await getSignedUrl(client, command, { expiresIn: 60 })
// }

export async function getFileURL(filename:string, originalName:string) {
  const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename
  })
  const options = {
    expiresIn: 300,
    responseContentDisposition: `inline; filename="${originalName}"`
  };
  return await getSignedUrl(client, command, options);
}