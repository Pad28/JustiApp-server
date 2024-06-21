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
exports.JustificanteService = void 0;
const path_1 = __importDefault(require("path"));
const mysql_1 = require("../../data/mysql");
const domain_1 = require("../../domain");
class JustificanteService {
    constructor(excelService, emailService, fileManager) {
        this.excelService = excelService;
        this.emailService = emailService;
        this.fileManager = fileManager;
    }
    createJustificante(createJustificanteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { justificante, user } = mysql_1.prisma;
            const existUser = yield user.findUnique({ where: {
                    matricula: createJustificanteDto.id_alumno
                } });
            if (!existUser || !existUser.tutor)
                throw domain_1.CustomError.badRequest('Alumno no valido');
            const existTutor = yield user.findUnique({ where: { matricula: existUser.tutor } });
            if (!existTutor)
                throw domain_1.CustomError.badRequest('Tutor no valido');
            const newJustificante = yield justificante.create({ data: Object.assign(Object.assign({}, createJustificanteDto), { id_tutor: existUser.tutor, direccion: existUser.direccion }) });
            const pathFile = yield this.excelService.crearExcel(newJustificante, existUser);
            this.emailService.enviarArchivo({
                destinatario: existTutor.correo,
                pathFile: [pathFile],
                subject: `Justificante para ${existUser.nombre} ${existUser.matricula}`
            });
            return newJustificante;
        });
    }
    enviarJustificante(createJustificanteDto, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { justificante, user } = mysql_1.prisma;
            const [existUser, existTutor] = yield Promise.all([
                user.findUnique({ where: { matricula: createJustificanteDto.id_alumno } }),
                user.findUnique({ where: { matricula: createJustificanteDto.id_tutor } }),
            ]);
            if (!existUser || !existUser.tutor)
                throw domain_1.CustomError.badRequest('Alumno no valido');
            if (!existTutor)
                throw domain_1.CustomError.badRequest('Tutor no valido');
            const [error, fileName] = this.fileManager.uploadFile({
                extencionesValidas: ['png', 'jpg', 'jpeg', 'pdf'],
                file: file,
                path: path_1.default.resolve(__dirname + '../../../../uploads/evidencias'),
            });
            if (error || !fileName)
                throw domain_1.CustomError.internalServerError();
            const newJustificante = yield justificante.create({ data: Object.assign(Object.assign({}, createJustificanteDto), { direccion: existUser.direccion, id_tutor: existUser.tutor, id_evidencia: fileName }) });
            const pathFile = yield this.excelService.crearExcel(newJustificante, existUser);
            this.emailService.enviarArchivo({
                destinatario: existTutor.correo,
                pathFile: [pathFile, path_1.default.resolve(__dirname + '../../../../uploads/evidencias', fileName)],
                subject: `Justificante para ${existUser.nombre} ${existUser.matricula}`
            });
            return newJustificante;
        });
    }
}
exports.JustificanteService = JustificanteService;
