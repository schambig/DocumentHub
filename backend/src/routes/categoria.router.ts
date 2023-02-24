import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoriaService from "../services/categoria.service";

export const categoriaRouter = express.Router();

// GET: List of all TipoDocumentos
categoriaRouter.get("/", async (request: Request, response: Response) => {
  try {
    const categorias = await CategoriaService.listCategoria()
    return response.status(200).json(categorias)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
