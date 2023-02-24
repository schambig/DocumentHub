import { db } from "../utils/db.server";

export const listInversionistas = async () => {
  return db.tablaInversionista.findMany({
    select: {
      id: true,
      nombres: true,
      apPaterno: true,
      apMaterno: true,
      tipoIdentificacion: true,
      nroIdentificacion: true,
      pep: true
    }
  })
}
