import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(<string>(process.env.PORT), 10);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT} ...`);
});
