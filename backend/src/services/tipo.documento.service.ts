import { db } from "../utils/db.server";

export const listTipoDocumento = async () => {
  return db.tablaTipoDocumento.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true
    }
  })
}

export const getTipoDocumento = async (id: string) => {
  return db.tablaTipoDocumento.findUnique({
    where: {
      id: id
    }
  })
}
