import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as FileService from "../services/file.service";

export const fileRouter = express.Router();

