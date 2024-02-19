import path from "path";
import ExcelJS from 'exceljs';
import { DireccionGrupo, Justificante, User } from "@prisma/client";
import { CustomError } from "../../domain";

export class ExcelService {
    
    public async crearExcel(justificante: Justificante, user: User) {
        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.readFile(__dirname + '/../../../assets/justificante-template.xlsx');
            const worksheet = workbook.getWorksheet(1);

            if(!worksheet){
                throw new Error('Error al cargar el archivo');
            }
    
            if(user.direccion === DireccionGrupo.INGENIERIA){
                worksheet.getCell('H10').value = 'X';
            } else {
                worksheet.getCell('C10').value = 'X';
            }

            const fechaInicio = justificante.fecha_justificada_inicio
                .toISOString().split('T')[0].split('-').reverse().join('/');
            const fechaFinal = justificante.fecha_justificada_fin
                .toISOString().split('T')[0].split('-').reverse().join('/');

            worksheet.getCell('G12)').value = user.nombre;
            worksheet.getCell('E13)').value = justificante.fecha_creacion;
            worksheet.getCell('J13)').value = user.matricula;
            worksheet.getCell('F14)').value = user.grupo;
            worksheet.getCell('J14)').value = user.cuatrimestre;
            worksheet.getCell('G15)').value = `Del ${fechaInicio} al ${fechaFinal}`;
            switch (justificante.motivo) {
                case 'SALUD':
                    worksheet.getCell('D19').value = 'X';
                    break;
                case 'PERDIDA DE LIBERTAD':
                    worksheet.getCell('D21').value = 'X';
                    break;
                case 'COMISION DE TRABAJO':
                    worksheet.getCell('D23').value = 'X';
                    break;
                case 'COMISION INSTITUCIONAL':
                    worksheet.getCell('D25').value = 'X';
                    break;
                case 'FALLECIMIENTO DE UN FAMILIAR':
                    worksheet.getCell('H19').value = 'X';
                    break;
                case 'ACCIDENTE':
                    worksheet.getCell('H21').value = 'X';
                    break;
                    case 'TRAMITE OFICIAL EXTERNO':
                    worksheet.getCell('H23').value = 'X';
                    break;
                default:
                    worksheet.getCell('H25').value = 'X';
                    worksheet.getCell('J25').value = 'OTRO: ' + justificante.motivo;
                    break;
            }
    
            const upload = path.resolve(__dirname + '/../../../uploads/justificantes');
            await workbook.xlsx.writeFile(upload + '/' + justificante.id + '.xlsx');
            return upload + '/' + justificante.id + '.xlsx';
        } catch (error) {
            throw CustomError.internalServerError();
        }

    }

}