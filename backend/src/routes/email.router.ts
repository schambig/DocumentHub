import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../email";

export const emailRouter = express.Router();
// Secret key for JWT signing
const secret = "mysecretkey";

/**
 * Generate a unique JWT token for the user's email address
 * @param email The email address for which to generate the token
 * @returns The generated JWT token
 */
export async function generateAuthToken(email: string): Promise<string> {
  const payload = { email };
  const options = { expiresIn: "0.1h" };
  return jwt.sign(payload, secret, options);
}

const router = express.Router();

emailRouter.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  // Generate an auth token
  const token = await generateAuthToken(email);

  // Send the password reset email
  await sendPasswordResetEmail(email, token);

  res.status(200).json({ message: "An email has been sent with instructions to reset your password." });
});