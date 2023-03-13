import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UsuarioService from "../services/usuario.service";

export const usuarioRestoreRouter = express.Router();

//UPDATE USER THROUGH EMAIL INSTEAD OF ID
usuarioRestoreRouter.patch(
  "/",
  body("email").isEmail(),
  body("password").isString(),
  async (request: Request, response: Response) => {
    console.log("Hola")
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }
    
    const { email, password } = request.body;

    try {
      const usuario = await UsuarioService.getUsuarioByEmail(email);
      if (!usuario) {
        return response.status(404).json({ message: "User not found" });
      }

      const newpassword =  await bcrypt.hash(password, 10);
      usuario.password = newpassword;

      const updateUsuario = await UsuarioService.updateUsuario(usuario, usuario.id);

      return response.status(200).json(updateUsuario);

    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
