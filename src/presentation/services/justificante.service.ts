import path from "path";
import { prisma } from "../../data/mysql";

import { CreateJustificanteAndEvidenciaDto, CreateJustificanteDto, CustomError } from "../../domain";
import { EmailService } from "./email.service";
import { ExcelService } from "./excel.service";
import { FileManagerService } from "./file-manager.service";

export class JustificanteService {

    constructor(
        private readonly excelService: ExcelService,
        private readonly emailService: EmailService,
        private readonly fileManager: FileManagerService,
    ) {}

    public async createJustificante(createJustificanteDto: CreateJustificanteDto) {
        const { justificante, user } = prisma;

        const existUser = await user.findUnique({ where: { 
            matricula: createJustificanteDto.id_alumno 
        }});
        if(!existUser || !existUser.tutor) throw CustomError.badRequest('Alumno no valido');

        const existTutor = await user.findUnique({ where: { matricula: existUser.tutor } });
        if(!existTutor) throw CustomError.badRequest('Tutor no valido');

        const newJustificante = await justificante.create({ data: {
                ...createJustificanteDto,
                id_tutor: existUser.tutor,
                direccion: existUser.direccion
        }});

        const pathFile = await this.excelService.crearExcel(newJustificante, existUser);
        this.emailService.enviarArchivo({
            destinatario: existTutor.correo,
            pathFile: [pathFile],
            subject: `Justificante para ${existUser.nombre} ${existUser.matricula}`
        });
        return newJustificante;
    }
    
    public async enviarJustificante( 
        createJustificanteDto: CreateJustificanteAndEvidenciaDto, 
        file: Express.Multer.File
        ) {
        const { justificante, user } = prisma;

        const [existUser, existTutor] = await Promise.all([
            user.findUnique({ where: { matricula: createJustificanteDto.id_alumno } }),
            user.findUnique({ where: { matricula: createJustificanteDto.id_tutor } }),
        ]);

        if(!existUser || !existUser.tutor) throw CustomError.badRequest('Alumno no valido');
        if(!existTutor) throw CustomError.badRequest('Tutor no valido');

        const [error, fileName] = this.fileManager.uploadFile({
            extencionesValidas: ['png', 'jpg', 'jpeg', 'pdf'],
            file: file,
            path: path.resolve(__dirname + '../../../../uploads/evidencias'),
        });


        if(error || !fileName) throw CustomError.internalServerError();
        const newJustificante = await justificante.create({ data: {
            ...createJustificanteDto,
            direccion: existUser.direccion,
            id_tutor: existUser.tutor,
            id_evidencia: fileName,
        }});
        
        const pathFile = await this.excelService.crearExcel(newJustificante, existUser);
        this.emailService.enviarArchivo({
            destinatario: existTutor.correo,
            pathFile: [pathFile, path.resolve(__dirname + '../../../../uploads/evidencias', fileName)],
            subject: `Justificante para ${existUser.nombre} ${existUser.matricula}`
        });
        return newJustificante;
    }
}