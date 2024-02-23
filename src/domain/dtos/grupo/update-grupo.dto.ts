import { Validators } from "../../../config";
import { DireccionGrupoDB } from "../../../data";

export class UpdateGrupoDto {
    private constructor(
        public readonly id?: string,
        public readonly cuatrimestre?: number,
        public readonly direccion?: string,
        public readonly tutor?: string,
    ) {}

    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create(obj: {[key: string]: any}): [string?, UpdateGrupoDto?] {
        try {
            const validators = new Validators(obj);
            
            // validators.isRequired('id');
            if(obj.id) validators.toUpperCase('id');
            if(obj.direccion) {
                validators.toUpperCase('direccion')
                if( !Object.keys(DireccionGrupoDB).includes(obj.direccion) ) return ['Direccion no valida'];
            };
            if(obj.cuatrimenstre) validators.isNumber('cuatrimenstre');
            if(obj.tutor) validators.isNumber('tutor');
            
            const { id, cuatrimenstre, direccion, tutor } = obj;
            return [undefined, new UpdateGrupoDto( id, cuatrimenstre, direccion, tutor )];
        } catch (error) {
            return [error as string];
        }

    }
}