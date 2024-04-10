"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAlumnoDto = void 0;
const config_1 = require("../../../config");
class RegisterAlumnoDto {
    constructor(matricula) {
        this.matricula = matricula;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            validators.isRequired('matricula');
            if (object.matricula.length !== 7 || !(/^[0-9]+$/).test(object.matricula))
                throw 'Matricula no valida';
            const { matricula } = object;
            return [undefined, new RegisterAlumnoDto(matricula)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.RegisterAlumnoDto = RegisterAlumnoDto;
