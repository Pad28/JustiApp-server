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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mysql_1 = require("../../data/mysql");
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class UserService {
    constructor() { }
    registerAlumno(registerAlumnoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, grupo } = mysql_1.prisma;
            const [matriculaExist, correoExist, grupoExist] = yield Promise.all([
                user.findFirst({ where: { matricula: registerAlumnoDto.matricula } }),
                user.findFirst({ where: { correo: registerAlumnoDto.correo } }),
                grupo.findFirst({ where: { id: registerAlumnoDto.grupo } }),
            ]);
            if (matriculaExist)
                throw domain_1.CustomError.badRequest(`La matricula ${matriculaExist.matricula} ya fue registrada`);
            if (correoExist)
                throw domain_1.CustomError.badRequest(`El correo ${correoExist.correo} ya fue registrado`);
            if (!grupoExist)
                throw domain_1.CustomError.badRequest('El grupo no es valido');
            const password = config_1.bcryptjsAdapter.hash(registerAlumnoDto.password);
            const _a = yield user.create({ data: Object.assign(Object.assign({}, registerAlumnoDto), { password, direccion: grupoExist.direccion, cuatrimestre: grupoExist.cuatrimestre, tutor: grupoExist.tutor }) }), { password: regiserPassword } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        });
    }
    updateAlumno(updateAlumnoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, grupo } = mysql_1.prisma;
            const _a = updateAlumnoDto.values, { matricula } = _a, data = __rest(_a, ["matricula"]);
            const existUser = yield user.findUnique({ where: { matricula } });
            if (!existUser)
                throw domain_1.CustomError.badRequest('matricula no valida');
            if (data.tutor) {
                const existTutor = yield user.findFirst({ where: { nombre: data.tutor } });
                if (!existTutor)
                    throw domain_1.CustomError.badRequest('Tutor no valido');
                data.tutor = existTutor.matricula;
            }
            if (data.password) {
                data.password = config_1.bcryptjsAdapter.hash(data.password);
            }
            if (data.grupo) {
                const existGrupo = yield grupo.findUnique({ where: { id: data.grupo } });
                if (!existGrupo)
                    throw domain_1.CustomError.badRequest('Grupo no valido');
                data.tutor = existGrupo.tutor;
                data.direccion = existGrupo.direccion;
                data.cuatrimestre = existGrupo.cuatrimestre;
            }
            const _b = yield user.update({
                where: { matricula },
                data
            }), { password } = _b, rest = __rest(_b, ["password"]);
            return rest;
        });
    }
    createTutor(createTutorDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const [matriculaExist, correoExist] = yield Promise.all([
                user.findFirst({ where: { matricula: createTutorDto.matricula } }),
                user.findFirst({ where: { correo: createTutorDto.correo } }),
            ]);
            if (matriculaExist)
                throw domain_1.CustomError.badRequest(`La matricula ${matriculaExist.matricula} ya fue registrada`);
            if (correoExist)
                throw domain_1.CustomError.badRequest(`El correo ${correoExist.correo} ya fue registrado`);
            const password = config_1.bcryptjsAdapter.hash(createTutorDto.password);
            const _a = yield user.create({
                data: Object.assign(Object.assign({}, createTutorDto), { rol: createTutorDto.rol, password, direccion: createTutorDto.direccion })
            }), { password: regiserPassword } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        });
    }
    updateTutor(updateTutorDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const _a = updateTutorDto.values, { matricula } = _a, data = __rest(_a, ["matricula"]);
            const existUser = yield user.findUnique({ where: { matricula } });
            if (!existUser)
                throw domain_1.CustomError.badRequest('matricula no valida');
            if (data.password) {
                data.password = config_1.bcryptjsAdapter.hash(data.password);
            }
            const _b = yield user.update({
                where: { matricula },
                data
            }), { password: userPass } = _b, rest = __rest(_b, ["password"]);
            return rest;
        });
    }
    getTutores() {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const results = yield user.findMany({
                select: { nombre: true, apellidos: true, correo: true, matricula: true }
            });
            if (!results)
                throw domain_1.CustomError.internalServerError();
            return results;
        });
    }
}
exports.UserService = UserService;
