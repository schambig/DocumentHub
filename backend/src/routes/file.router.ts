import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

import * as FileService from "../services/file.service";

export const fileRouter = express.Router();

// POST: Upload a file to AWS bucket
fileRouter.post("/", async (request: Request, response: Response) => {
  try {
    if (!request.files || !request.files.file) {
      throw new Error("No file uploaded");
    }
    const data = JSON.parse(request.body.data)
    const result = await FileService.uploadFile(request.files.file, data.uuidAws)
    // codigo para borrar temporales de ser necesario. (streamifier)
    response.status(200).json({ result})
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

// GET: Download file by name

// fileRouter.get("/download/bite/:name", async (request: Request, response: Response) => {
//   try {
//     const name: string = request.params.name;
//     const result = await FileService.getFile(name);
//     if (result) {
//       let originalName = "que_paso";
//       if (result.Metadata && result.Metadata.originalname) {
//         originalName = result.Metadata.originalname;
//         response.attachment(originalName);
//       }
//       response.status(200).send(result.Body);
//     } else {
//       response.status(404).send("File not found");
//     }
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });



// fileRouter.get("/donwload/:name", async (request: Request, response: Response) => {
//   try{
//     const name: string = request.params.name;
//     const result = await FileService.getFile(name)
//     if (result){
//       let originalName = "que_paso"
//       if (result.Metadata && result.Metadata.originalName){
//         originalName = result.Metadata.originalName
//         response.attachment(originalName);
//       }
//     }
//     response.status(200).send(result.content)
//   } catch (error: any) {
//     return response.status(500).json(error.message)
//   }
// })

// fileRouter.get("/download/:name", async (request: Request, response: Response) => {
//   try{
//     const name: string = request.params.name;
//     const result = await FileService.getFile(name)
//     if (result){
//       const fileContent = Buffer.from(result.content, 'base64')
//       response.setHeader('Content-Type', result.contentType)
//       if (result.originalName){
//         response.setHeader('Content-Disposition', `attachment; filename="${result.originalName}"`);
//       }
//       response.send(fileContent)
//     }
//   } catch (error: any) {
//     return response.status(500).json(error.message)
//   }
// })

// fileRouter.get("/download/:name", async (req, res) => {
//   const name = req.params.name;
//   const result = await FileService.getFileURL(name)
//   res.status(200).json({url: result});
// })

fileRouter.get("/download/:name", async (req, res) => {
  const name = req.params.name;
  try{
    const result = await FileService.getFile(name);
    if (result) {
      if (result.Metadata && result.Metadata.originalname){
        const originalName = result.Metadata?.originalname;
        const url = await FileService.getFileURL(name, originalName);
        res.status(200).json({url: url, name: originalName});
      }
    } else {
      res.status(404).send("File not found");
    }
  }
  catch{
    res.status(404).send("File not found");
  }
});