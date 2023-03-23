import { db } from "../utils/db.server";

export const listCategoria = async () => {
  return db.tablaCategoria.findMany({
    select: {
      id: true,
      tipo: true
    }
  })
}

export const getCategoria = async(id: string) => {
  return db.tablaCategoria.findUnique({
    where: {
      id: id
    }
  })
}
