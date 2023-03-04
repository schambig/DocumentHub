import dotenv from 'dotenv';
import express from "express";
import type { Request, Response } from "express";
import jwt, { Algorithm }from 'jsonwebtoken';
import * as UsuarioServiceLogin from "../services/login.service";
import { body, validationResult } from "express-validator";
import * as UsuarioService from "../services/usuario.service";
import bcrypt from "bcrypt";
export const usuarioRouterlogin = express.Router();



dotenv.config({ path: './backend/.env' });
usuarioRouterlogin.post('/jwt', async (req: Request, res: Response) => {
  const options:jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '0.1h'
  };
  const { email, password } = req.body;
  try {
    const usuario = await UsuarioServiceLogin.getUsuario_email(email)
    if (usuario) {
      let isPasswordCorrect = false;
      // comparacion correcta de contraseña
      if (password !== usuario.password)
      {
        isPasswordCorrect = await bcrypt.compare(password, usuario.password);
      }else if(password === usuario.password){
        isPasswordCorrect = true;
      }else{
        return res.status(401).json({message: "Usuario o contraseña incorrecta"})
      }
      if (isPasswordCorrect && process.env.SECRET_KEY) {
        if (usuario.estado === true){
          const tokenPayload = {
            ...usuario
          };
          const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, options);
          const responsePayload = {
            ...usuario,
            password: "",
          };
          res.setHeader("Authorization", `Bearer ${token}`);
          res.setHeader("Access-Control-Expose-Headers", "Authorization");
          return res.status(200).json(responsePayload);
        }else{
          return res.status(403).json({message: "Usuario desactivado"})
        }
      }
      else {
        return res.status(401).json({message: "Usuario o contraseña incorrecta"})
      }
    }
    return res.status(404).json("Usuario could not be found")
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})
//


// POST: Create a new Usuario
usuarioRouterlogin.post(
  "/create",
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
