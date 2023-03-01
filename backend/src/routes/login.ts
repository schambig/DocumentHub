import * as dotenv from "dotenv";
import type { Request, Response } from "express";
import express from "express";
import jwt from 'jsonwebtoken';


const bcrypt = require('bcrypt');
export const app = express.Router();
dotenv.config();
app.post('/userjwt', async (req: Request, res: Response) => {
  
  const { username, password } = req.body;//cambiar al modelo de la BD

  try {
    // const client = await pool.connect();
    //Aqui esta linea conectaba a la base de datos progress directamente, Salo porfa conectala mediante prisma
    const hashedPassword = await bcrypt.hash(password, 10);
    const reshash = await client.query('INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

    const result = await client.query('SELECT * FROM "users" WHERE username = $1', [
      username,
    ]);
    
    client.release();
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Authentication: No found' });
    }

    const user = result.rows[0];
    console.log(user)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Authentication: Password incorrect' });
    }

    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error al obtener la data de la base de datos');
  }
});