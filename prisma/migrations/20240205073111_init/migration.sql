/*
  Warnings:

  - You are about to alter the column `direccion` on the `Grupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(4))`.
  - You are about to alter the column `direccion` on the `Justificante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(4))`.
  - You are about to alter the column `direccion` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Grupo` MODIFY `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL;

-- AlterTable
ALTER TABLE `Justificante` MODIFY `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL;
