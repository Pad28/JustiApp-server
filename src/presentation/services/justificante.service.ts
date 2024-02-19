import { DireccionGrupo } from "@prisma/client";
import { prisma } from "../../data/mysql";
import { CreateJustificanteDto, CustomError } from "../../domain";
import { EmailService } from "./email.service";
import { ExcelService } from "./excel.service";

export class JustificanteService {

    constructor(
        private readonly excelService: ExcelService,
        private readonly emailService: EmailService,
    ) {}

    public async createJustificante(createJustificanteDto: CreateJustificanteDto) {
        const { justificante, user } = prisma;

        const existUser = await user.findUnique({ where: { matricula: createJustificanteDto.id_alumno } });
        if(!existUser || !existUser.tutor) throw CustomError.badRequest('Alumno no valido');

        const existTutor = await user.findUnique({ where: { matricula: existUser.tutor } });
        if(!existTutor) throw CustomError.badRequest('Tutor no valido');

        const newJustificante = await justificante.create({
            data: {
                ...createJustificanteDto,
                id_tutor: existUser.tutor,
                direccion: existUser.direccion
            }
        });

        const pathFile = await this.excelService.crearExcel(newJustificante, existUser);
        this.emailService.enviarArchivo({
            destinatario: existTutor.correo,
            pathFile: pathFile,
            subject: `Justificante para ${existUser.nombre} ${existUser.matricula}`
        });
        return newJustificante;
    }
    
}