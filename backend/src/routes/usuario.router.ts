import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UsuarioService from "../services/usuario.service";

export const usuarioRouter = express.Router();

// GET: List of all Usuarios
usuarioRouter.get("/", async (request: Request, response: Response) => {
  try {
    const usuarios = await UsuarioService.listUsuarios()
    return response.status(200).json(usuarios)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
