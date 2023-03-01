import * as dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import jwt from 'jsonwebtoken';
import * as UsuarioServiceLogin from "../services/login.service";
import { body, validationResult } from "express-validator";
import * as UsuarioService from "../services/usuario.service";

export const usuarioRouter = express.Router();
const bcrypt = require('bcrypt');


dotenv.config();
usuarioRouter.post('/userjwt', async (req: Request, res: Response) => {
  
  const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const usuario = await UsuarioServiceLogin.getUsuario_email(email)
      if (usuario) {
        const isPasswordCorrect = await bcrypt.compare(password, usuario.password);
        if (isPasswordCorrect) {
          const token = jwt.sign({ username: usuario.email }, process.env.SECRET_KEY, { expiresIn: '0.1h' });
          return res.json({ token });
          return res.status(200).json(usuario)
        }
        else {
          return res.status(208).json({message: "Usuario o contraseña incorrecta"})
        }
      }
      return res.status(404).json("Usuario could not be found")
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  })
// 


// POST: Create a new Usuario
usuarioRouter.post(
  "/creahashed",
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
      request.body.password =  await bcrypt.hash(request.body.password, 10);//enviar la contraseña hasheada a la DB
      const usuario = request.body
      const newUsuario = await UsuarioService.createUsuario(usuario)
      return response.status(201).json(newUsuario)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)
