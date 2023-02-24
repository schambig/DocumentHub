import { DocIdent, RolUsuario } from "@prisma/client";
import { db } from "../src/utils/db.server";
import * as data from "./data";


// This seed function fills data into:
// TablaInversionista, TablaProducto, TablaCategoria, TablaUsuario and TablaTipoDocumento tables of the database
async function seed() {
  await Promise.all(
    data.getInversionista().map((inversionista) => {
      return db.tablaInversionista.create({
        data: {
          nombres: inversionista.nombres,
          apPaterno: inversionista.apPaterno,
          apMaterno: inversionista.apMaterno,
          tipoIdentificacion: <DocIdent>inversionista.tipoIdentificacion,
          nroIdentificacion: inversionista.nroIdentificacion,
          pep: inversionista.pep
        }
      })
    })
  )

  await Promise.all(
    data.getProducto().map((producto) => {
      return db.tablaProducto.create({
        data: {
          codProducto: producto.codProducto,
          nombreProducto: producto.nombreProducto
        }
      })
    })
  )

  await Promise.all(
    data.getCategoria().map((categoria) => {
      return db.tablaCategoria.create({
        data: {
          tipo: categoria.tipo
        }
      })
    })
  )

  await Promise.all(
    data.getUsuario().map((usuario) => {
      return db.tablaUsuarios.create({
        data: {
          userNombre: usuario.userNombre,
          email: usuario.email,
          password: usuario.password,
          estado: usuario.estado,
          rol: <RolUsuario>usuario.rol
        }
      })
    })
  )

  await Promise.all(
    data.getTipoDocumento().map((tipoDocumento) => {
      return db.tablaTipoDocumento.create({
        data: {
          nombre: tipoDocumento.nombre,
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
