import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as ProductoService from "../services/producto.service";

export const productoRouter = express.Router();

// GET: List of all Productos
productoRouter.get("/", async (request: Request, response: Response) => {
  try {
    const productos = await ProductoService.listProductos()
    return response.status(200).json(productos)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
