"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const path_1 = __importDefault(require("path"));
const exceljs_1 = __importDefault(require("exceljs"));
const client_1 = require("@prisma/client");
const domain_1 = require("../../domain");
class ExcelService {
    crearExcel(justificante, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.default.Workbook();
            try {
                yield workbook.xlsx.readFile(__dirname + '/../../../assets/justificante-template.xlsx');
                const worksheet = workbook.getWorksheet(1);
                if (!worksheet) {
                    throw new Error('Error al cargar el archivo');
                }
                if (user.direccion === client_1.DireccionGrupo.INGENIERIA) {
                    worksheet.getCell('H10').value = 'X';
                }
                else {
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
                const upload = path_1.default.resolve(__dirname + '/../../../uploads/justificantes');
                yield workbook.xlsx.writeFile(upload + '/' + justificante.id + '.xlsx');
                return upload + '/' + justificante.id + '.xlsx';
            }
            catch (error) {
                throw domain_1.CustomError.internalServerError();
            }
        });
    }
}
exports.ExcelService = ExcelService;
