import fs from 'fs';
import { uuid } from '../../config';

interface UploadFileProps {
    file: Express.Multer.File;
    extencionesValidas: string[];
    path: string;
    fileName?: string;
}

export class FileManagerService {

    public uploadFile(options: UploadFileProps): [string?, string?] {
        const { extencionesValidas, file, fileName = uuid.v4(), path } = options;

        const name = file.originalname.split('.');
        const extencion = name[name.length - 1];

        if(!extencionesValidas.includes(extencion)) {
            fs.unlinkSync(file.path);
            return [`La extencion ${extencion} no es valida`];
        }
        if(!fs.existsSync(path)) fs.mkdirSync(path);
        fs.renameSync(file.path, `${path}/${fileName}.${extencion}`)

        return [undefined, `${fileName}.${extencion}`];
    }

}