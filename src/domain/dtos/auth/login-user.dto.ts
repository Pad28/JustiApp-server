import { Validators } from "../../../config";

export class LoginUserDto {
    private constructor(
        public readonly correo: string,
        public readonly password: string,
    ) {}

    static create( object: {[key: string]: any} ): [string?, LoginUserDto?] {
        try {
            const validator = new Validators(object);

            validator.requiredKeys('correo', 'password');
            validator.isEmail('correo');

            const { correo, password } = object;
            return [undefined, new LoginUserDto(correo, password)];
        } catch (error) {
            return [error as string];            
        }

    }
}