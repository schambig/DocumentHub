import { db } from "../utils/db.server";

export const listUsuarios = async () => {
  return db.tablaUsuarios.findMany({
    select: {
      id: true,
      userNombre: true,
      email: true,
      password: true,
      estado: true,
      rol: true
    }
  })
}

export const getUsuario = async (id: string) => {
  return db.tablaUsuarios.findUnique({
    where: {
      id: id
    }
  })
}

export const patchUsuario = async (id: string, Usuario:usUarioCreate) => {
  return db.tablaUsuarios.update({
    where: {
      id: id
    },
    data: {
      userNombre: Usuario.userNombre,
      email: Usuario.email,
      password: Usuario.password,
      estado: Usuario.estado,
      rol: Usuario.rol
    }
  })
}


interface usUario{
  id: string
  userNombre: string
  email: string
  password: string
  estado: boolean
  rol: RolUsuario
}



enum RolUsuario {
  ADMIN = 'ADMIN',
  DATAUSER = 'DATAUSER',
  USER = 'USER',
}

interface usUarioCreate{
  userNombre: string
  email: string
  password: string
  estado: boolean
  rol: RolUsuario
}


export const createUsuario = async (nuevoUsuario:usUarioCreate) => {
  return db.tablaUsuarios.create({
    data: {
      userNombre: nuevoUsuario.userNombre,
      email: nuevoUsuario.email,
      password: nuevoUsuario.password,
      estado: nuevoUsuario.estado,
      rol: nuevoUsuario.rol
    }
  })
}
