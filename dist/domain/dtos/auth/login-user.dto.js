"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../../config");
class LoginUserDto {
    constructor(correo, password) {
        this.correo = correo;
        this.password = password;
    }
    static create(object) {
        try {
            const validator = new config_1.Validators(object);
            validator.requiredKeys('correo', 'password');
            validator.isEmail('correo');
            const { correo, password } = object;
            return [undefined, new LoginUserDto(correo, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginUserDto = LoginUserDto;
