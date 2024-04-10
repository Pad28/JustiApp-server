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
exports.UploadService = void 0;
const path_1 = __importDefault(require("path"));
const mysql_1 = require("../../data/mysql");
const domain_1 = require("../../domain");
class UploadService {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }
    uploadFile(idJustificante, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { justificante } = mysql_1.prisma;
            const existJustificante = yield justificante.findUnique({ where: { id: idJustificante } });
            if (!existJustificante)
                throw domain_1.CustomError.badRequest('Id de justificante no valido');
            const [error, fileName] = this.fileManager.uploadFile({
                extencionesValidas: ['png', 'jpg', 'jpeg'],
                file: file,
                path: path_1.default.resolve(__dirname + '../../../../uploads/evidencias'),
            });
            if (error || !fileName)
                throw domain_1.CustomError.internalServerError();
            yield justificante.update({
                where: { id: existJustificante.id },
                data: { id_evidencia: fileName }
            });
            return 'Archivo cargado';
        });
    }
}
exports.UploadService = UploadService;
