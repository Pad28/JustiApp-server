/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `Justificante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.
  - You are about to alter the column `fecha_justificada_inicio` on the `Justificante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.
  - You are about to alter the column `fecha_justificada_fin` on the `Justificante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Date`.

*/
-- AlterTable
ALTER TABLE `Justificante` MODIFY `fecha_creacion` DATE NOT NULL,
    MODIFY `fecha_justificada_inicio` DATE NOT NULL,
    MODIFY `fecha_justificada_fin` DATE NOT NULL;
