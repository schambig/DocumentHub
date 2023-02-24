-- CreateEnum
CREATE TYPE "DocIdent" AS ENUM ('DNI', 'CARNET_EXTRANJERIA', 'PASSAPORTE');

-- CreateTable
CREATE TABLE "TablaInversionista" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apPaterno" TEXT NOT NULL,
    "apMaterno" TEXT NOT NULL,
    "tipoIdentificacion" "DocIdent" NOT NULL,
    "nroIdentificacion" TEXT NOT NULL,
    "pep" BOOLEAN NOT NULL,

    CONSTRAINT "TablaInversionista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaProducto" (
    "id" TEXT NOT NULL,
    "codProducto" TEXT NOT NULL,
    "nombreProducto" TEXT NOT NULL,

    CONSTRAINT "TablaProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelProdInver" (
    "tablaInversionistaId" TEXT NOT NULL,
    "tablaProductoId" TEXT NOT NULL,

    CONSTRAINT "RelProdInver_pkey" PRIMARY KEY ("tablaInversionistaId","tablaProductoId")
);

-- CreateTable
CREATE TABLE "TablaDocumento" (
    "id" TEXT NOT NULL,
    "nombreFile" TEXT NOT NULL,
    "userSubida" TEXT NOT NULL,
    "fechaSubida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuidAws" TEXT NOT NULL,
    "urlAws" TEXT NOT NULL,
    "tablaInversionistaId" TEXT,
    "tablaProductoId" TEXT,
    "tablaCategoriaId" TEXT,
    "tablaTipoDocumentoId" TEXT NOT NULL,

    CONSTRAINT "TablaDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaCategoria" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "TablaCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelProdCate" (
    "tablaProductoId" TEXT NOT NULL,
    "tablaCategoriaId" TEXT NOT NULL,

    CONSTRAINT "RelProdCate_pkey" PRIMARY KEY ("tablaProductoId","tablaCategoriaId")
);

-- CreateTable
CREATE TABLE "RelProdCateInver" (
    "tablaProductoId" TEXT NOT NULL,
    "tablaCategoriaId" TEXT NOT NULL,
    "tablaInversionistaId" TEXT NOT NULL,

    CONSTRAINT "RelProdCateInver_pkey" PRIMARY KEY ("tablaProductoId","tablaCategoriaId","tablaInversionistaId")
);

-- CreateTable
CREATE TABLE "TablaTipoDocumento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "TablaTipoDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaUsuarios" (
    "id" TEXT NOT NULL,
    "userNombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "tablaRolId" TEXT NOT NULL,

    CONSTRAINT "TablaUsuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaRol" (
    "id" TEXT NOT NULL,
    "rolNombre" TEXT NOT NULL,
    "rolPermiso" TEXT NOT NULL,

    CONSTRAINT "TablaRol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TablaDescarga" (
    "id" TEXT NOT NULL,
    "fechaDescarga" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tablaUsuariosId" TEXT NOT NULL,
    "tablaDocumentoId" TEXT NOT NULL,

    CONSTRAINT "TablaDescarga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TablaUsuarios_email_key" ON "TablaUsuarios"("email");

-- AddForeignKey
ALTER TABLE "RelProdInver" ADD CONSTRAINT "RelProdInver_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES "TablaInversionista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdInver" ADD CONSTRAINT "RelProdInver_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES "TablaProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDocumento" ADD CONSTRAINT "TablaDocumento_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES "TablaInversionista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDocumento" ADD CONSTRAINT "TablaDocumento_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES "TablaProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDocumento" ADD CONSTRAINT "TablaDocumento_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES "TablaCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDocumento" ADD CONSTRAINT "TablaDocumento_tablaTipoDocumentoId_fkey" FOREIGN KEY ("tablaTipoDocumentoId") REFERENCES "TablaTipoDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdCate" ADD CONSTRAINT "RelProdCate_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES "TablaProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdCate" ADD CONSTRAINT "RelProdCate_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES "TablaCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdCateInver" ADD CONSTRAINT "RelProdCateInver_tablaProductoId_fkey" FOREIGN KEY ("tablaProductoId") REFERENCES "TablaProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdCateInver" ADD CONSTRAINT "RelProdCateInver_tablaCategoriaId_fkey" FOREIGN KEY ("tablaCategoriaId") REFERENCES "TablaCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelProdCateInver" ADD CONSTRAINT "RelProdCateInver_tablaInversionistaId_fkey" FOREIGN KEY ("tablaInversionistaId") REFERENCES "TablaInversionista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaUsuarios" ADD CONSTRAINT "TablaUsuarios_tablaRolId_fkey" FOREIGN KEY ("tablaRolId") REFERENCES "TablaRol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDescarga" ADD CONSTRAINT "TablaDescarga_tablaUsuariosId_fkey" FOREIGN KEY ("tablaUsuariosId") REFERENCES "TablaUsuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TablaDescarga" ADD CONSTRAINT "TablaDescarga_tablaDocumentoId_fkey" FOREIGN KEY ("tablaDocumentoId") REFERENCES "TablaDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
