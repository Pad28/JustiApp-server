"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTutorDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
class CreateTutorDto {
    constructor(matricula, nombre, apellidos, password, direccion, correo, rol) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.direccion = direccion;
        this.correo = correo;
        this.rol = rol;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            validators.requiredKeys('matricula', 'nombre', 'apellidos', 'password', 'direccion', 'correo');
            validators.toUpperCase('direccion');
            if (!Object.keys(data_1.DireccionGrupoDB).includes(object.direccion)) {
                throw 'Direccion no valida';
            }
            validators.isEmail('correo');
            const dominio = object.correo.split('@')[1];
            if (dominio !== 'upt.edu.mx')
                throw 'correo no valido';
            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');
            const { matricula, nombre, apellidos, password, direccion, correo } = object;
            return [undefined, new CreateTutorDto(matricula, nombre, apellidos, password, direccion, correo, 'TUTOR')];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateTutorDto = CreateTutorDto;
