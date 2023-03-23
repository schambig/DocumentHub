import { db } from "../utils/db.server";

interface tDocumento{
  id: string,
  nombreFile: string,
  userSubida: string,
  fechaSubida: string,
  uuidAws: string,
  urlAws: string,
  tablaInversionistaId: string,
  tablaProductoId: string,
  tablaCategoriaId: string,
  tablaTipoDocumentoId: string
}

interface tDocumentoC{
  nombreFile: string,
  userSubida: string,
  tablaInversionistaId: string,
  tablaProductoId: string,
  tablaCategoriaId: string,
  tablaTipoDocumentoId: string
}

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

export const createDoc = async (documento: Omit<tDocumento, "id" |"fechaSubida">) => {
  const { nombreFile, userSubida, urlAws, uuidAws,
    tablaInversionistaId, tablaProductoId,
    tablaCategoriaId, tablaTipoDocumentoId } = documento;
  return db.tablaDocumento.create({
    data: {
      nombreFile,
      userSubida,
      urlAws,
      uuidAws,
      tablaInversionistaId,
      tablaProductoId,
      tablaCategoriaId,
      tablaTipoDocumentoId
    },
  })
}
