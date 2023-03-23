/*
  Warnings:

  - The values [CARNET_EXTRANJERIA,PASSAPORTE] on the enum `DocIdent` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `descripcion` on the `TablaCategoria` table. All the data in the column will be lost.
  - You are about to alter the column `nombreFile` on the `TablaDocumento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `userSubida` on the `TablaDocumento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `nombres` on the `TablaInversionista` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `apPaterno` on the `TablaInversionista` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `apMaterno` on the `TablaInversionista` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `nroIdentificacion` on the `TablaInversionista` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `codProducto` on the `TablaProducto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `nombreProducto` on the `TablaProducto` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `nombre` on the `TablaTipoDocumento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `descripcion` on the `TablaTipoDocumento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `tablaRolId` on the `TablaUsuarios` table. All the data in the column will be lost.
  - You are about to alter the column `userNombre` on the `TablaUsuarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to drop the `TablaRol` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `TablaCategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `TablaUsuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'DATAUSER', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "DocIdent_new" AS ENUM ('DNI', 'CARNETEXTRANJERIA', 'PASAPORTE');
ALTER TABLE "TablaInversionista" ALTER COLUMN "tipoIdentificacion" TYPE "DocIdent_new" USING ("tipoIdentificacion"::text::"DocIdent_new");
ALTER TYPE "DocIdent" RENAME TO "DocIdent_old";
ALTER TYPE "DocIdent_new" RENAME TO "DocIdent";
DROP TYPE "DocIdent_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "TablaUsuarios" DROP CONSTRAINT "TablaUsuarios_tablaRolId_fkey";

-- AlterTable
ALTER TABLE "TablaCategoria" DROP COLUMN "descripcion",
ADD COLUMN     "tipo" VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE "TablaDocumento" ALTER COLUMN "nombreFile" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "userSubida" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "TablaInversionista" ALTER COLUMN "nombres" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "apPaterno" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "apMaterno" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "nroIdentificacion" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "pep" SET DEFAULT false;

-- AlterTable
ALTER TABLE "TablaProducto" ALTER COLUMN "codProducto" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "nombreProducto" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "TablaTipoDocumento" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "descripcion" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "TablaUsuarios" DROP COLUMN "tablaRolId",
ADD COLUMN     "rol" "RolUsuario" NOT NULL,
ALTER COLUMN "userNombre" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "estado" SET DEFAULT true;

-- DropTable
DROP TABLE "TablaRol";
