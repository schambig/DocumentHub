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

// GET: A single Documento by id
documentoRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const documento = await DocumentoService.getDocumento(id)
    if (documento) {
      return response.status(200).json(documento)
    }
    return response.status(404).json("Documento could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

// POST: create single Documento
documentoRouter.post(
  "/",
  body("userNombre").isString(),
      body("nombreFile").isString(),
      body("userSubida").isString(),
      body("fechaSubida").isString(),
      body("uuidAws").isString(),
      body("urlAws").isString(),
      body("tablaInversionistaId").isString(),
      body("tablaProductoId").isString(),
      body("tablaCategoriaId").isString(),
      body("tablaTipoDocumentoId").isString(),
  async (request: Request, response: Response) => {

    try {
      const documento = await DocumentoService.createDoc(request.body)
      if (documento) {
        return response.status(201).json(documento)
      }
      return response.status(404).json("Documento could not be found")
    } catch (error: any) {
      return response.status(500).json(error.message)
    }
})
