/*
  Warnings:

  - Made the column `cuatrimestre` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `cuatrimestre` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` VARCHAR(20) NOT NULL,
    `direccion` VARCHAR(20) NOT NULL,
    `cuatrimestre` INTEGER NOT NULL,
    `tutor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_grupo_fkey` FOREIGN KEY (`grupo`) REFERENCES `Grupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_tutor_fkey` FOREIGN KEY (`tutor`) REFERENCES `User`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;
