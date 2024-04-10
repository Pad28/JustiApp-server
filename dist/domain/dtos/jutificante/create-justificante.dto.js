"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJustificanteDto = void 0;
const config_1 = require("../../../config");
class CreateJustificanteDto {
    constructor(motivo, fecha_creacion, fecha_justificada_inicio, fecha_justificada_fin, id_alumno, id_evidencia) {
        this.motivo = motivo;
        this.fecha_creacion = fecha_creacion;
        this.fecha_justificada_inicio = fecha_justificada_inicio;
        this.fecha_justificada_fin = fecha_justificada_fin;
        this.id_alumno = id_alumno;
        this.id_evidencia = id_evidencia;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            validators.requiredKeys('motivo', 'fecha_justificada_inicio', 'fecha_justificada_fin', 'id_alumno');
            object.fecha_creacion = new Date();
            validators.isDate('fecha_creacion');
            validators.isDate('fecha_justificada_inicio');
            validators.isDate('fecha_justificada_fin');
            return [undefined, new CreateJustificanteDto(object.motivo, object.fecha_creacion, object.fecha_justificada_inicio, object.fecha_justificada_fin, object.id_alumno, object.id_evidencia)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateJustificanteDto = CreateJustificanteDto;
