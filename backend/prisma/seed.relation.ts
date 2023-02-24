import { db } from "../src/utils/db.server";
import * as data from "./data";

// This seed function fills data into:
// RelProdInver, RelProdCate, RelProdCateInver and TablaDocumento tables of the database
async function seed() {
  await Promise.all(
    data.getRelProductoInversionista().map((productoInversionista) => {
      return db.relProdInver.create({
        data: {
          tablaInversionistaId: productoInversionista.tablaInversionistaId,
          tablaProductoId: productoInversionista.tablaProductoId
        }
      })
    })
  )

  await Promise.all(
    data.getRelProductoCategoria().map((productoCategoria) => {
      return db.relProdCate.create({
        data: {
          tablaProductoId: productoCategoria.tablaProductoId,
          tablaCategoriaId: productoCategoria.tablaCategoriaId
        }
      })
    })
  )

  await Promise.all(
    data.getRelProductoCategoriaInversionista().map((prodCateInver) => {
      return db.relProdCateInver.create({
        data: {
          tablaProductoId: prodCateInver.tablaProductoId,
          tablaCategoriaId: prodCateInver.tablaCategoriaId,
          tablaInversionistaId: prodCateInver.tablaInversionistaId
        }
      })
    })
  )

  await Promise.all(
    data.getDocumento().map((documento) => {
      return db.tablaDocumento.create({
        data: {
          nombreFile: documento.nombreFile,
          userSubida: documento.userSubida,
          uuidAws: documento.uuiAws,
          urlAws: documento.urlAws,
          tablaInversionistaId: documento.tablaInversionistaId,
          tablaProductoId: documento.tablaProductoId,
          tablaCategoriaId: documento.tablaCategoriaId,
          tablaTipoDocumentoId: documento.tablaTipoDocumentoId
        }
      })
    })
  )
}

seed()
  .catch((e: Error) =>{
    console.error(e)
    // process.exit(1)
  });
