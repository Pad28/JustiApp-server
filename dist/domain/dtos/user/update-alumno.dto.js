"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlumnoDto = void 0;
const config_1 = require("../../../config");
class UpdateAlumnoDto {
    constructor(matricula, nombre, apellidos, password, grupo) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.grupo = grupo;
    }
    get values() {
        const obj = {};
        for (const k in this) {
            if (this[k])
                obj[k] = this[k];
        }
        return obj;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            if (object.cuatrimestre) {
                validators.isNumber('cuatrimestre');
            }
            if (object.nombre)
                validators.capitalizar('nombre');
            if (object.apellidos)
                validators.capitalizar('apellidos');
            if (object.grupo)
                validators.toUpperCase('grupo');
            const { matricula, nombre, apellidos, password, grupo } = object;
            return [undefined, new UpdateAlumnoDto(matricula, nombre, apellidos, password, grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateAlumnoDto = UpdateAlumnoDto;
