"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGrupoDto = void 0;
const config_1 = require("../../../config");
const data_1 = require("../../../data");
class UpdateGrupoDto {
    constructor(id, cuatrimestre, direccion, tutor) {
        this.id = id;
        this.cuatrimestre = cuatrimestre;
        this.direccion = direccion;
        this.tutor = tutor;
    }
    get values() {
        const obj = {};
        for (const k in this) {
            if (this[k])
                obj[k] = this[k];
        }
        return obj;
    }
    static create(obj) {
        try {
            const validators = new config_1.Validators(obj);
            // validators.isRequired('id');
            if (obj.id)
                validators.toUpperCase('id');
            if (obj.direccion) {
                validators.toUpperCase('direccion');
                if (!Object.keys(data_1.DireccionGrupoDB).includes(obj.direccion))
                    return ['Direccion no valida'];
            }
            ;
            if (obj.cuatrimenstre)
                validators.isNumber('cuatrimenstre');
            if (obj.tutor)
                validators.checkPattern('tutor', /^[0-9]+$/);
            const { id, cuatrimenstre, direccion, tutor } = obj;
            return [undefined, new UpdateGrupoDto(id, cuatrimenstre, direccion, tutor)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateGrupoDto = UpdateGrupoDto;
