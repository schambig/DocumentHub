import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as FileService from "../services/file.service";

export const fileRouter = express.Router();

// POST: Upload a file to AWS bucket
fileRouter.post("/", async (request: Request, response: Response) => {
  try {
    if (!request.files || !request.files.file) {
      throw new Error("No file uploaded");
    }
    const result = await FileService.uploadFile(request.files.file)
    response.json({ result })
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})
