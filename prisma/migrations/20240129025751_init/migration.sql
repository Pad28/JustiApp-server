-- CreateTable
CREATE TABLE `User` (
    `matricula` VARCHAR(6) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `apellidos` VARCHAR(30) NOT NULL,
    `correo` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `grupo` VARCHAR(10) NULL,
    `cuatrimestre` INTEGER NULL,
    `estado` BOOLEAN NULL DEFAULT true,
    `rol` ENUM('ALUMNO', 'TUTOR', 'ADMIN') NOT NULL DEFAULT 'ALUMNO',
    `tutor` VARCHAR(191) NULL,

    UNIQUE INDEX `User_correo_key`(`correo`),
    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Justificante` (
    `id` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(20) NOT NULL,
    `motivo` VARCHAR(20) NOT NULL,
    `fecha_creacion` VARCHAR(20) NOT NULL,
    `fecha_justificada_inicio` VARCHAR(20) NOT NULL,
    `fecha_justificada_fin` VARCHAR(20) NOT NULL,
    `id_evidencia` VARCHAR(40) NOT NULL,
    `estado` ENUM('PENDIENTE', 'ACEPTADO', 'RECHAZADO', 'CADUCADO') NOT NULL DEFAULT 'PENDIENTE',
    `id_alumno` VARCHAR(191) NOT NULL,
    `id_tutor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tutor_fkey` FOREIGN KEY (`tutor`) REFERENCES `User`(`matricula`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `User`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Justificante` ADD CONSTRAINT `Justificante_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `User`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;
