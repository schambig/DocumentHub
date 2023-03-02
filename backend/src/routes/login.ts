import * as dotenv from "dotenv";
import type { Request, Response } from "express";
// import express from "express";
import jwt from 'jsonwebtoken';
import * as UsuarioServiceLogin from "../services/login.service";
import { body, validationResult } from "express-validator";
import * as UsuarioService from "../services/usuario.service";
import bcrypt from 'bcrypt'
import { usuarioRouter } from "./usuario.router";


dotenv.config();
usuarioRouter.post('/loginjwt', async (req: Request, res: Response) => {

  const { email, password } = req.body;
    //const hashedPassword = await bcrypt.hash(password, 10);
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
          const tokenPayload = {
            ...usuario
          };
          const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '0.1h' });
          const responsePayload = {
            ...usuario,
            password: "",
            rol: "",
          };
          res.setHeader("Authorization", `Bearer ${token}`);
          return res.status(200).json(responsePayload);
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
usuarioRouter.post(
  "/userjwt",
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
      const newpassword =  await bcrypt.hash(request.body.password, 10);//enviar la contraseña hasheada a la DB
      console.log(newpassword);
      request.body.password = newpassword;
      const usuario = request.body;
      console.log(usuario);
      const newUsuario = await UsuarioService.createUsuario(usuario);
      console.log(newUsuario);
      return response.status(201).json(newUsuario);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)

// PATCH: Update an Usuario
usuarioRouter.patch(
  "/userjwt/:id",
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
    request.body.password =  await bcrypt.hash(request.body.password, 10);//enviar la contraseña hasheada a la DB
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
