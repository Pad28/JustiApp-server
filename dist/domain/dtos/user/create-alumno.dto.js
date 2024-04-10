"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlumnoDto = void 0;
const config_1 = require("../../../config");
class CreateAlumnoDto {
    constructor(matricula, nombre, apellidos, password, correo, // Coreo no es requerido ya que se obitne de la matricula
    grupo) {
        this.matricula = matricula;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.correo = correo;
        this.grupo = grupo;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            validators.requiredKeys('matricula', 'nombre', 'apellidos', 'password', 'grupo');
            if (object.matricula.length !== 7 || !(/^[0-9]+$/).test(object.matricula)) {
                throw 'Matricula no valida';
            }
            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');
            validators.toUpperCase('grupo');
            const { matricula, nombre, apellidos, password, grupo } = object;
            return [undefined, new CreateAlumnoDto(matricula, nombre, apellidos, password, matricula + '@upt.edu.mx', grupo)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateAlumnoDto = CreateAlumnoDto;
