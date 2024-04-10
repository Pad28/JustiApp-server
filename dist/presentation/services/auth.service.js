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
exports.AuthService = void 0;
const config_1 = require("../../config");
const registro_email_template_1 = require("../../config/registro-email.template");
const mysql_1 = require("../../data/mysql");
const domain_1 = require("../../domain");
class AuthService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    // Crear alumno una vez se ha recibido el correo de verificacion
    createAlumno(token, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, grupo } = mysql_1.prisma;
            const payload = yield config_1.JwtAdapter.validateToken(token);
            if (!payload)
                throw domain_1.CustomError.badRequest('Token no valido');
            if (!data.grupo)
                throw domain_1.CustomError.badRequest('El grupo es obligatorio');
            const [existUser, existGrupo] = yield Promise.all([
                user.findUnique({ where: { matricula: payload.id } }),
                grupo.findUnique({ where: { id: data.grupo } })
            ]);
            if (existUser)
                throw domain_1.CustomError.badRequest('Enlace caducado');
            if (!existGrupo)
                throw domain_1.CustomError.badRequest('Grupo no valido');
            const [error, createAlumnoDto] = domain_1.CreateAlumnoDto.create(Object.assign(Object.assign({}, data), { matricula: payload.id }));
            if (error || !createAlumnoDto)
                throw domain_1.CustomError.badRequest(error);
            const password = config_1.bcryptjsAdapter.hash(createAlumnoDto.password);
            const _a = yield user.create({ data: Object.assign(Object.assign({}, createAlumnoDto), { password, direccion: existGrupo.direccion, tutor: existGrupo.tutor, cuatrimestre: existGrupo.cuatrimestre }) }), { password: aux } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        });
    }
    // Enviar correo de verificacion
    sendVerificationEmail(registerAlumnoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const token = yield config_1.JwtAdapter.generateToken({ id: registerAlumnoDto.matricula });
            if (!token)
                throw domain_1.CustomError.internalServerError();
            const userExist = yield user.findUnique({ where: { matricula: registerAlumnoDto.matricula } });
            if (userExist)
                throw domain_1.CustomError.badRequest('Esta matricula ya fue registrada');
            this.emailService.enviarCorreo({
                destinatario: `${registerAlumnoDto.matricula}@upt.edu.mx`,
                subject: 'Registro JustiApp',
                html: (0, registro_email_template_1.emailTemplate)(token)
            });
            return 'Correo de verificacion enviado';
        });
    }
    loginUser(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const result = yield user.findUnique({ where: { correo: loginUserDto.correo } });
            if (!result)
                throw domain_1.CustomError.badRequest('Correo o contraseña no valido');
            const isMatching = config_1.bcryptjsAdapter.compare(loginUserDto.password, result.password);
            if (!isMatching)
                throw domain_1.CustomError.badRequest('Correo o contraseña no valido');
            const token = yield config_1.JwtAdapter.generateToken({ id: result.matricula });
            if (!token)
                throw domain_1.CustomError.internalServerError();
            const { password } = result, data = __rest(result, ["password"]);
            return {
                user: data,
                token
            };
        });
    }
    loginAlumno(loginAlumnoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = mysql_1.prisma;
            const result = yield user.findUnique({ where: { matricula: loginAlumnoDto.matricula } });
            if (!result)
                throw domain_1.CustomError.badRequest('Matricula o contraseña no valido');
            const isMatching = config_1.bcryptjsAdapter.compare(loginAlumnoDto.password, result.password);
            if (!isMatching)
                throw domain_1.CustomError.badRequest('Matricula o contraseña no valido');
            const token = yield config_1.JwtAdapter.generateToken({ id: result.matricula });
            if (!token)
                throw domain_1.CustomError.internalServerError();
            const { password } = result, data = __rest(result, ["password"]);
            return {
                user: data,
                token
            };
        });
    }
}
exports.AuthService = AuthService;
