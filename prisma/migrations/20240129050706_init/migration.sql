/*
  Warnings:

  - Added the required column `direccion` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Justificante` DROP FOREIGN KEY `Justificante_id_alumno_fkey`;

-- DropForeignKey
ALTER TABLE `Justificante` DROP FOREIGN KEY `Justificante_id_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_tutor_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `direccion` VARCHAR(30) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tutor_fkey` FOREIGN KEY (`tutor`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;
