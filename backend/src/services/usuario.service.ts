import { RolUsuario } from "@prisma/client";
import { db } from "../utils/db.server";

interface Usuario {
  id: string,
  userNombre: string,
  email: string,
  password: string,
  estado: boolean,
  rol: RolUsuario
}

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

export const getUsuarioByEmail = async (email: string) => {
  return db.tablaUsuarios.findUnique({
    where: {
      email: email
    }
  })
}

export const createUsuario = async (usuario: Omit<Usuario, "id">) => {
  const { userNombre, email, password, estado, rol } = usuario;
  return db.tablaUsuarios.create({
    data: {
      userNombre,
      email,
      password,
      estado,
      rol
    },
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

export const updateUsuario = async (usuario: Partial<Omit<Usuario, "id">>, id: string) => {
  const { userNombre, email, password, estado, rol } = usuario;
  return db.tablaUsuarios.update({
    where: {
      id: id
    },
    data: {
      userNombre,
      email,
      password,
      estado,
      rol
    },
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
