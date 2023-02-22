export interface tipoDoc{
    id: number,
    tipo: string,
}

export interface newTipoDoc{
    id: number,
    name: string,
    tipo: string,
}

export function convDOC(doc:tipoDoc ): newTipoDoc {
    return {
      id: doc.id,
      name: doc.tipo,
      tipo: doc.tipo,
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
//         tipo: 'Contrato'
//     },
//     {
//         id: 2,
//         tipo: 'Anexo 1'
//     },
//     {
//         id: 3,
//         tipo: 'Anexo 2'
//     },
//     {
//         id: 4,
//         tipo: 'Ficha Cliente'
//     }
// ]



// export const newDataDocumento:Array<newTipoDoc> = dataDocumento.map((doct:tipoDoc):newTipoDoc => convertirDOC(doct));