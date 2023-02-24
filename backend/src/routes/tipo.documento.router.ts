import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as TipoDocumentoService from "../services/tipo.documento.service";

export const tipoDocumentoRouter = express.Router();

// GET: List of all TipoDocumentos
tipoDocumentoRouter.get("/", async (request: Request, response: Response) => {
  try {
    const tipoDocumentos = await TipoDocumentoService.listTipoDocumento()
    return response.status(200).json(tipoDocumentos)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
