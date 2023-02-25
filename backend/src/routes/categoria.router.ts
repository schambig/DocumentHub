import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoriaService from "../services/categoria.service";

export const categoriaRouter = express.Router();

// GET: List of all Categorias
categoriaRouter.get("/", async (request: Request, response: Response) => {
  try {
    const categorias = await CategoriaService.listCategoria()
    return response.status(200).json(categorias)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

// GET: A single Categoria by id
categoriaRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const categoria = await CategoriaService.getCategoria(id)
    if (categoria) {
      return response.status(200).json(categoria)
    }
    return response.status(404).json("Categoria could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
})
