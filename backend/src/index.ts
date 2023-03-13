import cors from "cors";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";

import { categoriaRouter } from "./routes/categoria.router";
import { documentoRouter } from "./routes/documento.router";
import { emailRouter } from "./routes/email.router";
import { fileRouter } from "./routes/file.router";
import { inversionistaRouter } from "./routes/inversionista.router";
import { usuarioRouterlogin } from "./routes/login";
import { productoRouter } from "./routes/producto.router";
import { usuarioRestoreRouter } from "./routes/restore.usuario.router";
import { tipoDocumentoRouter } from "./routes/tipo.documento.router";
import { usuarioRouter } from "./routes/usuario.router";


config();

if (!process.env.PORT) {
  process.exit(1);
}

// const ip = '172.22.240.1'; // la dirección IP de tu computadora
const PORT: number = parseInt(<string>(process.env.PORT), 10);

const app = express();

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "./uploads"
// }));

app.use(fileUpload());

app.use(cors());
app.use(express.json());

app.use("/api/inversionistas", inversionistaRouter);
app.use("/api/productos", productoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/documentos", documentoRouter);
app.use("/api/login",usuarioRouterlogin);
app.use("/api/tipo-documentos", tipoDocumentoRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/files", fileRouter);
app.use("/api/email",emailRouter);
app.use("/api/restorepass", usuarioRestoreRouter)


app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT} ...`);
});
