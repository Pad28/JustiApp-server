import { Validators } from "../../../config";

export class UpdateTutorDto {

    private constructor(
        public readonly matricula: string,
        public readonly nombre?: string,
        public readonly apellidos?: string,
        public readonly password?: string,
    ) {}
    
    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create( object: {[key: string]: any} ):[ string?, UpdateTutorDto? ] {
        try {
            const validators = new Validators(object);
            if(object.nombre) validators.capitalizar('nombre');
            if(object.apellidos) validators.capitalizar('apellidos');

            const { matricula, nombre, apellidos, password } = object;
            return [undefined, new UpdateTutorDto(
                matricula, nombre, apellidos, password
            )];
        } catch (error) {
            return [error as string]            
        }

    }

}