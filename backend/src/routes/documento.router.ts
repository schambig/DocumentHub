import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as DocumentoService from "../services/documento.service";

export const documentoRouter = express.Router();

// GET: List of all Documentos
documentoRouter.get("/", async (request: Request, response: Response) => {
  try {
    const documentos = await DocumentoService.listDocumentos()
    return response.status(200).json(documentos)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
