"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManagerService = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config");
class FileManagerService {
    uploadFile(options) {
        const { extencionesValidas, file, fileName = config_1.uuid.v4(), path } = options;
        const name = file.originalname.split('.');
        const extencion = name[name.length - 1];
        if (!extencionesValidas.includes(extencion)) {
            fs_1.default.unlinkSync(file.path);
            return [`La extencion ${extencion} no es valida`];
        }
        if (!fs_1.default.existsSync(path))
            fs_1.default.mkdirSync(path);
        fs_1.default.renameSync(file.path, `${path}/${fileName}.${extencion}`);
        return [undefined, `${fileName}.${extencion}`];
    }
}
exports.FileManagerService = FileManagerService;
