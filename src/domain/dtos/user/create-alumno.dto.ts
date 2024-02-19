import { Validators } from "../../../config";

export class CreateAlumnoDto {
    
    private constructor(
        public readonly matricula: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public readonly password: string,
        public readonly correo: string, // Coreo no es requerido ya que se obitne de la matricula
        public readonly grupo: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateAlumnoDto?] {
        try {
            const validators = new Validators(object);

            validators.requiredKeys('matricula', 'nombre', 'apellidos', 'password', 'grupo');

            if(object.matricula.length !== 7 || !(/^[0-9]+$/).test(object.matricula)) {
                throw 'Matricula no valida';
            }

            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');
            validators.toUpperCase('grupo');

            const {matricula, nombre, apellidos, password, grupo} = object;
            return [undefined, new CreateAlumnoDto( 
                matricula, nombre, apellidos, password, matricula + '@upt.edu.mx', grupo, 
            )];
        } catch (error) {
            return [error as string];
        }       
    }
}