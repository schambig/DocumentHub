import { db } from "../utils/db.server";

export const listProductos = async () => {
  return db.tablaProducto.findMany({
    select: {
      id: true,
      codProducto: true,
      nombreProducto: true
    }
  })
}

export const getProducto = async (id: string) => {
  return db.tablaProducto.findUnique({
    where: {
      id: id
    }
  })
}
