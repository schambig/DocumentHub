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
    expiresIn: '1h'
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
    return res.status(404).json({message: "Usuario could not be found"})
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

usuarioRouterlogin.get('/jwt/verify', async (req: Request, res: Response) => {
  const options:jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h'
  };
  // return res.status(200).json({msg: "llego aqui"});

  if (process.env.SECRET_KEY && req.headers.authorization){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const decodedToken = jwt.decode(token, {complete: true}) as {[key: string]: any};
    if (!decodedToken || !decodedToken.header || !decodedToken.header.alg) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    if (decodedToken.header.alg !== 'HS256') {
      return res.status(403).json({ message: 'Algoritmo de cifrado no válido' });
    }
    try {
      const dataToken = jwt.verify(token, process.env.SECRET_KEY);
      if (typeof dataToken === 'object' && dataToken !== null) {
        const userId = dataToken.id; // Extraer datos del token
          // verificar el estado del usuario

        const usuario = await UsuarioService.getUsuario(userId)
        if (usuario !== null){
          if (usuario.estado === true){
            const tokenPayload = {
              ...usuario
            };
              // Crear un nuevo token
            const newToken = jwt.sign(tokenPayload,  process.env.SECRET_KEY, options);
            const responsePayload = {
              ...usuario,
              password: "",
            };
            // Devolver el nuevo token y una respuesta JSON
            res.setHeader("Authorization", `Bearer ${newToken}`);
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            return res.status(200).json(responsePayload);
          }else{
            return res.status(403).json({ message: 'Usuario Inactivo' });
          }
        } else {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

      }
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' });
    }
  }
  return res.status(404).json({ message: 'Error en servidor faltan datos' });
});
