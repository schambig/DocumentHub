export interface caTegoria{
    id: number,
    descripcion: string,
}

export interface newCategoria{
    id: number,
    name: string,
    descripcion: string,
}

export function convCate(lev:caTegoria ): newCategoria {
    return {
      id: lev.id,
      name: lev.descripcion,
      descripcion: lev.descripcion,
    };
}

export function convCateM(levM:caTegoria[]): newCategoria[] {
    return (
        levM.map( item => convCate(item))
    )
}

// export const dataLevant_Emi:Array<tCategoria> = [
//     {
//         id: 1,
//         descripcion: 1
//     },
//     {
//         id: 2,
//         descripcion: 2
//     },
//     {
//         id: 3,
//         descripcion: 3
//     },
//     {
//         id: 4,
//         descripcion: 4
//     },
//     {
//         id: 5,
//         descripcion: 5
//     },
//     {
//         id: 6,
//         descripcion: 6
//     },
//     {
//         id: 7,
//         descripcion: 7
//     },
//     {
//         id: 8,
//         descripcion: 8
//     },
//     {
//         id: 9,
//         descripcion: 9
//     },
//     {
//         id: 10,
//         descripcion: 10
//     },
//     {
//         id: 11,
//         descripcion: 11
//     },
//     {
//         id: 12,
//         descripcion: 12
//     },
//     {
//         id: 13,
//         descripcion: 13
//     },
//     {
//         id: 14,
//         descripcion: 14
//     },
//     {
//         id: 15,
//         descripcion: 15
//     },
//     {
//         id: 17,
//         descripcion: 17
//     },
//     {
//         id: 18,
//         descripcion: 18
//     },
//     {
//         id: 19,
//         descripcion: 19
//     },
//     {
//         id: 20,
//         descripcion: 20
//     }
// ]



// export const newDataLevEmi:Array<tNewCategoria> = dataLevant_Emi.map((levt:tCategoria):tNewCategoria => convCate(levt));