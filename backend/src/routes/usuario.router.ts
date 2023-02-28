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

// POST: Create a new Usuario
usuarioRouter.post(
  "/",
  body("userNombre").isString(),
  body("email").isString(),
  body("password").isString(),
  body("estado").isBoolean(),
  body("rol").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }
    try {
      const usuario = request.body
      const newUsuario = await UsuarioService.createUsuario(usuario)
      return response.status(201).json(newUsuario)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)

// PATCH: Update an Usuario
usuarioRouter.patch(
  "/:id",
  body("userNombre").optional().isString(),
  body("email").optional().isString(),
  body("password").optional().isString(),
  body("estado").optional().isBoolean(),
  body("rol").optional().isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }
    const id: string = request.params.id;
    try {
      const usuario = request.body
      const updateUsuario = await UsuarioService.updateUsuario(usuario, id)
      return response.status(200).json(updateUsuario)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)
