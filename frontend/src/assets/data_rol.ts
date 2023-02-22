export interface tRol{
    id: number,
    rolName: string,
    rolPermiso: string
}

export interface tNewRol{
    id: number,
    name: string,
    rolName: string,
    rolPermiso: string
}

export function convertirProducto(rol:tRol ): tNewRol {
    return {
        id: rol.id,
        name: rol.rolName,
        rolName: rol.rolName,
        rolPermiso: rol.rolPermiso
    };
}

export function converProM(rolM:tRol[]): tNewRol[] {
    return (
        rolM.map( item => convertirProducto(item))
    )
}