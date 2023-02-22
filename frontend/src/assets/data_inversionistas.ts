export interface inVersionista{
    id: number,
    nombre: string,
    apPat: string,
    apMat: string,
    tipoDoc: number,
    numDoc: string,
    PEP: boolean,
}

export interface newInversionista{
    id: number,
    name: string,
    nombre: string,
    apPat: string,
    apMat: string,
    tipoDoc: number,
    numDoc: string,
    PEP: boolean,
}

export function convertirInver(inver: inVersionista): newInversionista {
    return {
      id: inver.id,
      name: inver.numDoc + ' ► ' + inver.apPat + ' ' + inver.apMat + ', ' + inver.nombre,
      nombre: inver.nombre,
      apPat: inver.apPat,
      apMat: inver.apMat,
      tipoDoc: inver.tipoDoc,
      numDoc: inver.numDoc,
      PEP: inver.PEP
    };
}

export function converInverM(inverM: inVersionista[]): newInversionista[] {
    return (
        inverM.map( item => convertirInver(item))
    )
}

// const tipoDoc:tDOC = {
//     dni: 'dni',
//     carnet: 'carnet',
//     pasaporte: 'pasaporte',
// }

// export const dataInversionista:Array<inversionista> = [
//     {
//         id: 3,
//         nombre: 'Juan Manuel',
//         apPat: 'Villa',
//         apMat: 'Rushton', 
//         tipoDoc: 'DNI',
//         numDoc: 908070456,
//     },
//     {
//         id: 4,
//         nombre: 'Rodrigo Alessandro',
//         apPat: 'De Luzio',
//         apMat: 'Poquioma', 
//         tipoDoc: 'DNI',
//         numDoc: 908060154,
//     },
//     {
//         id: 5,
//         nombre: 'Elisa Pamela',
//         apPat: 'LTD',
//         apMat: 'Calderon', 
//         tipoDoc: 'CARNET',
//         numDoc: 917051362,
//     },
//     {
//         id: 6,
//         nombre: 'Mardely del Rosario',
//         apPat: 'Alfaro',
//         apMat: 'Stanic', 
//         tipoDoc: 'DNI',
//         numDoc: 947071556,
//     },
//     {
//         id: 7,
//         nombre: 'Luis Antonio',
//         apPat: 'Velasco',
//         apMat: 'Marcelo', 
//         tipoDoc: 'CARNET',
//         numDoc: 947032556,
//     },
//     {
//         id: 8,
//         nombre: 'Nataly',
//         apPat: 'Guanilo',
//         apMat: 'Casabonne', 
//         tipoDoc: 'DNI',
//         numDoc: 987654321,
//     },
//     {
//         id: 9,
//         nombre: 'Ericka Sofia',
//         apPat: 'Rossi de Malaga',
//         apMat: 'Flores', 
//         tipoDoc: 'DNI',
//         numDoc: 654987321,
//     },
//     {
//         id: 10,
//         nombre: 'Oscar Rodolfo',
//         apPat: 'Picasso',
//         apMat: 'Jara', 
//         tipoDoc: 'DNI',
//         numDoc: 987123654,
//     }
// ]



// export const newDataInversionista:Array<newInversionista> = dataInversionista.map((inVer:inversionista):newInversionista => convertirInver(inVer));