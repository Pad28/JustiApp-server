"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTutorDto = void 0;
const config_1 = require("../../../config");
class UpdateTutorDto {
    constructor(matricula, nombre, apellidos, password) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
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
            if (object.nombre)
                validators.capitalizar('nombre');
            if (object.apellidos)
                validators.capitalizar('apellidos');
            const { matricula, nombre, apellidos, password } = object;
            return [undefined, new UpdateTutorDto(matricula, nombre, apellidos, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateTutorDto = UpdateTutorDto;
