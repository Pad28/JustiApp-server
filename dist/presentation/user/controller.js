"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
const controller_1 = require("../controller");
class UserController extends controller_1.AppController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.createAlumno = (req, res) => {
            const [error, createAlumnoDto] = domain_1.CreateAlumnoDto.create(req.body);
            if (error || !createAlumnoDto)
                return res.status(400).json({ error });
            this.userService.registerAlumno(createAlumnoDto)
                .then(user => res.json({ user }))
                .catch(error => this.triggerError(error, res));
        };
        this.updateAlumno = (req, res) => {
            const { id } = req.params;
            const { user } = req.body;
            if (id !== user.matricula)
                return res.status(401).json({
                    error: 'No autorizado'
                });
            const [error, updateAlumnoDto] = domain_1.UpdateAlumnoDto.create(Object.assign(Object.assign({}, req.body), { matricula: id }));
            if (error || !updateAlumnoDto)
                return res.status(400).json({ error });
            this.userService.updateAlumno(updateAlumnoDto)
                .then(user => res.json({ user }))
                .catch(error => this.triggerError(error, res));
        };
        this.createTutor = (req, res) => {
            const [error, createTutorDto] = domain_1.CreateTutorDto.create(req.body);
            if (error || !createTutorDto)
                return res.status(400).json({ error });
            this.userService.createTutor(createTutorDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        this.updateTutor = (req, res) => {
            const { id } = req.params;
            const { user } = req.body;
            if (id !== user.matricula)
                return res.status(401).json({
                    error: 'No autorizado'
                });
            const [error, updateTutorDto] = domain_1.UpdateAlumnoDto.create(Object.assign(Object.assign({}, req.body), { matricula: id }));
            if (error || !updateTutorDto)
                return res.status(400).json({ error });
            this.userService.updateTutor(updateTutorDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        this.getTutores = (req, res) => {
            this.userService.getTutores()
                .then(tutores => res.json(tutores))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.UserController = UserController;
