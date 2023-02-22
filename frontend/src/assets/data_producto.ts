export interface proDucto{
    id: number,
    codigo: string,
    nombre: string,
}

export interface newProDucto{
    id: number,
    name: string,
    codigo: string,
    nombre: string,
}

export function convProducto(pro:proDucto ): newProDucto {
    return {
      id: pro.id,
      name: pro.codigo + ' ► '+ pro.nombre,
      codigo: pro.codigo,
      nombre: pro.nombre,
    };
}

export function convProductoM(proM:proDucto[]): newProDucto[] {
    return (
        proM.map( item => convProducto(item))
    )
}

// export const dataProducto:Array<proDucto> = [
//     {
//         id: 1,
//         nombre: 'Fondo Edifica Core - Renta Fija'
//     },
//     {
//         id: 2,
//         nombre: 'Fondo Edifica Core'
//     },
//     {
//         id: 3,
//         nombre: 'Fondo de Derivados Financieros'
//     },
//     {
//         id: 4,
//         nombre: 'Fondo Edifica Core II'
//     },
//     {
//         id: 5,
//         nombre: 'Fondo Praedium'
//     },
//     {
//         id: 6,
//         nombre: 'Bonos Corporativos Praedium'
//     },
//     {
//         id: 7,
//         nombre: 'Fondo TLR'
//     },
//     {
//         id: 8,
//         nombre: 'Fondo Performance'
//     },
//     {
//         id: 9,
//         nombre: 'Fondo Seguridad Core'
//     },
//     {
//         id: 10,
//         nombre: 'Bono FEC II'
//     },
//     {
//         id: 11,
//         nombre: 'Papeles Comerciales - FEC II'
//     },
//     {
//         id: 12,
//         nombre: 'Fondo Equilibrio'
//     },
//     {
//         id: 13,
//         nombre: 'Fondo Oportunidad'
//     },
//     {
//         id: 14,
//         nombre: 'Bono USA'
//     },
//     {
//         id: 15,
//         nombre: 'Bono TRD Artline'
//     },
//     {
//         id: 16,
//         nombre: 'FDI 1A'
//     },
//     {
//         id: 17,
//         nombre: 'FDI 1B'
//     },
//     {
//         id: 18,
//         nombre: 'Fondo Edifica Global'
//     },
//     {
//         id: 19,
//         nombre: 'Fondo Edifica V'
//     },
//     {
//         id: 20,
//         nombre: 'FSPD'
//     },
//     {
//         id: 21,
//         nombre: 'FSPEVC'
//     },
//     {
//         id: 22,
//         nombre: 'FIRE'
//     },
//     {
//         id: 23,
//         nombre: 'FSGOP'
//     },
//     {
//         id: 24,
//         nombre: 'Fondo Sabbi Real Estate'
//     },
//     {
//         id: 25,
//         nombre: 'BSGOP'
//     }
// ]



// export const newDataProduct:Array<newProDucto> = dataProducto.map((prod:proDucto):newProDucto => convertirProducto(prod));