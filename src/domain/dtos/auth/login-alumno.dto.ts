import { Validators } from "../../../config";

export class LoginAlumnoDto {
    private constructor(
        public readonly matricula: string,
        public readonly password: string,
    ) {}

    static create(obj: {[key: string]: any}): [string?, LoginAlumnoDto?] {
        try {
            const validator = new Validators(obj);            

            validator.requiredKeys('matricula', 'password');
            validator.checkPattern('matricula', /^[0-9]+$/);

            const { matricula, password } = obj;
            return [undefined, new LoginAlumnoDto(matricula, password)];
        } catch (error) {
            return [error as string]
        }
    }
}