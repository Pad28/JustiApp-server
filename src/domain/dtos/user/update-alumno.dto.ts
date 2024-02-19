import { Validators } from "../../../config";

export class UpdateAlumnoDto {

    private constructor(
        public readonly matricula: string,
        public readonly nombre?: string,
        public readonly apellidos?: string,
        public readonly password?: string,
        public readonly grupo?: string,
    ) {}
    
    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create( object: {[key: string]: any} ):[ string?, UpdateAlumnoDto? ] {
        try {
            const validators = new Validators(object);

            if(object.cuatrimestre) {
                validators.isNumber('cuatrimestre');
            }

            if(object.nombre) validators.capitalizar('nombre');
            if(object.apellidos) validators.capitalizar('apellidos');
            if(object.grupo) validators.toUpperCase('grupo');

            const {matricula, nombre, apellidos, password, grupo} = object;
            return [undefined, new UpdateAlumnoDto(
                matricula, nombre, apellidos, password, grupo
            )];
        } catch (error) {
            return [error as string]            
        }

    }

}