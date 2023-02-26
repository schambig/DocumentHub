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
