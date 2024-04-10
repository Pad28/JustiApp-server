"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAlumnoDto = void 0;
const config_1 = require("../../../config");
class LoginAlumnoDto {
    constructor(matricula, password) {
        this.matricula = matricula;
        this.password = password;
    }
    static create(obj) {
        try {
            const validator = new config_1.Validators(obj);
            validator.requiredKeys('matricula', 'password');
            validator.checkPattern('matricula', /^[0-9]+$/);
            const { matricula, password } = obj;
            return [undefined, new LoginAlumnoDto(matricula, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginAlumnoDto = LoginAlumnoDto;
