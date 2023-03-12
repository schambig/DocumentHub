//{DocIdent} from '../../../backend/prisma/schema.prisma'

export enum DocIdent {
    DNI = 'DNI',
    CARNETEXTRANJERIA = 'CARNETEXTRANJERIA',
    PASAPORTE = 'PASAPORTE',
  }

export interface inVersionista{
    id: string,
    nombres: string,
    apPaterno: string,
    apMaterno: string,
    tipoIdentificacion: DocIdent,
    nroIdentificacion: string,
    pep: boolean,
    [key: string]: any;
}

export interface inVerSTR{
    id: string,
    nombres: string,
    apPaterno: string,
    apMaterno: string,
    tipoIdentificacion: string,
    nroIdentificacion: string,
    pep: string,
    [key: string]: any;
}


export interface newInversionista{
    id: string,
    name: string,
    nombres: string,
    apPaterno: string,
    apMaterno: string,
    tipoIdentificacion: DocIdent,
    nroIdentificacion: string,
    pep: boolean,
}

export function convertirInver(inver: inVersionista): newInversionista {
    return {
      id: inver.id,
      name: inver.nroIdentificacion + ' ► ' + inver.apPaterno + ' ' + inver.apMaterno + ', ' + inver.nombres,
      nombres: inver.nombres,
      apPaterno: inver.apPaterno,
      apMaterno: inver.apMaterno,
      tipoIdentificacion: inver.tipoIdentificacion,
      nroIdentificacion: inver.nroIdentificacion,
      pep: inver.pep
    };
}

export function converInverM(inverM: inVersionista[]): newInversionista[] {
    return (
        inverM.map( item => convertirInver(item))
    )
}

// const tipoIdentificacion:tDOC = {
//     dni: 'dni',
//     carnet: 'carnet',
//     pasaporte: 'pasaporte',
// }

// export const dataInversionista:Array<inversionista> = [
//     {
//         id: 3,
//         nombres: 'Juan Manuel',
//         apPaterno: 'Villa',
//         apMaterno: 'Rushton', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 908070456,
//     },
//     {
//         id: 4,
//         nombres: 'Rodrigo Alessandro',
//         apPaterno: 'De Luzio',
//         apMaterno: 'Poquioma', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 908060154,
//     },
//     {
//         id: 5,
//         nombres: 'Elisa Pamela',
//         apPaterno: 'LTD',
//         apMaterno: 'Calderon', 
//         tipoIdentificacion: 'CARNET',
//         nroIdentificacion: 917051362,
//     },
//     {
//         id: 6,
//         nombres: 'Mardely del Rosario',
//         apPaterno: 'Alfaro',
//         apMaterno: 'Stanic', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 947071556,
//     },
//     {
//         id: 7,
//         nombres: 'Luis Antonio',
//         apPaterno: 'Velasco',
//         apMaterno: 'Marcelo', 
//         tipoIdentificacion: 'CARNET',
//         nroIdentificacion: 947032556,
//     },
//     {
//         id: 8,
//         nombres: 'Nataly',
//         apPaterno: 'Guanilo',
//         apMaterno: 'Casabonne', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 987654321,
//     },
//     {
//         id: 9,
//         nombres: 'Ericka Sofia',
//         apPaterno: 'Rossi de Malaga',
//         apMaterno: 'Flores', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 654987321,
//     },
//     {
//         id: 10,
//         nombres: 'Oscar Rodolfo',
//         apPaterno: 'Picasso',
//         apMaterno: 'Jara', 
//         tipoIdentificacion: 'DNI',
//         nroIdentificacion: 987123654,
//     }
// ]



// export const newDataInversionista:Array<newInversionista> = dataInversionista.map((inVer:inversionista):newInversionista => convertirInver(inVer));