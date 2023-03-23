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

// GET: A single Tipo Documento by id
tipoDocumentoRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const tipoDocumento = await TipoDocumentoService.getTipoDocumento(id)
    if (tipoDocumento) {
      return response.status(200).json(tipoDocumento)
    }
    return response.status(404).json("Tipo documento could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
