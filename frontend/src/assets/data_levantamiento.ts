export interface caTegoria{
    id: string,
    tipo: string,
}

export interface newCategoria{
    id: string,
    name: string,
    tipo: string,
}

export function convCate(lev:caTegoria ): newCategoria {
    return {
      id: lev.id,
      name: lev.tipo,
      tipo: lev.tipo,
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
//         tipo: 1
//     },
//     {
//         id: 2,
//         tipo: 2
//     },
//     {
//         id: 3,
//         tipo: 3
//     },
//     {
//         id: 4,
//         tipo: 4
//     },
//     {
//         id: 5,
//         tipo: 5
//     },
//     {
//         id: 6,
//         tipo: 6
//     },
//     {
//         id: 7,
//         tipo: 7
//     },
//     {
//         id: 8,
//         tipo: 8
//     },
//     {
//         id: 9,
//         tipo: 9
//     },
//     {
//         id: 10,
//         tipo: 10
//     },
//     {
//         id: 11,
//         tipo: 11
//     },
//     {
//         id: 12,
//         tipo: 12
//     },
//     {
//         id: 13,
//         tipo: 13
//     },
//     {
//         id: 14,
//         tipo: 14
//     },
//     {
//         id: 15,
//         tipo: 15
//     },
//     {
//         id: 17,
//         tipo: 17
//     },
//     {
//         id: 18,
//         tipo: 18
//     },
//     {
//         id: 19,
//         tipo: 19
//     },
//     {
//         id: 20,
//         tipo: 20
//     }
// ]



// export const newDataLevEmi:Array<tNewCategoria> = dataLevant_Emi.map((levt:tCategoria):tNewCategoria => convCate(levt));