"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGrupoDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
class CreateGrupoDto {
    constructor(id, cuatrimestre, direccion, tutor) {
        this.id = id;
        this.cuatrimestre = cuatrimestre;
        this.direccion = direccion;
        this.tutor = tutor;
    }
    static create(obj) {
        try {
            const validators = new config_1.Validators(obj);
            validators.requiredKeys('id', 'cuatrimestre', 'direccion', 'tutor');
            obj.id = obj.id.toUpperCase();
            validators.capitalizar('tutor');
            validators.isNumber('cuatrimestre');
            obj.direccion = obj.direccion.toUpperCase();
            if (!Object.keys(data_1.DireccionGrupoDB).includes(obj.direccion))
                throw 'direccion no valida';
            const { id, cuatrimestre, direccion, tutor } = obj;
            return [undefined, new CreateGrupoDto(id, cuatrimestre, direccion, tutor)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateGrupoDto = CreateGrupoDto;
