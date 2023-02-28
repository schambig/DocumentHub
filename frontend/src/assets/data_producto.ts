export interface proDucto{
    id: string,
    codProducto: string,
    nombreProducto: string,
}

export interface newProDucto{
    id: string,
    name: string,
    codProducto: string,
    nombreProducto: string,
}

export function convProducto(pro:proDucto ): newProDucto {
    return {
      id: pro.id,
      name: pro.codProducto + ' ► '+ pro.nombreProducto,
      codProducto: pro.codProducto,
      nombreProducto: pro.nombreProducto,
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
//         nombreProducto: 'Fondo Edifica Core - Renta Fija'
//     },
//     {
//         id: 2,
//         nombreProducto: 'Fondo Edifica Core'
//     },
//     {
//         id: 3,
//         nombreProducto: 'Fondo de Derivados Financieros'
//     },
//     {
//         id: 4,
//         nombreProducto: 'Fondo Edifica Core II'
//     },
//     {
//         id: 5,
//         nombreProducto: 'Fondo Praedium'
//     },
//     {
//         id: 6,
//         nombreProducto: 'Bonos Corporativos Praedium'
//     },
//     {
//         id: 7,
//         nombreProducto: 'Fondo TLR'
//     },
//     {
//         id: 8,
//         nombreProducto: 'Fondo Performance'
//     },
//     {
//         id: 9,
//         nombreProducto: 'Fondo Seguridad Core'
//     },
//     {
//         id: 10,
//         nombreProducto: 'Bono FEC II'
//     },
//     {
//         id: 11,
//         nombreProducto: 'Papeles Comerciales - FEC II'
//     },
//     {
//         id: 12,
//         nombreProducto: 'Fondo Equilibrio'
//     },
//     {
//         id: 13,
//         nombreProducto: 'Fondo Oportunidad'
//     },
//     {
//         id: 14,
//         nombreProducto: 'Bono USA'
//     },
//     {
//         id: 15,
//         nombreProducto: 'Bono TRD Artline'
//     },
//     {
//         id: 16,
//         nombreProducto: 'FDI 1A'
//     },
//     {
//         id: 17,
//         nombreProducto: 'FDI 1B'
//     },
//     {
//         id: 18,
//         nombreProducto: 'Fondo Edifica Global'
//     },
//     {
//         id: 19,
//         nombreProducto: 'Fondo Edifica V'
//     },
//     {
//         id: 20,
//         nombreProducto: 'FSPD'
//     },
//     {
//         id: 21,
//         nombreProducto: 'FSPEVC'
//     },
//     {
//         id: 22,
//         nombreProducto: 'FIRE'
//     },
//     {
//         id: 23,
//         nombreProducto: 'FSGOP'
//     },
//     {
//         id: 24,
//         nombreProducto: 'Fondo Sabbi Real Estate'
//     },
//     {
//         id: 25,
//         nombreProducto: 'BSGOP'
//     }
// ]



// export const newDataProduct:Array<newProDucto> = dataProducto.map((prod:proDucto):newProDucto => convertirProducto(prod));