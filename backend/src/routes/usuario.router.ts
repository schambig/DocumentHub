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

// GET: A single Usuario by id
usuarioRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const usuario = await UsuarioService.getUsuario(id)
    if (usuario) {
      return response.status(200).json(usuario)
    }
    return response.status(404).json("Usuario could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
