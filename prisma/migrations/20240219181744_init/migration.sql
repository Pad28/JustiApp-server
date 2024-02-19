-- CreateTable
CREATE TABLE `User` (
    `matricula` VARCHAR(10) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `apellidos` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(30) NOT NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `password` VARCHAR(100) NOT NULL,
    `rol` ENUM('ALUMNO', 'TUTOR', 'ADMIN') NOT NULL DEFAULT 'ALUMNO',
    `tutor` VARCHAR(191) NULL,
    `cuatrimestre` INTEGER NULL,
    `grupo` VARCHAR(10) NULL,
    `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL,

    UNIQUE INDEX `User_correo_key`(`correo`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Justificante` (
    `id` VARCHAR(191) NOT NULL,
    `motivo` VARCHAR(200) NOT NULL,
    `fecha_creacion` DATE NOT NULL,
    `fecha_justificada_inicio` DATE NOT NULL,
    `fecha_justificada_fin` DATE NOT NULL,
    `id_evidencia` VARCHAR(50) NULL,
    `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL,
    `estado` ENUM('PENDIENTE', 'ACEPTADO', 'RECHAZADO', 'CADUCADO') NOT NULL DEFAULT 'PENDIENTE',
    `id_alumno` VARCHAR(191) NOT NULL,
    `id_tutor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` VARCHAR(20) NOT NULL,
    `cuatrimestre` INTEGER NOT NULL,
    `direccion` ENUM('INGENIERIA', 'LICENCIATURA') NOT NULL,
    `tutor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tutor_fkey` FOREIGN KEY (`tutor`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_grupo_fkey` FOREIGN KEY (`grupo`) REFERENCES `Grupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `User`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_tutor_fkey` FOREIGN KEY (`tutor`) REFERENCES `User`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;
