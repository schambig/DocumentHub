import { db } from "../utils/db.server";

export const getUsuario_email = async (email: string) => {
  return db.tablaUsuarios.findUnique({
    where: {
      email: email,
    }
  })
}
