import path from "path";
import { prisma } from "../../data/mysql";
import { CustomError } from "../../domain";
import { FileManagerService } from "./file-manager.service";

export class UploadService {
    constructor(
        private readonly fileManager: FileManagerService
    ) {}
    
    public async uploadFile(idJustificante: string, file: Express.Multer.File) {
        const { justificante } = prisma;

        const existJustificante = await justificante.findUnique({ where: {id: idJustificante} });
        if(!existJustificante) throw CustomError.badRequest('Id de justificante no valido');

        const [ error, fileName ] = this.fileManager.uploadFile({
            extencionesValidas: ['png', 'jpg', 'jpeg'],
            file: file,
            path: path.resolve(__dirname + '../../../../uploads/evidencias'),
        });
        if(error || !fileName) throw CustomError.internalServerError();

        await justificante.update({
            where: { id: existJustificante.id },
            data: { id_evidencia:  fileName} 
        });

        return 'Archivo cargado';
    }
}