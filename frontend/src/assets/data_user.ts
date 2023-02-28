export enum RolUsuario {
    ADMIN = 'ADMIN',
    DATAUSER = 'DATAUSER',
    USER = 'USER',
  }

export interface usUario{
    id: string
    userNombre: string
    email: string
    password: string
    estado: boolean
    rol: RolUsuario
}

export interface usUarioSecret{
    id: string
    userNombre: string
    email: string
    estado: boolean
    rol: RolUsuario
}