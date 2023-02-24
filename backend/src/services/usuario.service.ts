import { db } from "../utils/db.server";

export const listUsuarios = async () => {
  return db.tablaUsuarios.findMany({
    select: {
      id: true,
      userNombre: true,
      email: true,
      estado: true,
      rol: true
    }
  })
}
