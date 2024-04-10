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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoService = void 0;
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class GrupoService {
    getGrupos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { grupo } = data_1.prisma;
            const [total, results] = yield Promise.all([
                grupo.count(),
                grupo.findMany(),
            ]);
            return { total, results };
        });
    }
    createGrupo(createGrupoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, grupo } = data_1.prisma;
            const [existGrupo, existTutor] = yield Promise.all([
                grupo.findUnique({ where: { id: createGrupoDto.id } }),
                user.findUnique({ where: { matricula: createGrupoDto.tutor } }),
            ]);
            if (existGrupo)
                throw domain_1.CustomError.badRequest(`El grupo ${existGrupo.id} ya fue registrado`);
            if (!existTutor || !existTutor.estado)
                throw domain_1.CustomError.badRequest('El tutor no es valido');
            const newGroup = yield grupo.create({ data: Object.assign(Object.assign({}, createGrupoDto), { direccion: createGrupoDto.direccion }) });
            return newGroup;
        });
    }
    updateGrupo(updateGrupoDto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, grupo } = data_1.prisma;
            const data = updateGrupoDto.values;
            const existGrupo = yield grupo.findUnique({ where: { id } });
            if (!existGrupo)
                throw domain_1.CustomError.badRequest('id grupo no valido');
            if (data.id) {
                const existId = yield grupo.findUnique({ where: { id: data.id } });
                if (existId)
                    throw domain_1.CustomError.badRequest('id de grupo no valido');
            }
            if (data.tutor) {
                const existTutor = yield user.findUnique({ where: { matricula: data.tutor + '' } });
                if (!existTutor)
                    throw domain_1.CustomError.badRequest('tutor no valido');
                yield user.updateMany({ where: { grupo: id }, data: { tutor: data.tutor } });
            }
            const updateGrupo = yield grupo.update({
                where: { id },
                data
            });
            return updateGrupo;
        });
    }
}
exports.GrupoService = GrupoService;
