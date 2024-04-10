"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class AuthController extends controller_1.AppController {
    constructor(authService) {
        super();
        this.authService = authService;
        this.createAlumno = (req, res) => {
            const { token } = req.params;
            this.authService.createAlumno(token, req.body)
                .then(user => res.json({ user }))
                .catch(error => this.triggerError(error, res));
        };
        this.sendVerificationEmail = (req, res) => {
            const { matricula } = req.params;
            const [error, registerAlumnoDto] = domain_1.RegisterAlumnoDto.create({ matricula });
            if (error || !registerAlumnoDto)
                return res.status(400).json({ error });
            this.authService.sendVerificationEmail(registerAlumnoDto)
                .then(result => res.json({ msg: result }))
                .catch(error => this.triggerError(error, res));
        };
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error || !loginUserDto)
                return res.status(400).json({ error });
            this.authService.loginUser(loginUserDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
        this.loginAlumno = (req, res) => {
            const [error, loginAlumnoDto] = domain_1.LoginAlumnoDto.create(req.body);
            if (error || !loginAlumnoDto)
                return res.status(400).json({ error });
            this.authService.loginAlumno(loginAlumnoDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
        this.verifyJwt = (req, res) => {
            const token = req.header('Authorization');
            res.json({
                user: req.body.user,
                token: token.split(' ').at(1),
            });
        };
    }
}
exports.AuthController = AuthController;
