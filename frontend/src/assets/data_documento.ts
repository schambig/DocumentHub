export interface tipoDoc{
    id: string,
    nombre: string,
    descripcion?: string
}

export interface newTipoDoc{
    id: string,
    name: string,
    nombre: string,
    descripcion?: string
}

export function convDOC(doc:tipoDoc ): newTipoDoc {
    return {
      id: doc.id,
      name: doc.nombre,
      nombre: doc.nombre,
      descripcion: doc.descripcion ?? ''
    };
}

export function convDocM(docM:tipoDoc[]): newTipoDoc[] {
    return (
        docM.map( item => convDOC(item))
    )
}

// export const dataDocumento:Array<tipoDoc> = [
//     {
//         id: 1,
//         nombre: 'Contrato'
//     },
//     {
//         id: 2,
//         nombre: 'Anexo 1'
//     },
//     {
//         id: 3,
//         nombre: 'Anexo 2'
//     },
//     {
//         id: 4,
//         nombre: 'Ficha Cliente'
//     }
// ]



// export const newDataDocumento:Array<newTipoDoc> = dataDocumento.map((doct:tipoDoc):newTipoDoc => convertirDOC(doct));