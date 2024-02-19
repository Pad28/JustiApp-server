import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateGrupoDto, UpdateGrupoDto } from "../../domain";
import { GrupoService } from "../services";

export class GrupoController extends AppController {
    constructor(
        private readonly grupoService: GrupoService,
    ) { super() }

    public getGrupos = (req: Request, res: Response) => {
        this.grupoService.getGrupos()
            .then(results => res.json(results))
            .catch(error => this.triggerError(error, res));
    }

    public createGrupo = (req: Request, res: Response) => {
        const [error, createGrupoDto] = CreateGrupoDto.create(req.body);
        if(error || !createGrupoDto) return res.status(400).json({ error });
        
        this.grupoService.createGrupo(createGrupoDto)
            .then(grupo => res.json({ grupo }))
            .catch( error => this.triggerError(error, res) );
    }

    public updateGrupo = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateGrupoDto] = UpdateGrupoDto.create(req.body);
        if(error || !updateGrupoDto) return res.status(400).json({ error });
        
        this.grupoService.updateGrupo(updateGrupoDto, id)
            .then(grupo => res.json(grupo))
            .catch(error => this.triggerError(error, res));
    }
}