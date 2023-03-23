import { db } from "../utils/db.server";


enum DocIdent {
  DNI = 'DNI',
  CARNETEXTRANJERIA = 'CARNETEXTRANJERIA',
  PASAPORTE = 'PASAPORTE',
}

interface inVersionista{
  id: string,
  nombres: string,
  apPaterno: string,
  apMaterno: string,
  tipoIdentificacion: DocIdent,
  nroIdentificacion: string,
  pep: boolean,
}

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

export const getInversionista = async (id: string) => {
  return db.tablaInversionista.findUnique({
    where: {
      id: id
    }
  })
}

export const createInversionista = async (inver: Omit<inVersionista, "id">) => {
  const { nombres, apPaterno, apMaterno, tipoIdentificacion, nroIdentificacion, pep} = inver;
  return db.tablaInversionista.create({
    data: {
      nombres,
      apPaterno,
      apMaterno,
      tipoIdentificacion,
      nroIdentificacion,
      pep
    },
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

export const updateInversionista = async (inver: Partial<Omit<inVersionista, "id">>, id: string) => {
  const { nombres, apPaterno, apMaterno, tipoIdentificacion, nroIdentificacion, pep} = inver;
  return db.tablaInversionista.update({
    where: {
      id: id
    },
    data: {
      nombres,
      apPaterno,
      apMaterno,
      tipoIdentificacion,
      nroIdentificacion,
      pep
    },
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
