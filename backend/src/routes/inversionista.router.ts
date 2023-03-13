import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as InversionistaService from "../services/inversionista.service";

export const inversionistaRouter = express.Router();

// GET: List of all Inversionistas
inversionistaRouter.get("/", async (request: Request, response: Response) => {
  try {
    const inversionistas = await InversionistaService.listInversionistas()
    return response.status(200).json(inversionistas)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

// GET: A single Inversionista by id
inversionistaRouter.get("/:id", async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const inversionista = await InversionistaService.getInversionista(id)
    if (inversionista) {
      return response.status(200).json(inversionista)
    }
    return response.status(404).json("Inversionista could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})


// POST: Create a new Inversionista
inversionistaRouter.post(
  "/",
  body("nombres").isString(),
  body("apPaterno").isString(),
  body("apMaterno").isString(),
  body("tipoIdentificacion").isString(),
  body("nroIdentificacion").isString(),
  body("pep").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }
    if(request.body.tipoIdentificacion === ''){
      return response.status(401).json({message: "Error tipo IDE"});
    }
    try {
      const inversionistaCreate = request.body
      const newInver = await InversionistaService.createInversionista(inversionistaCreate)
      return response.status(201).json(newInver)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)

// PATCH: Update an Inversionista
inversionistaRouter.patch(
  "/:id",
  body("nombres").optional().isString(),
  body("apPaterno").optional().isString(),
  body("apMaterno").optional().isString(),
  body("tipoIdentificacion").optional().isString(),
  body("nroIdentificacion").optional().isString(),
  body("pep").optional().isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({errors: errors.array()});
    }
    const id: string = request.params.id;

    try {
      const newInver = request.body;
      const updateInver = await InversionistaService.updateInversionista(newInver, id);
      return response.status(200).json(updateInver);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
)
