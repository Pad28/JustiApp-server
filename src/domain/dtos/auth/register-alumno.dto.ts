import { Validators } from "../../../config";

export class RegisterAlumnoDto {
    private constructor(
        public readonly matricula: string,
    ) {}

    static create( object: {[key: string]: any} ): [string?, RegisterAlumnoDto?] {

        try {
            const validators = new Validators(object);

            validators.isRequired('matricula')
            if(object.matricula.length !== 7 || !(/^[0-9]+$/).test(object.matricula)) throw 'Matricula no valida'

            const { matricula } = object;
            return [undefined, new RegisterAlumnoDto(matricula)];
        } catch (error) {
            return [error as string];           
        }
    }
}