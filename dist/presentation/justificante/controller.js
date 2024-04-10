"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustificanteController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class JustificanteController extends controller_1.AppController {
    constructor(justificanteService) {
        super();
        this.justificanteService = justificanteService;
        this.createJustificante = (req, res) => {
            const { user } = req.body;
            const [error, createJustificanteDto] = domain_1.CreateJustificanteDto.create(Object.assign(Object.assign({}, req.body), { id_alumno: user.matricula }));
            if (error || !createJustificanteDto)
                return res.status(400).json({ error });
            this.justificanteService.createJustificante(createJustificanteDto)
                .then(justificante => res.json({ justificante }))
                .catch(error => this.triggerError(error, res));
        };
        this.enviarEvidenciaAndJustificante = (req, res) => {
            if (!req.file)
                return res.status(401).json({ error: 'No hay evidencia que subir' });
            const [error, createJustificanteDto] = domain_1.CreateJustificanteAndEvidenciaDto.create(Object.assign({}, req.body));
            if (error || !createJustificanteDto)
                return res.status(400).json({ error });
            this.justificanteService.enviarJustificante(createJustificanteDto, req.file)
                .then(justificante => res.json({ justificante }))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.JustificanteController = JustificanteController;
