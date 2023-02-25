export interface tDocumento{
    id: string
    nombreFile: string
    userSubida: string
    fechaSubida: Date
    uuidAws: string
    urlAws: string
    tablaInversionistaId?: string
    tablaProductoId?: string
    tablaCategoriaId?: string
    tablaTipoDocumentoId: string
}