import { Validators } from "../../../config";
import { DireccionGrupoDB } from "../../../data";

export class CreateTutorDto {

    private constructor(
        public readonly matricula: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly password: string,
        public readonly direccion: string,
        public readonly correo: string,
        public readonly rol: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateTutorDto?] {
        try {
            const validators = new Validators(object);

            validators.requiredKeys(
                'matricula', 'nombre', 'apellidos', 'password', 'direccion', 'correo'
            );
            validators.toUpperCase('direccion');
            if( !Object.keys(DireccionGrupoDB).includes(object.direccion) ) {
                throw 'Direccion no valida'
            }
            validators.isEmail('correo');

            const dominio = (object.correo as string).split('@')[1];
            if(dominio !== 'upt.edu.mx') throw 'correo no valido'
            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');

            const { matricula, nombre, apellidos, password, direccion, correo } = object;
            return [undefined, new CreateTutorDto(
                matricula, 
                nombre, 
                apellidos,
                password, 
                direccion, 
                correo,
                'TUTOR',
            )];
        } catch (error) {
            return [error as string];
        }       
    }
}