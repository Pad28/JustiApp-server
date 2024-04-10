"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrupoController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class GrupoController extends controller_1.AppController {
    constructor(grupoService) {
        super();
        this.grupoService = grupoService;
        this.getGrupos = (req, res) => {
            this.grupoService.getGrupos()
                .then(results => res.json(results))
                .catch(error => this.triggerError(error, res));
        };
        this.createGrupo = (req, res) => {
            const [error, createGrupoDto] = domain_1.CreateGrupoDto.create(req.body);
            if (error || !createGrupoDto)
                return res.status(400).json({ error });
            this.grupoService.createGrupo(createGrupoDto)
                .then(grupo => res.json({ grupo }))
                .catch(error => this.triggerError(error, res));
        };
        this.updateGrupo = (req, res) => {
            const { id } = req.params;
            const [error, updateGrupoDto] = domain_1.UpdateGrupoDto.create(req.body);
            if (error || !updateGrupoDto)
                return res.status(400).json({ error });
            this.grupoService.updateGrupo(updateGrupoDto, id)
                .then(grupo => res.json(grupo))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.GrupoController = GrupoController;
