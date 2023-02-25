import { db } from "../utils/db.server";

export const listDocumentos = async () => {
  return db.tablaDocumento.findMany({
    select: {
      id: true,
      nombreFile: true,
      userSubida: true,
      fechaSubida: true,
      uuidAws: true,
      urlAws: true,
      tablaInversionistaId: true,
      tablaProductoId: true,
      tablaCategoriaId: true,
      tablaTipoDocumentoId: true
    }
  })
}

export const getDocumento = async(id: string) => {
  return db.tablaDocumento.findUnique({
    where: {
      id: id
    }
  })
}
